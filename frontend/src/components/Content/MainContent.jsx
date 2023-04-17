import React, { useState } from "react";
import style from "./mainContent.module.css";
import Aside from "../Aside/Aside";
import Feed from "../Feed/Feed";
import Related from "../Related/Related";
import BookmarkContext from "../../Contex/BookmarkContext";
const MainContent = () => {
  const [bookmarks, setBookMarks] = useState([]);
  const [isBookmarkClick, setIsBookmarkClick] = useState(false);

  return (
    <>
      <div className={style.homeContentContainer}>
        <div className={style.aside}>
          <BookmarkContext.Provider
            value={{
              bookmarks,
              setBookMarks,
              isBookmarkClick,
              setIsBookmarkClick,
            }}
          >
            <Aside />
          </BookmarkContext.Provider>
        </div>
        <div className={style.feed}>
          <BookmarkContext.Provider
            value={{
              bookmarks,
              setBookMarks,
              isBookmarkClick,
              setIsBookmarkClick,
            }}
          >
            <Feed />
          </BookmarkContext.Provider>
        </div>
        <div className={style.related}>
          <Related />
        </div>
      </div>
    </>
  );
};

export default MainContent;
