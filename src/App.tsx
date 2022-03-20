import React, { useState } from "react";
import "./App.css";
import Form from "./components/Form";
import List from "./components/List";
import { Bookmark } from "./types";

function App() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  return (
    <>
      <Form bookmarks={bookmarks} setBookmarks={setBookmarks} />
      <List bookmarks={bookmarks} setBookmarks={setBookmarks} />
    </>
  );
}

export default App;
