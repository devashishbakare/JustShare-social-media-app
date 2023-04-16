import React from "react";
import style from "./postMenuOption.module.css";
const PostMenuOptions = ({ postDetails }) => {
  const { postId, toggleOptions } = postDetails;
  return (
    <>
      <div className={style.menuOptionContainer}>
        <div className={style.menuWrapper}>
          <div className={style.options}>Bookmark</div>
          <div className={style.options}>Edit</div>
          <div className={style.options}>Delete</div>
          <div className={style.options} onClick={() => toggleOptions()}>
            Cancle
          </div>
        </div>
      </div>
    </>
  );
};

export default PostMenuOptions;
