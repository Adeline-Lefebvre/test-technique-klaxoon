import React, { useState } from "react";
import { Bookmark } from "../types";

export interface ListProps {
  bookmarks: Bookmark[];
  setBookmarks: React.Dispatch<React.SetStateAction<Bookmark[]>>;
}

const List = ({ bookmarks, setBookmarks }: ListProps) => {
  const [now, setNow] = useState(Date.now());

  const MONTHS = [
    "janvier",
    "février",
    "mars",
    "avril",
    "mai",
    "juin",
    "juillet",
    "août",
    "septembre",
    "octobre",
    "novembre",
    "décembre",
  ];

  setTimeout(() => {
    setNow(Date.now());
  }, 10000);

  const addedSince = (addedAt: number) => {
    let seconds = Math.floor((now - addedAt) / 1000);

    let interval = seconds / 86400;
    if (interval > 1)
      return (
        Math.floor(interval) +
        " jour" +
        `${Math.floor(interval) > 1 ? "s" : ""}`
      );

    interval = seconds / 3600;
    if (interval > 1)
      return (
        Math.floor(interval) +
        " heure" +
        `${Math.floor(interval) > 1 ? "s" : ""}`
      );

    interval = seconds / 60;
    if (interval > 1)
      return (
        Math.floor(interval) +
        " minute" +
        `${Math.floor(interval) > 1 ? "s" : ""}`
      );

    return "0 minute";
  };

  const deleteBookmark = (id: number) => {
    setBookmarks(bookmarks.filter((mark) => mark.id !== id));
  };

  return (
    <div className="bookmarks">
      {bookmarks.map((bookmark, index) => {
        const {
          id,
          thumbnailVideo,
          thumbnail,
          url,
          type,
          title,
          author,
          addedAt,
          publishedAt,
          duration,
          size,
        } = bookmark;

        return (
          <div key={index} className="bookmark">
            <div className="thumbnail">
              {thumbnailVideo ? (
                <div dangerouslySetInnerHTML={{ __html: thumbnailVideo }}></div>
              ) : (
                <img src={thumbnail} alt="" />
              )}
            </div>

            <div>
              <div>
                <strong>{title}</strong> par {author}
              </div>
              <div style={{ marginBottom: "10px" }}>
                👉{" "}
                <a href={url} target="_blank">
                  Lien vers la {type}
                </a>
              </div>
              <div>Ajoutée il y a {addedSince(addedAt)}</div>
              {publishedAt && (
                <div>
                  Date de publication : le {publishedAt.getDate()}{" "}
                  {MONTHS[publishedAt.getMonth()]} {publishedAt.getFullYear()}
                </div>
              )}
              {duration && (
                <div>
                  Durée : {Math.floor(duration / 3600)}:
                  {Math.floor(duration / 60)}:{duration % 60}
                </div>
              )}
              {size && <div>Taille : {size}</div>}
              <button className="btn" onClick={() => deleteBookmark(id)}>
                Supprimer
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default List;
