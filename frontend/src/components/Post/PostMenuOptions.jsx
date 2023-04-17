import React, { useContext } from "react";
import style from "./postMenuOption.module.css";
import axios from "axios";
import { baseUrl } from "../constants";
import FeedContext from "../../Contex/FeedContext";
const PostMenuOptions = ({ postDetails }) => {
  const userDetails = localStorage.getItem("user");
  const userJson = JSON.parse(userDetails);
  const userId = userJson._id;
  const { postId, toggleOptions } = postDetails;
  const { posts, setPosts } = useContext(FeedContext);

  const handleDeletePost = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios.delete(
        `${baseUrl}/post/delete/${postId}`,
        config
      );
      if (response.status === 200) {
        console.log("Deleted post", response.data);
        const updatedPost = posts.filter((post) => post._id !== postId);
        setPosts(updatedPost);
        toggleOptions();
      } else {
        //todo : handle error here
      }
    } catch (error) {
      console.error(error, "erro while deleting a post");
    }
  };

  const handlePostBookmark = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const requestPostInfo = {
        userId,
        postId,
      };
      const response = await axios.post(
        `${baseUrl}/user/bookmark`,
        requestPostInfo,
        config
      );

      if (response.status === 200) {
        console.log("bookmariking a post", response.data.message);
        toggleOptions();
      } else {
        //todo : you have to push a notification and handle if any error:
      }
    } catch (error) {
      console.error(error, "error while bookmarking a post");
    }
  };

  return (
    <>
      <div className={style.menuOptionContainer}>
        <div className={style.menuWrapper}>
          <div className={style.options} onClick={handlePostBookmark}>
            Bookmark
          </div>
          <div className={style.options}>Edit</div>
          <div className={style.options} onClick={handleDeletePost}>
            Delete
          </div>
          <div className={style.options} onClick={() => toggleOptions()}>
            Cancle
          </div>
        </div>
      </div>
    </>
  );
};

export default PostMenuOptions;
