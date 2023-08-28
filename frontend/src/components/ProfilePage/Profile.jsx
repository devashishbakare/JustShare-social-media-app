import React from "react";
import { useLocation } from "react-router-dom";
import { DiJavascript1 } from "react-icons/di";
import {
  AiOutlineSearch,
  AiFillBell,
  AiFillCloseCircle,
  AiOutlineHeart,
} from "react-icons/ai";
import { FcGrid, FcPrevious, FcLike } from "react-icons/fc";
import { FaRocketchat, FaRegNewspaper, FaBookmark } from "react-icons/fa";
import { BsBookmarkHeartFill } from "react-icons/bs";
import { FcBookmark } from "react-icons/fc";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../constants";
import Post from "../Post/Post";
import Spinners from "../Spinners";
import CirculareSpinner from "../CirculareSpinner";
import { Comment } from "../Comments/Comment";
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
  const [postLoading, setPostLoading] = useState(false);
  const [userDetails, setUserDetails] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [postDetails, setPostDetails] = useState({});
  const [showPost, setShowPost] = useState(false);
  const [followStatus, setFollowStatus] = useState("Follow");
  const [followersCount, setFollowersCount] = useState(0);
  const [followingsCount, setFollowingsCount] = useState(0);
  const [bookmarkStatus, setBookmarkStatus] = useState(false);
  const [bookmarkLoader, setBookmarkLoader] = useState(false);
  const [postLikedBefore, setPostLikedBefore] = useState(false);
  const [postLikeCount, setPostLikeCount] = useState(0);
  //use this state for replying user
  const [isUserReplying, setIsUserReplying] = useState(false);
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

  const deleteComment = async (deletionRequest, commentId, deleteFrom) => {
    try {
      if (deletionRequest === "comment") {
        const config = {
          headers: {
            "Config-Type": "application/json",
          },
          data: { postId: deleteFrom, commentId },
        };
        const deleteResponse = await axios.delete(
          `${baseUrl}/comment/delete`,
          config
        );

        if (deleteResponse.status === 200) {
          return true;
        }
      } else {
        const config = {
          headers: {
            "Config-Type": "application/json",
          },
          data: { commentId: deleteFrom, replyId: commentId },
        };
        const deleteResponse = await axios.delete(
          `${baseUrl}/comment/deletReply}`,
          config
        );

        if (deleteResponse.status === 200) {
          return true;
        }
      }
    } catch (error) {
      toast.error("Something went wrong, Try again later", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return false;
    }
  };

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

  const showPostDetailsModal = async (postId) => {
    try {
      setPostLoading(true);
      const config = {
        headers: {
          "Config-Type": "application/json",
        },
      };

      const postResponse = await axios.get(
        `${baseUrl}/post/get/${postId}`,
        config
      );
      if (postResponse.status === 200) {
        const isBookmark = userDetails.bookmark.includes(
          postResponse.data.post._id
        );
        setBookmarkStatus(isBookmark);
        const isLikedBefore = await postResponse.data.post.like.includes(
          loggedInUserId
        );
        if (isLikedBefore) {
          setPostLikedBefore(true);
        }
        setPostLikeCount(postResponse.data.post.like.length);
        setPostDetails(postResponse.data);
        console.log("postDetails is here" + postResponse.data);
        setShowPost(true);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong, Try again later", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } finally {
      setPostLoading(false);
    }
  };

  const updateBookmarkStatus = async (currBookmarkStatus, postId, userId) => {
    try {
      setBookmarkLoader(true);
      if (currBookmarkStatus === false) {
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
          setBookmarkStatus(true);
          toast.success("Added To Bookmark List", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
      } else {
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
          `${baseUrl}/user/removeBookmark`,
          requestPostInfo,
          config
        );

        if (response.status === 200) {
          console.log(response.data);
          toast.success("Removed From Bookmark List", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          setBookmarkStatus(false);
        }
      }
    } catch (error) {
      toast.success("Something went wrong, try again later", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } finally {
      setBookmarkLoader(false);
    }
  };

  const handleLikeUpdate = async (postId, userId) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const info = {
        userId,
        postId,
      };
      const response = await axios.put(`${baseUrl}/post/like`, info, config);

      if (response.status === 200) {
        if (response.data.like === true) {
          setPostLikeCount(postLikeCount + 1);
          setPostLikedBefore(true);
        } else {
          setPostLikeCount(postLikeCount - 1);
          setPostLikedBefore(false);
        }
      }
    } catch (error) {
      toast.success("Something went wrong, try again later", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="h-[100vh] w-[100vw] centerDiv">
          <Spinners />
        </div>
      ) : (
        <div
          className={`h-auto w-[100vw] md:flex gap-1 bg-[#F5F5F5] relative ${
            showPost ? "backdrop-blur" : ""
          }`}
        >
          <div className="h-[7vh] w-full flex items-center pl-2 gap-5 md:hidden">
            <span className="">
              <FcPrevious className="text-[1.5rem]" />
            </span>
            <span className="">{userDetails.userName}</span>
          </div>
          <div className="h-auto w-full border-2 flex flex-col gap-2 md:hidden">
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
          <div className="h-auto w-[100vw] border-2 flex flex-wrap gap-1 centerDiv md:hidden">
            {userPosts.map((post) => (
              <>
                <div className="h-[15vh] w-[32%] cursor-pointer" key={post._id}>
                  <img
                    src={post.image}
                    alt="userPostImage"
                    className="h-full w-full object-cover"
                  />
                </div>
              </>
            ))}
          </div>
          <div className="hidden md:flex h-[100vh] w-[10vw] border-2 flex-col gap-[50px] items-center pt-7">
            <DiJavascript1 className="text-[2rem] cursor-pointer" />
            <AiOutlineSearch className="text-[2rem] cursor-pointer" />

            <AiFillBell className="text-[2rem] cursor-pointer" />
            <FaRocketchat className="text-[2rem] cursor-pointer" />
            <FaRegNewspaper className="text-[2rem] cursor-pointer" />
            <img
              src={userDetails.profilePicture}
              alt="userImage"
              className="h-[40px] w-[40px] rounded-[50%] object-cover"
            />
          </div>
          <div className="hidden md:flex h-[100vh] w-[89vw] border-2 flex-col">
            <div className="h-[30vh] min-h-[270px] w-full border-2 centerDiv gap-1">
              <div className="h-full w-[35%] border-2 centerDiv">
                <img
                  src={userDetails.profilePicture}
                  alt="userImage"
                  className="h-[200px] w-[200px] rounded-[50%] object-cover"
                />
              </div>
              <div className="h-full w-[64%] border-2 centerDiv flex-col gap-1 ">
                <div className="h-[25%] w-full border-2 flex items-center pl-3 gap-4">
                  <span className="text-[1.2rem]">{userDetails.userName}</span>
                  {loggedInUserId === userId ? (
                    <>
                      <span className="h-[35px] w-[100px] border-2 centerDiv cursor-pointer rounded-lg">
                        Edit Profile
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="h-[35acpx] w-[80px] border-2 centerDiv cursor-pointer rounded-lg">
                        {followStatus}
                      </span>
                    </>
                  )}
                  <span className="h-[35px] w-[80px] border-2 centerDiv rounded-lg">
                    Message
                  </span>
                </div>
                <div className="h-[20%] w-full border-2 flex items-center pl-3 gap-5">
                  <span className="text-[1.1rem]">
                    {userPosts.length}&nbsp; posts
                  </span>
                  <span className="text-[1.1rem]">
                    {followersCount}&nbsp; followers
                  </span>
                  <span className="text-[1.1rem]">
                    {followingsCount}&nbsp; following
                  </span>
                </div>
                <div className="h-auto min-h-[90px] w-full border-2 p-2">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Autem, quisquam! Reiciendis explicabo eius perferendis
                  doloribus expedita? Sapiente fugiat voluptas necessitatibus
                  ullam vitae numquam alias, reiciendis dolor suscipit
                </div>
              </div>
            </div>

            <div className="hidden md:flex h-auto w-full border-2 flex-wrap gap-1 centerDiv relative p-5">
              {!postLoading ? (
                <>
                  {userPosts.map((post) => (
                    <>
                      <div
                        className="h-[25vh] w-[32%] cursor-pointer"
                        key={post._id}
                        onClick={() => showPostDetailsModal(post._id)}
                      >
                        <img
                          src={post.image}
                          alt="userPostImage"
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </>
                  ))}
                </>
              ) : (
                <>
                  <div className="absolute top-[200px]">
                    <Spinners />
                  </div>
                </>
              )}
            </div>
          </div>
          {showPost && (
            <>
              <div className="centerPostModal h-[400px] w-[650px] border-2 bg-black flex gap-1">
                <div className="h-full] w-[45%] centerDiv">
                  <img
                    src={postDetails.post.image}
                    alt="postImage"
                    className="object-cover"
                  />
                </div>
                <div className="h-full] w-[55%] centerDiv border-2 flex-col">
                  <div className="h-[6%] min-h-[55px] w-full text-[#f5f5f5] flex items-center justify-between">
                    <span className="pl-3 h-full w-[80%] flex items-center">
                      {userDetails.userName}
                    </span>
                    <span
                      className="h-full w-[20%] centerDiv "
                      onClick={() => setShowPost(false)}
                    >
                      <AiFillCloseCircle className="text-[1.4rem]" />
                    </span>
                  </div>
                  <div className="h-[70%] min-h-[63px] w-full border-2 text-[#f5f5f5] flex items-center pl-1 overflow-y-scroll flex-col">
                    {postDetails.length > 0 ? (
                      <>
                        {" "}
                        {postDetails.comments.map((comment) => (
                          <>
                            <Comment
                              comment={comment}
                              key={comment._id}
                              deleteRequest={deleteComment}
                            />
                          </>
                        ))}
                      </>
                    ) : (
                      <>
                        <div className="h-full w-full centerDiv text-[1rem] text-[#f5f5f5] opacity-50">
                          Be the first person to add comment !!
                        </div>
                      </>
                    )}
                  </div>
                  <div className="h-[15%] min-h-[55px] w-full flex gap-1">
                    <span className="h-full w-[80%] flex items-center text-white pl-2">
                      {postLikedBefore ? (
                        <>
                          <FcLike
                            className="text-[1.5rem]"
                            onClick={() =>
                              handleLikeUpdate(
                                postDetails.post._id,
                                loggedInUserId
                              )
                            }
                          />
                        </>
                      ) : (
                        <>
                          <AiOutlineHeart
                            className="text-[1.5rem]"
                            onClick={() =>
                              handleLikeUpdate(
                                postDetails.post._id,
                                loggedInUserId
                              )
                            }
                          />
                        </>
                      )}
                      {postLikeCount == 0 ? (
                        <>
                          {" "}
                          &nbsp;&nbsp;
                          <span className="text-[0.8rem] opacity-50">
                            Be the first person to like this post
                          </span>
                        </>
                      ) : (
                        <>
                          &nbsp;
                          {postLikeCount} &nbsp;{" "}
                          <span className="text-[0.8rem] opacity-70">
                            people liked this post
                          </span>
                        </>
                      )}
                    </span>
                    <span className="h-full w-[20%] centerDiv">
                      {bookmarkLoader ? (
                        <>
                          <span className="h-full w-full centerDiv">
                            <CirculareSpinner />
                          </span>
                        </>
                      ) : (
                        <>
                          {bookmarkStatus ? (
                            <>
                              <span
                                className="h-full w-full centerDiv"
                                onClick={() =>
                                  updateBookmarkStatus(
                                    true,
                                    postDetails.post._id,
                                    loggedInUserId
                                  )
                                }
                              >
                                <FcBookmark className="text-[1.5rem]" />
                              </span>
                            </>
                          ) : (
                            <>
                              <img
                                src="https://www.linkpicture.com/q/bg-removebg-preview.jpg"
                                alt="bookmarkImage"
                                className="h-[35px] w-[35px] object-cover rounded-[50%]"
                                onClick={() =>
                                  updateBookmarkStatus(
                                    false,
                                    postDetails.post._id,
                                    loggedInUserId
                                  )
                                }
                              />
                            </>
                          )}
                        </>
                      )}
                    </span>
                  </div>
                  <div className="h-[10%] min-h-[55px] w-full border-2 text-[#f5f5f5] flex items-center pl-3">
                    {userDetails.userName}
                  </div>
                </div>
              </div>
            </>
          )}
          <ToastContainer />
        </div>
      )}
    </>
  );
};

export default Profile;
