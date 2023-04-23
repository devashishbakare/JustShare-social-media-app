import React, { useState } from "react";
import style from "./mainContent.module.css";
import Aside from "../Aside/Aside";
import Feed from "../Feed/Feed";
import Related from "../Related/Related";
import ContentContext from "../../Contex/ContentContext";
const MainContent = () => {
  const [bookmarks, setBookMarks] = useState([]);
  const [isBookmarkClick, setIsBookmarkClick] = useState(false);
  const [news, setNews] = useState([]);
  const [isNewsClick, setIsNewsClick] = useState(false);
  const [isCategoryClick, setIsCategoryClick] = useState(false);
  return (
    <>
      <div className={style.homeContentContainer}>
        <div className={style.aside}>
          <ContentContext.Provider
            value={{
              bookmarks,
              setBookMarks,
              isBookmarkClick,
              setIsBookmarkClick,
              news,
              setNews,
              isNewsClick,
              setIsNewsClick,
              setIsCategoryClick,
            }}
          >
            <Aside />
          </ContentContext.Provider>
        </div>
        <div className={style.feed}>
          <ContentContext.Provider
            value={{
              bookmarks,
              setBookMarks,
              isBookmarkClick,
              setIsBookmarkClick,
              news,
              setNews,
              isNewsClick,
              setIsNewsClick,
              isCategoryClick,
              setIsCategoryClick,
            }}
          >
            <Feed />
          </ContentContext.Provider>
        </div>
        <div className={style.related}>
          <Related />
        </div>
      </div>
    </>
  );
};

export default MainContent;
