import React from "react";
import style from "./post.module.css";
import { FaEllipsisH } from "react-icons/fa";
import like from "../../assets/like.jpeg";
// import profilePicture from "../../assets/user/img4.jpeg";
const PostComments = React.memo(({ props }) => {
  console.log(props.postComment.text);
  const { profilePicture, commenterName, text } = props.postComment;

  const handleLikeComment = () => {};

  return (
    <>
      <div className={style.commentListWrapper}>
        <div className={style.singleComment}>
          <div className={style.commentInputWrapper}>
            <div className={style.commentNameImgWrapper}>
              <img
                className={style.comenterProfilePhoto}
                src={profilePicture}
                alt="user_image"
              />
              <span className={style.commenterName}>{commenterName}</span>
            </div>
            <FaEllipsisH className={style.commentOptions} />
          </div>
          <span className={style.singleCommentText}>{text}</span>
          <div className={style.likeReply}>
            <img
              src={like}
              alt="Like_Image"
              className={style.commentLikeImg}
              onClick={handleLikeComment}
            />
            <span>Reply</span>
          </div>
        </div>
      </div>
    </>
  );
});

export default PostComments;
