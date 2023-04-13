import React, { useEffect, useState } from "react";
import style from "./post.module.css";
import { FaEllipsisV } from "react-icons/fa";
import like from "../../assets/like.jpeg";
import love from "../../assets/love.jpeg";
import axios from "axios";
import { baseUrl } from "../constants";

const Post = React.memo(({ props }) => {
  // console.log(props);
  const [userName, setUserName] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [likeCount, setLikeCount] = useState(props.like.length);

  const userDetails = localStorage.getItem("user");
  const user = JSON.parse(userDetails);
  const userId = user._id;

  //Featching details of user who made this post
  useEffect(() => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const fetchUserDetails = async () => {
      const response = await axios.get(
        `${baseUrl}/user/getUser/${props.userId}`,
        config
      );

      if (response.data) {
        setUserName(response.data.userName);
        setProfilePicture(response.data.profilePicture);
      }
    };
    fetchUserDetails();
  }, []);

  const handleLikePost = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const info = {
        userId: userId,
        postId: props._id,
      };
      const response = await axios.put(`${baseUrl}/post/like`, info, config);
      console.log(response.data);
      if (response.status === 500) {
        //todo : Throw error or push notification
      } else {
        if (response.data.like === true) {
          setLikeCount(likeCount + 1);
        } else {
          setLikeCount(likeCount - 1);
        }
      }
    } catch (err) {
      console.error(err, "Error while liking post");
    }
  };

  return (
    <div className={style.postContainer}>
      <div className={style.postTopDetails}>
        <div className={style.postTopDetailsInfo}>
          <img
            className={style.postUserImg}
            src={profilePicture}
            alt="user_image"
          />
          <span className={style.postUserName}>{userName}</span>
          {/* <span className={style.postTiming}>5 min ago</span> */}
        </div>
        <div className="postHeadingIcon">
          <FaEllipsisV className={style.postHeadingInfoIcon} />
        </div>
      </div>
      <div className={style.postDescImg}>
        <div className={style.postDesc}>
          <span className={style.descText}>{props.desc}</span>
        </div>
        <div className={style.postImgDiv}>
          <img className={style.postImg} src={props.image} alt="Post_image" />
        </div>
      </div>
      <div className={style.postBottomWrapper}>
        <div className={style.postButtomImgWrapper}>
          <img
            src={like}
            alt="Like_Image"
            className={style.postLikeImg}
            onClick={handleLikePost}
          />
          <img
            src={love}
            alt="Love_Image"
            className={style.postLoveImg}
            onClick={handleLikePost}
          />
          {likeCount === 0 ? (
            <span></span>
          ) : (
            <span className={style.likeCount}>{likeCount} people like it</span>
          )}
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
});

export default Post;
