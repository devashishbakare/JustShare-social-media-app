import React from "react";
import style from "./mainContent.module.css";
import Aside from "../Aside/Aside";
import Feed from "../Feed/Feed";
import Related from "../Related/Related";
const MainContent = () => {
  return (
    <>
      <div className={style.homeContentContainer}>
        <div className={style.aside}>
          <Aside />
        </div>
        <div className={style.feed}>
          <Feed />
        </div>
        <div className={style.related}>
          <Related />
        </div>
      </div>
    </>
  );
};

export default MainContent;
