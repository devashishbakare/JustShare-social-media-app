import React, { useState } from "react";
import style from "./commentReply.module.css";
import PostComments from "./PostComments";
import postStyle from "./post.module.css";
import { AiFillCloseCircle } from "react-icons/ai";
const commentReply = React.memo((props) => {
  const { commentData, exitReplyBox, setExitReplyBox } = props;

  const userDetails = localStorage.getItem("user");
  const user = JSON.parse(userDetails);
  const userId = user._id;
  const postId = commentReply.postId;
  const [text, setText] = useState("");

  const handleCommentChange = (e) => {
    setText(...text, e.target.value);
  };

  const postReplyCommentHandler = (event) => {
    event.preventDefault();
    console.log("sending data to backend");
    //setExitReplyBox(exitReplyBox);
  };
  return (
    <div className={style.commentReplyContainer}>
      <div className={style.commentReplyWrapper}>
        <div className={style.commentWrapper}>
          <PostComments comment={commentData} />
        </div>
        <div className={style.replyFormWrapper}>
          <form
            className={style.commentFormFrom}
            onSubmit={postReplyCommentHandler}
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
              onClick={() => {
                setExitReplyBox(!exitReplyBox);
              }}
              className={style.closeCommentButton}
            />
          </form>
        </div>
      </div>
    </div>
  );
});

export default commentReply;
