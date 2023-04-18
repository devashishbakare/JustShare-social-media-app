import React, { useState } from "react";
import style from "./post.module.css";
import { FaEllipsisH } from "react-icons/fa";
import likeImg from "../../assets/like.jpeg";
import axios from "axios";
import { baseUrl } from "../constants";
// import commentReply from "./commentReply";
import CommentReply from "./CommentReply";
// import profilePicture from "../../assets/user/img4.jpeg";
const PostComments = React.memo(({ comment }) => {
  //console.log(comment, "comment");
  const { commenterProfilePicture, commenterName, text, like, reply } = comment;
  const [likeCount, setLikeCount] = useState(like.length);
  const [isReplyclick, setIsReplyClick] = useState(false);
  const userDetails = localStorage.getItem("user");
  const user = JSON.parse(userDetails);
  const userId = user._id;
  const handleLikeComment = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const commentInfo = {
        userId,
        commentId: comment._id,
      };

      const response = await axios.put(
        `${baseUrl}/post/comment/like`,
        commentInfo,
        config
      );
      if (response.status === 200) {
        if (response.data.like) {
          setLikeCount(likeCount + 1);
        } else {
          setLikeCount(likeCount - 1);
        }
      } else {
        //todo : handle error gracefully
      }
    } catch (err) {
      console.error(err, "error while liking or disliking post");
    }
  };

  const replyCommentHandler = () => {
    console.log("Reply got clicked");
    setIsReplyClick(!isReplyclick);
  };

  return (
    <>
      <div className={style.commentListWrapper}>
        <div className={style.singleComment}>
          <div className={style.commentInputWrapper}>
            <div className={style.commentNameImgWrapper}>
              <img
                className={style.comenterProfilePhoto}
                src={commenterProfilePicture}
                alt="user_image"
              />
              <span className={style.commenterName}>{commenterName}</span>
            </div>
            <FaEllipsisH className={style.commentOptions} />
          </div>
          <span className={style.singleCommentText}>{text}</span>
          <div className={style.likeReply}>
            {likeCount > 0 && (
              <span className={style.commentLikeCount}>{likeCount}</span>
            )}
            <img
              src={likeImg}
              alt="Like_Image"
              className={style.commentLikeImg}
              onClick={handleLikeComment}
            />
            <span className={style.replyText} onClick={replyCommentHandler}>
              Reply
            </span>
            {isReplyclick && (
              <CommentReply
                commentData={comment}
                exitReplyBox={isReplyclick}
                setExitReplyBox={setIsReplyClick}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
});

export default PostComments;
