import style from "./profile.module.css";
import React from "react";
import { useLocation } from "react-router-dom";
import NavBar from "../Navbar/Navbar";
//todo : we need replace this with real friend img
import f1 from "../../assets/user/img4.jpeg";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../constants";
import Post from "../Post/Post";
import Spinners from "../Spinners";
const Profile = () => {
  const location = useLocation();
  const userId = location.state;
  console.log("userId " + userId);

  const [userDetails, setUserDetails] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const config = {
          headers: {
            "Config-Type": "application/json",
          },
        };

        const userResponse = await axios.get(
          `${baseUrl}/user/getUser/${userId}`,
          config
        );
        const postResponse = await axios.get(
          `${baseUrl}/post/userPosts/${userId}`,
          config
        );
        // console.log(userResponse.data);
        console.log("Post data", postResponse.data);
        console.log("User data", userResponse.data);
        setUserDetails(userResponse.data);
        setUserPosts(postResponse.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Eroor while fetchin user Details", error);
      }
    };

    getUserDetails();
  }, []);

  return (
    <>
      {isLoading ? (
        <Spinners />
      ) : (
        <div className={style.profilePageContainer}>
          <div className={style.navBar}>
            <NavBar />
          </div>
          <div className={style.postContainer}>
            <div className={style.userInfoContainer}>
              <div className={style.userProfileImg}>
                <div className={style.userImgWrapper}>
                  <img
                    className={style.userImage}
                    src={userDetails.profilePicture}
                    alt="Profile Photo"
                  />
                </div>
              </div>
              <div className={style.userFriendsDetails}>
                <div className={style.userFriendsDetailsHeading}>
                  <div className={style.userNameWrapper}>
                    <span className={style.userNameText}>John Doe</span>
                  </div>
                  <div className={style.FollowRequestWrapper}>
                    <button className={style.followButton}>Follow</button>
                  </div>
                  <div className={style.editProfileWrapper}>
                    <button className={style.editProfieButton}>
                      Edit Profile
                    </button>
                  </div>
                </div>
                <div className={style.dividerContainer}>
                  <hr className={style.userInfoDivider} />
                </div>

                <div className={style.userAndconnectionsInfo}>
                  <div className={style.userPostCount}>
                    <span className={style.countHeading}>Posts</span>
                    <span className={style.infoCount}>{userPosts.length}</span>
                  </div>
                  <div className={style.userFollowingCount}>
                    <span className={style.countHeading}>Following</span>
                    <span className={style.infoCount}>
                      {userDetails.followings.length}
                    </span>
                  </div>
                  <div className={style.userFollwersCount}>
                    <span className={style.countHeading}>Followers</span>
                    <span className={style.infoCount}>
                      {userDetails.followers.length}
                    </span>
                  </div>
                </div>
              </div>
              <div className={style.userOtherDetails}></div>
            </div>
            <div className={style.userPostContainer}>
              <div className={style.userPostInfoWrapper}>
                <div className={style.userPosts}>
                  {userPosts.map((post) => (
                    <Post key={post._id} props={post} />
                  ))}
                </div>
                <div className={style.userFriends}></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
