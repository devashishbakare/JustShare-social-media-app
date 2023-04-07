import React from "react";
import style from "./feed.module.css";
import profilePicture from "../../assets/user/img2.jpg";
import { FcAddImage, FcLike } from "react-icons/fc";
import Post from "../Post/Post";
const Feed = () => {
  return (
    <>
      <div className={style.uploadPostContainer}>
        <div className={style.profileAndDesription}>
          <img
            src={profilePicture}
            alt="profile img"
            className={style.uploadPostProfilePhoto}
          />
          <input
            type="text"
            className={style.uploadPostDescription}
            placeholder="whats in your mind Rehana..."
          />
        </div>
        <hr />
        <div className="uploadSharingDetails">
          <ul className={style.listItmes}>
            <li>
              <FcAddImage className={style.iconStyle} />
              <span className={style.uploadPostText}> Share Photo</span>
            </li>
            <li>
              <FcLike className={style.iconStyle} />
              <span className={style.uploadPostText}> Feelings</span>
            </li>
            <li>
              <button className={style.uploadShareButton}> Share</button>
            </li>
          </ul>
        </div>
      </div>
      <div className={style.uploadedPost}>
        <Post />
      </div>
    </>
  );
};

export default Feed;
