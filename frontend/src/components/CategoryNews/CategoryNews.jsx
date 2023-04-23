import React from "react";
import style from "./categoryNews.module.css";
import { Link } from "react-router-dom";

const CategoryNews = React.memo(({ props }) => {
  console.log("news", props);

  return (
    <div className={style.categoryNewsContainer}>
      <div className={style.description}>{props.description}</div>
      <div className={style.newsFooter}>
        <div className={style.sourceWrapper}>
          <span className={style.sourceHeading}>Source : </span>&nbsp;
          <span className={style.sourceText}>{props.name}</span>
        </div>
        <div className={style.newsDirect}>
          <button className={style.souceInfo}>
            <Link to={props.url} target="_blank" className={style.readMoreURL}>
              Read More
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
});

export default CategoryNews;
