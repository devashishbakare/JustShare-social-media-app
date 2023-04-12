import React, { useState, useEffect } from "react";
import style from "./feed.module.css";
import { FcAddImage, FcLike } from "react-icons/fc";
import Post from "../Post/Post";
import axios from "axios";
import { baseUrl } from "../constants";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  // Fetchin data from local storage and updating info on runTime
  const userDetails = localStorage.getItem("user");
  const user = JSON.parse(userDetails);
  const { profilePicture, userName } = user;
  const userId = user._id;

  //Storing a input for sending to db
  const [postDetails, setPostDetails] = useState({
    userId: userId,
    desc: "",
    image: "",
  });

  // handeling a input and savin in object
  const handleChange = (event) => {
    setPostDetails({
      ...postDetails,
      [event.target.name]: event.target.value,
    });
  };

  // Getting picture and uploading on cloud and getting url for picture and storing in db
  const handleUploadPicture = async (picture) => {
    try {
      if (
        picture.type === "image/jpeg" ||
        picture.type === "image/jpg" ||
        picture.type === "image/png"
      ) {
        const data = new FormData();
        data.append("file", picture);
        data.append("upload_preset", "Social Media App");
        data.append("cloud_name", "djgouef8q");

        const response = await fetch(
          "https://api.cloudinary.com/v1_1/djgouef8q/upload",
          {
            method: "post",
            body: data,
          }
        );
        const uploadedImageUrl = await response.json();
        setPostDetails({
          ...postDetails,
          image: uploadedImageUrl.url.toString(),
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // User post request handler
  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log(postDetails);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await axios.post(
      `${baseUrl}/post/create`,
      postDetails,
      config
    );

    if (response) {
      setPosts([...posts, response.data]);
    }
  };

  useEffect(() => {
    const fetchTimeLine = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          id: userId,
        },
      };
      let fetchPosts = await axios.get(`${baseUrl}/post/timeline`, config);

      if (fetchPosts) {
        setPosts([...fetchPosts.data]);
      }
    };

    fetchTimeLine();
  }, []);

  return (
    <>
      <div className={style.uploadPostContainer}>
        <form onSubmit={handleSubmit}>
          <div className={style.profileAndDesription}>
            <img
              src={profilePicture}
              alt="profile img"
              className={style.uploadPostProfilePhoto}
            />
            <input
              type="text"
              className={style.uploadPostDescription}
              placeholder={`whats in your mind ${userName}...`}
              name="desc"
              onChange={handleChange}
            />
          </div>
          <hr />
          <div className="uploadSharingDetails">
            <ul className={style.listItmes}>
              <li>
                <FcAddImage className={style.iconStyle} />
                <input
                  type="file"
                  className={style.uploadPostText}
                  onChange={(e) => handleUploadPicture(e.target.files[0])}
                />
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
        </form>
      </div>
      <div className={style.uploadedPost}>
        {/* <Post /> */}
        {posts.map((post) => (
          <Post key={post._id} props={post} />
        ))}
      </div>
    </>
  );
};

export default Feed;
