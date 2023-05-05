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

  const storedUserDetails = localStorage.getItem("user");
  const user = JSON.parse(storedUserDetails);
  const loggedInUserId = user._id;

  const [userDetails, setUserDetails] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showEditButton, setShowEditButton] = useState(false);
  const [folloStatus, setFollowStatus] = useState("Follow");
  const [followersCount, setFollowersCount] = useState(0);
  const [followingsCount, setFollowingsCount] = useState(0);
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

        if (userId !== loggedInUserId) {
          if (userResponse.data.followers.includes(loggedInUserId)) {
            setFollowStatus("Unfollow");
          } else {
            setFollowStatus("Follow");
          }
        }
        setUserDetails(userResponse.data);
        setUserPosts(postResponse.data);
        setFollowersCount(userResponse.data.followers.length);
        setFollowingsCount(userResponse.data.followings.length);
        setIsLoading(false);
      } catch (error) {
        console.error("Eroor while fetchin user Details", error);
      }
    };

    getUserDetails();
  }, [userId]);

  const handleFollowRequest = async () => {
    if (userId === loggedInUserId) {
      console.error("user can not follow himself");
    } else {
      try {
        if (folloStatus === "Follow") {
          const config = {
            headers: {
              "Config-Type": "application/json",
            },
          };
          const data = {
            requestingUser: loggedInUserId,
            requestedUser: userId,
          };
          const response = await axios.put(
            `${baseUrl}/user/follow`,
            data,
            config
          );
          if (response.status === 200) {
            console.log("Followed");
            setFollowersCount(followersCount + 1);
            setFollowStatus("Unfollow");
          } else {
            //todo : toast a notification for followed successfully
          }
        } else {
          const config = {
            headers: {
              "Config-Type": "application/json",
            },
          };
          const data = {
            requestingUser: loggedInUserId,
            requestingUser: userId,
          };
          const response = await axios.put(
            `${baseUrl}/user/unfollow`,
            data,
            config
          );
          if (response.status === 200) {
            console.log("Unfollowed");
            setFollowingsCount(followingsCount - 1);
            setFollowStatus("Follow");
          } else {
            //todo : toast a notification for unfollow succesfully
          }
        }
      } catch (error) {
        console.error("Error in follow Request");
      }
    }
  };

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
                    <span className={style.userNameText}>
                      {userDetails.userName}
                    </span>
                  </div>
                  {loggedInUserId !== userId && (
                    <div className={style.FollowRequestWrapper}>
                      <button
                        className={style.followButton}
                        onClick={handleFollowRequest}
                      >
                        {folloStatus}
                      </button>
                    </div>
                  )}

                  {loggedInUserId == userId && (
                    <div className={style.editProfileWrapper}>
                      <button className={style.editProfieButton}>
                        Edit Profile
                      </button>
                    </div>
                  )}
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
                    <span className={style.infoCount}>{followingsCount}</span>
                  </div>
                  <div className={style.userFollwersCount}>
                    <span className={style.countHeading}>Followers</span>
                    <span className={style.infoCount}>{followersCount}</span>
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
