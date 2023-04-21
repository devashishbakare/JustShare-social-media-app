import style from "./news.module.css";

const News = () => {
  return (
    <>
      <div className={style.newsContainer}>
        <div className={style.newsImgContainer}>
          <div className={style.newsImgWrapper}>
            <img
              src="https://s.abcnews.com/images/US/donald-trump-7-gt-gmh-230404_1680635040353_hpMain_2_16x9_608.jpg"
              alt="News image"
              className={style.newsImg}
            />
            <span className={style.newsHeadingText}>
              Trump can't claim 'logistical burdens' if he skips upcoming trial
              in NYC, judge rules
            </span>
          </div>
        </div>
        <div className={style.newsOtherInfoWrapper}>
          <div className={style.newsOtherInfo}>
            <span className={style.newsInfoHeading}>Author:</span>
            <div className={style.newsInfoOuterDesign}>
              <span className={style.newsInfo}>John Doe</span>
            </div>
          </div>
          <div className={style.newsOtherInfo}>
            <span className={style.newsInfoHeading}>Read More:</span>
            <div className={style.newsInfoOuterDesign}>
              <span className={style.newsInfo}>abcNews</span>
            </div>
          </div>
          {/* <div className={style.newsOtherInfo}>
            <span className={style.newsInfoHeading}>Published At:</span>
            <span className={style.newsInfo}>2023-04-21</span>
          </div> */}
        </div>
        <div className={style.newsDescription}>
          Contrary to popular belief, Lorem Ipsum is not simply random text. It
          has roots in a piece of classical Latin literature from 45 BC, making
          it over 2000 years old. Richard McClintock, a Latin professor at
          Hampden-Sydney College in Virginia, looked up one of the more obscure
          Latin words
        </div>
      </div>
    </>
  );
};

export default News;
