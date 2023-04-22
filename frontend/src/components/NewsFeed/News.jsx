import style from "./news.module.css";
import React from "react";
import { Link } from "react-router-dom";
const News = React.memo(({ props }) => {
  const { title, description, urlToImage, url } = props;
  const { newSource } = props.source.name;
  const author = props.author ? props.author : "Unknown Author";
  return (
    <>
      <div className={style.newsContainer}>
        <div className={style.headline}>
          <span className={style.headlineText}>{title}</span>
        </div>
        <div className={style.newsImgContainer}>
          <div className={style.newsImgWrapper}>
            <img src={urlToImage} alt="News image" className={style.newsImg} />
          </div>
        </div>
        <div className={style.newsOtherInfoWrapper}>
          <div className={style.newsOtherInfo}>
            <span className={style.newsInfoHeading}>Author:</span>
            <div className={style.newsInfoOuterDesign}>
              <span className={style.newsInfo}>{author}</span>
            </div>
          </div>
          <div className={style.newsOtherInfo}>
            <Link to={url} className={style.newsLink} target="_blank">
              Read More
            </Link>
          </div>
        </div>
        <div className={style.newsDescription}>{description}</div>
      </div>
    </>
  );
});

export default News;
