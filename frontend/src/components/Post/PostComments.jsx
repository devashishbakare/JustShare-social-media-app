import React, { useState } from "react";
import style from "./post.module.css";
import { FaEllipsisH } from "react-icons/fa";
import likeImg from "../../assets/like.jpeg";
import axios from "axios";
import { baseUrl } from "../constants";
import CommentReply from "./CommentReply";
import Spinners from "../Spinners";
// import CommentReply from "./CommentReply";
// import profilePicture from "../../assets/user/img4.jpeg";
const PostComments = React.memo(({ comment }) => {
  //console.log(comment, "comment");
  const { commenterProfilePicture, commenterName, text, like, postId } =
    comment;
  const [likeCount, setLikeCount] = useState(like.length);
  const [isReplyclick, setIsReplyClick] = useState(false);
  const [updatedComment, setUpdatedComment] = useState(comment);
  const [commentReply, setCommentReply] = useState([]);
  const [isCommentsLoading, setIsCommentLoading] = useState(true);
  const [showReply, setShowReply] = useState(false);
  const userDetails = localStorage.getItem("user");
  const user = JSON.parse(userDetails);
  const userId = user._id;
  console.log("count of reply array", updatedComment.reply.length);
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

  const fetchReply = async () => {
    setShowReply(!showReply);
    setIsCommentLoading(true);
    //fetching comment from backend
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await axios.get(
        `${baseUrl}/post/comment/fetchReply/${comment._id}`,
        config
      );

      if (response.status === 200) {
        console.log(response.data);
        setCommentReply(response.data);
      }
    } catch (err) {
      console.error(err, "Errow while fetching comments");
    }
    setIsCommentLoading(false);
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
                setUpdateCommentReply={setUpdatedComment}
              />
            )}
            {updatedComment.reply.length > 0 && (
              <>
                {showReply ? (
                  <span className={style.showReplyButton} onClick={fetchReply}>
                    Hide Replies
                  </span>
                ) : (
                  <span className={style.showReplyButton} onClick={fetchReply}>
                    Show Replies
                  </span>
                )}
              </>
            )}
          </div>
        </div>
        {showReply && (
          <>
            {isCommentsLoading ? (
              <Spinners />
            ) : (
              <>
                <div className={style.showReplyWrapper}>
                  <div className={style.replyLeftSide}></div>
                  <div className={style.replyRightSide}>
                    {commentReply.map((repliedComment) => (
                      <PostComments
                        key={repliedComment._id}
                        comment={repliedComment}
                      />
                    ))}
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
});

export default PostComments;
