import React, { useState } from "react";
import { Bookmark } from "../types";

export interface FormProps {
  bookmarks: Bookmark[];
  setBookmarks: React.Dispatch<React.SetStateAction<Bookmark[]>>;
}

const Form = ({ bookmarks, setBookmarks }: FormProps) => {
  const [link, setLink] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchContent = async () => {
    setErrorMessage(null);

    if (
      !link.includes("https://vimeo.com/") &&
      !link.includes("https://www.flickr.com/")
    ) {
      setErrorMessage("Il ne s'agit pas d'un lien Vimeo ou Flickr");
      return;
    }

    try {
      const response = await fetch(`https://noembed.com/embed?url=${link}`);
      const data = await response.json();

      if (!data) {
        setErrorMessage("Une erreur est survenue");
        return;
      }

      const {
        thumbnail_url,
        html,
        url,
        title,
        author_name,
        upload_date,
        type,
        duration,
        height,
        width,
      } = data;

      const bookmark: Bookmark = {
        id: Math.random() * 1000,
        thumbnailVideo: type === "video" && html ? html : undefined,
        thumbnail: thumbnail_url,
        url,
        type,
        title,
        author: author_name,
        addedAt: Date.now(),
        publishedAt: upload_date ? new Date(upload_date) : undefined,
        duration: type === "video" ? duration : undefined,
        size: type === "photo" ? height * width : undefined,
      };

      const newBookmarks = [...bookmarks];
      newBookmarks.push(bookmark);
      setBookmarks(newBookmarks);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="form">
        <input
          type="url"
          autoFocus
          value={link}
          onChange={(e) => setLink(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && fetchContent()}
        />
        <button className="btn" onClick={() => fetchContent()}>
          Ajouter
        </button>
      </div>

      <p style={{ textAlign: "center" }}>{errorMessage}</p>
    </>
  );
};

export default Form;
