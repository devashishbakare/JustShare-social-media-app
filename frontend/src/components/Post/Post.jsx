import React from "react";
import style from "./post.module.css";
import { FaEllipsisV } from "react-icons/fa";
import userImage from "../../assets/user/img1.jpg";
import postImage from "../../assets/post/post1.jpeg";
import like from "../../assets/like.jpeg";
import love from "../../assets/love.jpeg";
const Post = () => {
  return (
    <div className={style.postContainer}>
      <div className={style.postTopDetails}>
        <div className={style.postTopDetailsInfo}>
          <img className={style.postUserImg} src={userImage} alt="user_image" />
          <span className={style.postUserName}>Tylor Swift</span>
          <span className={style.postTiming}>5 min ago</span>
        </div>
        <div className="postHeadingIcon">
          <FaEllipsisV className={style.postHeadingInfoIcon} />
        </div>
      </div>
      <div className={style.postDescImg}>
        <div className={style.postDesc}>
          <span className={style.descText}>
            We have to prove ourself on each path...
          </span>
        </div>
        <div className={style.postImgDiv}>
          <img className={style.postImg} src={postImage} alt="Post_image" />
        </div>
      </div>
      <div className={style.postBottomWrapper}>
        <div className={style.postButtomImgWrapper}>
          <img src={like} alt="Like_Image" className={style.postLikeImg} />
          <img src={love} alt="Love_Image" className={style.postLoveImg} />
          <span className={style.likeCount}>32 people like it</span>
        </div>
        <div className={style.postCommnetWrapper}>
          {/* Todo : we have to use link in router-dom */}
          <a href="" className="commentLink">
            Comments
          </a>
        </div>
      </div>
    </div>
  );
};

export default Post;
