import style from "./profile.module.css";
import React from "react";
import { useLocation } from "react-router-dom";
import NavBar from "../Navbar/Navbar";
//todo : we need replace this with real friend img
import f1 from "../../assets/user/img4.jpeg";
import { FcGrid } from "react-icons/fc";
import { FaBookmark } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../constants";
import Post from "../Post/Post";
import Spinners from "../Spinners";
const Profile = () => {
  //visiters userId details
  const location = useLocation();
  const userId = location.state;
  console.log("userId " + userId);

  //loggedIn userId details
  const storedUserDetails = localStorage.getItem("user");
  const user = JSON.parse(storedUserDetails);
  const loggedInUserId = user._id;
  console.log("from storage", loggedInUserId);

  const [userDetails, setUserDetails] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showEditButton, setShowEditButton] = useState(false);
  const [followStatus, setFollowStatus] = useState("Follow");
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
        if (followStatus === "Follow") {
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
          }
        }
      } catch (error) {
        console.error("Error in follow Request");
        //todo: add notification for something went wrong, try again later
      }
    }
  };

  return (
    <>
      {isLoading ? (
        <Spinners />
      ) : (
        <div className="h-auto w-[100vw]">
          <div className="h-auto w-full border-2 flex flex-col gap-2">
            <div className="h-[15vh] min-h-[135px] w-[100vw] max-w-[400px] border-2 flex gap-1">
              <div className="h-full w-[35%] border-2 centerDiv">
                <img
                  src={userDetails.profilePicture}
                  alt="userImage"
                  className="h-[110px] w-[110px] rounded-[50%] object-cover"
                />
              </div>
              <div className="h-full w-[63%] flex flex-col">
                <div className="h-[40%] w-full border-2 flex items-center pl-2">
                  {userDetails.userName}
                </div>

                <div className="h-[60%] w-full border-2 flex gap-3 items-center pl-2">
                  {loggedInUserId === userId ? (
                    <>
                      <span className="h-[30px] w-[100px] border-2 centerDiv cursor-pointer">
                        Edit Profile
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="h-[30px] w-[80px] border-2 centerDiv cursor-pointer">
                        {followStatus}
                      </span>
                    </>
                  )}

                  <span className="h-[30px] w-[80px] border-2 centerDiv">
                    Message
                  </span>
                </div>
              </div>
            </div>
            <div className="h-auto w-[100vw] max-w-[400px] border-2 p-2">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Laboriosam, id.
            </div>
            <div className="h-[5vh] min-h-[45px] w-full border-2 border-red-500 centerDiv">
              <span className="h-full w-[33%] centerDiv">
                {userPosts.length}&nbsp;posts
              </span>
              <span className="h-full w-[33%] centerDiv">
                {followersCount}&nbsp;followers
              </span>
              <span className="h-full w-[33%] centerDiv">
                {followingsCount}&nbsp;following
              </span>
            </div>
            <div className="h-[7vh] min-h-[63px] w-full flex gap-1 border-2 centerDiv">
              <span className=" h-full w-[50%] centerDiv">
                <FcGrid className="text-[2rem]" />
              </span>
              <span className="h-full w-[50%] centerDiv">
                <FaBookmark className="text-[1.6rem]" />
              </span>
            </div>
          </div>
          <div className="h-auto w-[100vw] border-2">
            {userPosts.map((post) => (
              <>
                <div className="h-[40vh] w-full" key={post._id}>
                  <img
                    src={post.image}
                    alt="userPostImage"
                    className="h-full w-full object-cover"
                  />
                </div>
              </>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
