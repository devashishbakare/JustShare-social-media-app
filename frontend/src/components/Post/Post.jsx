import React, { useEffect, useState } from "react";
import style from "./post.module.css";
import { FaEllipsisV } from "react-icons/fa";
import { AiFillCloseCircle } from "react-icons/ai";
import like from "../../assets/like.jpeg";
import love from "../../assets/love.jpeg";
import axios from "axios";
import { baseUrl } from "../constants";
import PostComments from "./PostComments";
import Spinner from "../Spinners";
import PostMenuOptions from "./PostMenuOptions.jsx";

const Post = React.memo(({ props }) => {
  // console.log(props);

  const [userName, setUserName] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [likeCount, setLikeCount] = useState(props.like.length);
  const [toggleComment, setToggleComment] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [showOption, setShowOption] = useState(false);

  //Getting user Details from localStorage
  const userDetails = localStorage.getItem("user");
  const user = JSON.parse(userDetails);
  const userId = user._id;
  const postId = props._id;
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

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const fetchPostComments = async () => {
    setToggleComment(!toggleComment);

    setIsLoading(true);
    //fetching comment from backend
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          userId: userId,
          postId: props._id,
        },
      };

      const response = await axios.get(
        `${baseUrl}/post/comment/postComments`,
        config
      );

      if (response.status === 200) {
        console.log(response.data.data);
        setComments(response.data.data);
      }
    } catch (err) {
      console.error(err, "Errow while fetching comments");
    }
    setIsLoading(false);
  };

  const handleCloseCommentsClick = () => {
    console.log(props._id + " pid");
    setToggleComment(!toggleComment);
  };

  const postCommentHandler = async (event) => {
    event.preventDefault();
    console.log(comment);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const postRequestBody = {
        userId: userId,
        postId: postId,
        text: comment,
      };
      const response = await axios.post(
        `${baseUrl}/post/comment/create`,
        postRequestBody,
        config
      );
      if (response.status === 200) {
        console.log(response.data.data);
        setComments([response.data.data, ...comments]);
      }
    } catch (err) {
      console.error("Create Comment Failed");
    }
  };

  const handleShowOption = () => {
    setShowOption(!showOption);
  };

  const toggleOptions = () => {
    setShowOption(!showOption);
  };

  const menuOptionProps = {
    postId,
    toggleOptions,
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
          <FaEllipsisV
            className={style.postHeadingInfoIcon}
            onClick={handleShowOption}
          />
          {showOption && <PostMenuOptions postDetails={menuOptionProps} />}
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
          <span className={style.commentLink} onClick={fetchPostComments}>
            Comments
          </span>
        </div>
      </div>
      {toggleComment && (
        <div className={style.commentContainer}>
          <hr className={style.postCommentDivider} />
          <div className={style.commentForm}>
            <form
              className={style.commentFormFrom}
              onSubmit={postCommentHandler}
            >
              <span className={style.inputWrapper}>
                <input
                  type="text"
                  name="comment"
                  onChange={handleCommentChange}
                  className={style.commentInputSection}
                  placeholder="Add your comment here.."
                />
              </span>

              <button className={style.commentButton}>Post Comment</button>
              <AiFillCloseCircle
                onClick={handleCloseCommentsClick}
                className={style.closeCommentButton}
              />
            </form>
          </div>
          <div className={style.commentListWrapper}>
            {isLoading ? (
              <Spinner />
            ) : (
              comments.map((singleComment) => (
                <PostComments key={singleComment._id} comment={singleComment} />
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
});

export default Post;
