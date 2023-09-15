import React, { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Spinners from "./Spinners";
import axios from "axios";
import { baseUrl } from "./constants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BsChevronLeft } from "react-icons/bs";
import { Comment } from "./Comments/Comment";
import { DiJavascript1 } from "react-icons/di";
import {
  AiOutlineSearch,
  AiFillBell,
  AiFillCloseCircle,
  AiOutlineHeart,
} from "react-icons/ai";
import { FcGrid, FcPrevious, FcLike } from "react-icons/fc";
import { FaRocketchat, FaRegNewspaper, FaBookmark } from "react-icons/fa";
import { FcBookmark } from "react-icons/fc";
import CirculareSpinner from "./CirculareSpinner";
// This is for profile post for small mobile screen;
export const ProfilePost = () => {
  const location = useLocation();
  const postId = location.state.postId;
  const userId = location.state.userId;
  const previousPage = location.state.page;
  const prevPageProfileId = location.state.prevPageProfileId;
  console.log("postId " + postId);
  const user = localStorage.getItem("user");
  const loggedInUserId = JSON.parse(user)._id;

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [postDetails, setPostDetails] = useState([]);
  const [postComments, setPostComments] = useState([]);
  const [postOwnderDetails, setPostOwnerDetails] = useState([]);
  const [followRequestLoader, setFollowRequestLoader] = useState(false);
  const [bookmarkLoader, setBookmarkLoader] = useState(false);
  const [postLikeCount, setPostLikeCount] = useState();
  const [postLikedBefore, setPostLikedBefore] = useState();
  const [isUserReplying, setIsUserReplying] = useState(false);
  const [userComment, setUserComment] = useState("");
  const [replyingTo, setReplyingTo] = useState("");
  const [commentToReplyId, setCommnetToReplyId] = useState("");
  const [followStatus, setFollowStatus] = useState();
  const [loggedInUserDetails, setLoggedInUserDetails] = useState([]);
  const [bookmarkStatus, setBookmarkStatus] = useState(false);
  const [postCrudMenu, setPostCrudMenu] = useState(false);
  const parentId = "-1";
  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        setIsLoading(true);
        const postResponse = await axios.get(`${baseUrl}/post/get/${postId}`);
        const userResponse = await axios.get(
          `${baseUrl}/user/getUser/${userId}`
        );
        const loggedInUserDetailsResponse = await axios.get(
          `${baseUrl}/user/getUser/${loggedInUserId}`
        );
        if (
          postResponse.status === 200 &&
          userResponse.status === 200 &&
          loggedInUserDetailsResponse.status === 200
        ) {
          const isBookmark =
            await loggedInUserDetailsResponse.data.bookmark.includes(postId);
          const isLikedBefore = await postResponse.data.post.like.includes(
            loggedInUserId
          );
          setPostLikeCount(postResponse.data.post.like.length);
          setBookmarkStatus(isBookmark);
          setPostLikedBefore(isLikedBefore);
          setPostDetails(postResponse.data.post);
          setPostComments(postResponse.data.comments);
          setPostOwnerDetails(userResponse.data);
          setLoggedInUserDetails(loggedInUserDetailsResponse.data);
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
      } finally {
        setIsLoading(false);
      }
    };

    fetchPostDetails();
  }, [postId, userId, loggedInUserId]);

  const deleteComment = useCallback(
    async (deleteRequest, postId, commentId) => {
      console.log(deleteRequest + " " + postId + " " + commentId);
      if (deleteRequest) {
        try {
          const config = {
            headers: {
              "Config-Type": "application/json",
            },
            data: {
              postId,
              commentId,
            },
          };

          const deleteCommentResponse = await axios.delete(
            `${baseUrl}/comment/delete`,
            config
          );

          if (deleteCommentResponse.status === 200) {
            console.log(deleteCommentResponse.data);

            const updatedListOfComments = [];
            postComments.map((comment) => {
              if (comment._id !== deleteCommentResponse.data) {
                updatedListOfComments.push(comment);
              }
              return comment;
            });
            setPostComments(updatedListOfComments);
            return true;
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
      }
    },
    []
  );

  const handleFollowRequest = async () => {
    try {
      setFollowRequestLoader(true);
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
          toast.success("followed !!", {
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
            "Config-Type": "application/json",
          },
        };
        const data = {
          requestingUser: loggedInUserId,
          requestedUser: userId,
        };
        const response = await axios.put(
          `${baseUrl}/user/unfollow`,
          data,
          config
        );
        if (response.status === 200) {
          toast.success("unfollowed !!", {
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
      }
    } catch (error) {
      console.error("Error in follow Request");
      toast.error("something went wrong, try again later", {
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
      setFollowRequestLoader(false);
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
          setBookmarkStatus(false);
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
        }
      }
    } catch (error) {
      toast.error("Something went wrong, try again later", {
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

  const handlePostComment = async (postId) => {
    try {
      console.log("postId " + postId + " comment " + userComment);

      console.log("test" + userComment);
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const data = {
        userId: loggedInUserId,
        postId,
        newComment: userComment,
      };
      const response = await axios.post(
        `${baseUrl}/comment/create`,
        data,
        config
      );
      if (response.status === 200) {
        const newComment = response.data.data;
        console.log("new COmment Id " + newComment._id);
        const updatedComments = [newComment, ...postComments];
        setUserComment("");
        setPostComments(updatedComments);
        //we have done this
        toast.success("Comment has been added..!", {
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
    } catch (error) {
      toast.error("Something went wrong, try again later", {
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
  const handleReplyComment = async (commentId) => {
    console.log("411 " + userComment + " whom to comment " + commentId);

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const data = {
        userId: loggedInUserId,
        postId: "-1",
        newComment: userComment,
        commentId,
      };
      const response = await axios.post(
        `${baseUrl}/comment/commentReply`,
        data,
        config
      );

      if (response.status === 200) {
        console.log("reply Id " + response.data);
        setPostComments((prevComments) => {
          const updatedComments = prevComments.map((eachComment) => {
            if (eachComment._id === commentId) {
              const replyArray = [response.data, ...eachComment.reply];
              return { ...eachComment, reply: replyArray };
            }
            return eachComment;
          });
          setUserComment("");
          setIsUserReplying(false);
          return updatedComments;
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Replying Comment Failed, try again later", {
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

  const userWantToReply = useCallback(
    (status, commentId, personToComment) => {
      console.log(
        commentId +
          " " +
          personToComment +
          " here is id that we want to add reply..."
      );

      if (status) {
        setCommnetToReplyId(commentId);
        setIsUserReplying(true);
        setReplyingTo(personToComment);
      }
    },
    [setCommnetToReplyId, setReplyingTo]
  );

  const editComment = async (postId, commentId, text) => {
    try {
      console.log(
        " postId " + postId + " commentId " + commentId + " text " + text
      );

      const config = {
        headers: {
          "Config-type": "application/json",
        },
      };

      const data = {
        postId,
        commentId,
        text,
      };
      const editResponse = await axios.put(
        `${baseUrl}/comment/edit`,
        data,
        config
      );
      if (editResponse.status === 200) {
        setPostComments((prevComments) => {
          return prevComments.map((comment) => {
            if (comment._id === editResponse.data._id) {
              return {
                ...comment,
                text: editResponse.data.text,
              };
            }

            return comment;
          });
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Edit Comment Failed, try again later", {
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

  const handleDeletpost = async () => {
    try {
    } catch (error) {
      console.log(error);
      toast.error("Edit Comment Failed, try again later", {
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
        <>
          <div className="centerPostModal">
            <Spinners />
          </div>
        </>
      ) : (
        <>
          <div className="h-auto min-h-[900px] w-[100vw] bg-[black] flex flex-col justify-center">
            <div
              className="h-[55px] w-full text-white flex centerDiv font-semibold border-b-2 border-b-gray-700"
              onClick={() =>
                navigate("/profile", {
                  state: { userId: prevPageProfileId, page: previousPage },
                })
              }
            >
              <span className="h-full w-[10%] centerDiv ml-2">
                <BsChevronLeft className="text-[1.5rem]" />
              </span>
              <span className=" h-full w-[90%] pl-[32%] flex items-center">
                Posts
              </span>
            </div>
            <div className="h-[70px] w-full flex">
              <div className="h-full w-[18%] ml-[2%] centerDiv">
                <img
                  src={postOwnderDetails.profilePicture}
                  alt="postImage"
                  className="h-[40px] w-[40px] rounded-[50%] object-cover"
                />
              </div>
              <div className="h-full w-[65%]  text-white flex items-center pl-1">
                {postOwnderDetails.userName}
              </div>
              {prevPageProfileId === loggedInUserId && (
                <>
                  <div
                    className="h-full w-[15%] centerDiv gap-1 relative"
                    onClick={() => setPostCrudMenu(true)}
                  >
                    <span className="h-[4px] w-[4px] bg-white rounded-[50%]"></span>
                    <span className="h-[4px] w-[4px] bg-white rounded-[50%]"></span>
                    <span className="h-[4px] w-[4px] bg-white rounded-[50%]"></span>
                  </div>
                  {postCrudMenu && (
                    <>
                      <div className="absolute top-[11%] right-1 h-auto w-auto flex flex-col bg-white">
                        <span
                          className="h-[40px] w-[110px] centerDiv"
                          onClick={handleDeletpost}
                        >
                          Delete
                        </span>
                        <hr />
                        <span className="h-[40px] w-[110px] centerDiv">
                          Edit
                        </span>
                        <hr />
                        <span
                          className="h-[40px] w-[110px] centerDiv"
                          onClick={() => setPostCrudMenu(!postCrudMenu)}
                        >
                          Close
                        </span>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
            <div className="h-auto w-full">
              <img
                src={postDetails.image}
                alt="postImage"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="h-[6%] min-h-[55px] bg-black w-full flex gap-1 border-t-[1px] items-center">
              <span className="h-full w-[80%] flex items-center text-white pl-2">
                {postLikedBefore ? (
                  <>
                    <FcLike
                      className="text-[1.5rem]"
                      onClick={() =>
                        handleLikeUpdate(postDetails._id, loggedInUserId)
                      }
                    />
                  </>
                ) : (
                  <>
                    <AiOutlineHeart
                      className="text-[1.5rem]"
                      onClick={() =>
                        handleLikeUpdate(postDetails._id, loggedInUserId)
                      }
                    />
                  </>
                )}
                {postLikeCount === 0 ? (
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
                              postDetails._id,
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
                              postDetails._id,
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
            <div className="h-[400px] w-[101vw] bg-[black] text-[#f5f5f5] flex items-center pl-2 overflow-y-scroll flex-col">
              <div className="h-auto w-full flex bg-[black]">
                <span className="h-[30px] w-[30px] flex justify-center mt-2">
                  <img
                    src={postOwnderDetails.profilePicture}
                    alt="commenterProfilePhoto"
                    className="h-full w-full object-cover rounded-[50%]"
                  />
                </span>
                <span className="h-auto w-[90%] text-[0.9rem] ml-2 p-1">
                  <span className="font-semibold">
                    {" "}
                    {postOwnderDetails.userName}
                  </span>
                  &nbsp;
                  {postDetails.desc}
                </span>
              </div>
              {postComments.length > 0 ? (
                <>
                  {postComments.map((comment) => (
                    <>
                      <Comment
                        parentId={parentId}
                        comment={comment}
                        key={comment._id}
                        userReplyingStatus={userWantToReply}
                        deleteComment={deleteComment}
                        editComment={editComment}
                      />
                    </>
                  ))}
                </>
              ) : (
                <>
                  <div className="h-full w-full bg-black centerDiv text-[1rem] text-[#f5f5f5] opacity-50">
                    Be the first person to add comment !!
                  </div>
                </>
              )}
            </div>
            <div className="h-[20%] min-h-[55px] w-full text-[#f5f5f5] flex items-center border-t-[1px] ">
              {isUserReplying ? (
                <>
                  <div className="h-[100%] w-full flex flex-col bg-black">
                    <span className="h-[40%] w-full pl-1 flex items-center text-[0.8rem]">
                      <span className="h-full w-[80%] opacity-60 bg-black">
                        Replying to @{replyingTo}
                      </span>
                      <span
                        className="h-full w-[20%] pr-2 centerDiv"
                        onClick={() => setIsUserReplying(!isUserReplying)}
                      >
                        <AiFillCloseCircle className="text-[1.1rem]" />
                      </span>
                    </span>
                    <div className="h-[70%] w-full flex items-center overflow-hidden">
                      <textarea
                        className="h-[100%] w-[82%] text-[0.9rem] bg-black resize-none min-w-[290px] placeHolderCss outline-none border-none"
                        value={userComment}
                        onChange={(event) => setUserComment(event.target.value)}
                        placeholder="Add your Reply here..."
                      />
                      <span
                        className="h-[100%] text-[0.9rem] w-[15%] opacity-90 centerDiv"
                        onClick={() => handleReplyComment(commentToReplyId)}
                      >
                        post
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="h-auto w-full flex justify-between bg-black">
                    <textarea
                      className="h-auto w-[85%] text-[0.9rem] bg-black min-h-[75px] min-w-[270px] pt-4 pl-1 resize-none placeHolderCss border-none outline-none"
                      value={userComment}
                      onChange={(event) => setUserComment(event.target.value)}
                      placeholder="Add your comment here..."
                    />
                    <span
                      className="h-auto text-[0.9rem] w-[15%] opacity-90 centerDiv bg-black"
                      onClick={() => handlePostComment(postDetails._id)}
                    >
                      post
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
          <ToastContainer />
        </>
      )}
    </>
  );
};
