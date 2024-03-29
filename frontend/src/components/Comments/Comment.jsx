import React, { useState, useEffect } from "react";
// import { PiDotsThreeOutlineBold } from "react-icons/pi";
import { FcLike } from "react-icons/fc";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { baseUrl } from "../constants";
import "react-toastify/dist/ReactToastify.css";
import { AiFillCloseCircle, AiOutlineHeart } from "react-icons/ai";

export const Comment = React.memo(
  ({ parentId, comment, userReplyingStatus, deleteComment, editComment }) => {
    console.log("re-rendered");
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user._id;
    const [commentLoader, setCommentLoader] = useState(false);
    const [replies, setReplies] = useState([]);
    const [toggleShowComments, setToggleShowComments] = useState(false);
    const [showCommentMenu, setShowCommentMenu] = useState(false);
    const [commentReplyCount, setCommentReplyCount] = useState();
    const [editCommentModal, setEditCommentModal] = useState(false);
    const [userComment, setUserComment] = useState("");
    const [isCommentLike, setIsCommentLike] = useState(comment.like.length);

    console.log("this length " + comment.reply.length);
    useEffect(() => {
      setCommentReplyCount(comment.reply.length);
    }, [comment.reply.length]);

    const fetchReplies = async (commentId) => {
      setCommentLoader(true);
      console.log("triggered this");
      try {
        const config = {
          headers: {
            "Config-Type": "application/json",
          },
        };

        const response = await axios.get(
          `${baseUrl}/comment/fetchReply/${commentId}`,
          config
        );

        if (response.status === 200) {
          console.log(response.data);
          setReplies(response.data);
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
        setToggleShowComments(true);
        setCommentLoader(false);
      }
    };

    const deleteReply = async (commentId, replyId) => {
      try {
        const config = {
          headers: {
            "Config-Type": "application/json",
          },
          data: { commentId, replyId },
        };
        console.log("deleting a reply here");
        const deleteResponse = await axios.delete(
          `${baseUrl}/comment/deleteReply`,
          config
        );

        if (deleteResponse.status === 200) {
          const updatedReply = [];
          replies.map((reply) => {
            if (reply._id !== deleteResponse.data) {
              updatedReply.push(reply);
            }
            return reply;
          });
          setReplies(updatedReply);
          if (updatedReply.length === 0) {
            setToggleShowComments(false);
          }
          setCommentReplyCount(updatedReply.length);
        }
      } catch (error) {
        toast.error("something went wrong", {
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

    const handleDeleteComment = async (postId, parentId, commentId) => {
      try {
        if (postId === "-1") {
          await deleteComment(parentId, commentId);
          setShowCommentMenu(false);
        } else {
          await deleteComment(true, postId, commentId);
          setShowCommentMenu(false);
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
      }

      return;
    };

    const editReply = async (postId, commentId, text) => {
      console.log(
        " postId " + postId + " commentId " + commentId + " text " + text
      );
      try {
        const config = {
          headers: {
            "Config-Type": "application/json",
          },
        };

        const data = {
          commentId,
          text: text,
        };
        const editCommentResponse = await axios.put(
          `${baseUrl}/comment/editReply`,
          data,
          config
        );

        if (editCommentResponse.status === 200) {
          const storeReplies = [];

          replies.map((reply) => {
            if (reply._id === commentId) {
              reply.text = text;
              storeReplies.push(reply);
            } else {
              storeReplies.push(reply);
            }
            return reply;
          });
          setReplies(storeReplies);
          setEditCommentModal(false);
          setShowCommentMenu(false);
          setUserComment("");
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
      }
    };

    const displayEditModal = () => {
      console.log("updating this state here");
      setUserComment(comment.text);
      setEditCommentModal(true);
    };

    const handleCloseEditModal = () => {
      setUserComment("");
      setShowCommentMenu(false);
      setEditCommentModal(false);
    };

    const handleEditComment = (postId, commentId) => {
      editComment(postId, commentId, userComment);
      setShowCommentMenu(false);
      setEditCommentModal(false);
    };

    const handleReplyToComment = (commentId, commenterName) => {
      userReplyingStatus(true, commentId, commenterName);
    };

    return (
      <>
        {editCommentModal === false && (
          <>
            <div className="h-auto w-full flex gap-1 mt-1 mb-1">
              <div className="h-[30px] w-[30px] flex justify-center mt-2">
                <img
                  src={comment.commenterProfilePicture}
                  alt="profilePicture"
                  className="h-full w-full rounded-[50%] object-cover"
                />
              </div>
              <div className="h-auto w-[75%] flex p-2 flex-col">
                <span className="text-[0.8rem]">
                  <span className="font-semibold">{comment.commenterName}</span>{" "}
                  &nbsp; {comment.text}
                </span>
                <span className="text-[0.7rem] mt-1">
                  <span
                    className="ml-1 mr-1 cursor-pointer"
                    onClick={() =>
                      handleReplyToComment(comment._id, comment.commenterName)
                    }
                  >
                    Reply
                  </span>
                </span>
                {comment.reply.length > 0 && (
                  <>
                    {commentLoader ? (
                      <>
                        <span className="text-[0.7rem] mt-2">
                          {" "}
                          ---- &nbsp;Loading...
                        </span>
                      </>
                    ) : (
                      <>
                        {!toggleShowComments ? (
                          <>
                            {commentReplyCount > 0 && (
                              <span
                                className="text-[0.7rem] mt-2 cursor-pointer"
                                onClick={() => fetchReplies(comment._id)}
                              >
                                ---- &nbsp; View replies(
                                {commentReplyCount})
                              </span>
                            )}
                          </>
                        ) : (
                          <>
                            <div className="h-auto w-full pl-2 flex flex-col">
                              <span
                                className="min-h-[20px] w-full text-[0.7rem] cursor-pointer mt-1"
                                onClick={() => setToggleShowComments(false)}
                              >
                                ---- &nbsp;Hide Replies
                              </span>
                              <div className="h-auto w-[100vw]">
                                {replies.map((reply) => (
                                  <>
                                    <Comment
                                      key={reply._id}
                                      parentId={comment._id}
                                      comment={reply}
                                      userReplyingStatus={userReplyingStatus}
                                      deleteComment={deleteReply}
                                      editComment={editReply}
                                    />
                                  </>
                                ))}
                              </div>
                            </div>
                          </>
                        )}
                      </>
                    )}
                  </>
                )}
              </div>
              <div className="h-auto w-[10%] flex justify-center mt-4 relative">
                {userId === comment.userId && (
                  <>
                    <div
                      className="flex gap-[2px]"
                      onClick={() => setShowCommentMenu(true)}
                    >
                      <span className="h-[1px] w-[1px] border-2 rounded-[50%]"></span>
                      <span className="h-[1px] w-[1px] border-2 rounded-[50%]"></span>
                      <span className="h-[1px] w-[1px] border-2 rounded-[50%]"></span>
                    </div>
                  </>
                )}
                {showCommentMenu && (
                  <>
                    <div className="absolute z-10 top-[1%] right-[-20%] h-auto w-auto border-2 flex flex-col bg-[#f5f5f5]">
                      <span
                        className="h-[40px] w-[100px] centerDiv text-black text-[0.9rem] cursor-pointer"
                        onClick={displayEditModal}
                      >
                        Edit
                      </span>
                      <hr className="ml-1" />
                      <span
                        className="h-[40px] w-[100px] centerDiv text-black text-[0.9rem] cursor-pointer"
                        onClick={() =>
                          handleDeleteComment(
                            comment.postId,
                            parentId,
                            comment._id
                          )
                        }
                      >
                        Delete
                      </span>
                      <hr className="ml-1" />
                      <span
                        className="h-[40px] w-[100px] centerDiv text-black text-[0.9rem] cursor-pointer"
                        onClick={() => setShowCommentMenu(false)}
                      >
                        Close
                      </span>
                    </div>
                  </>
                )}
              </div>
              <ToastContainer />
            </div>
          </>
        )}
        {editCommentModal && (
          <>
            <div className="h-[100px] w-[360px] flex flex-col bg-gray-800 p-1">
              <span className="h-[40%] w-full pl-1 flex items-center text-[0.8rem]">
                <span className="h-full w-[80%] opacity-60">Edit :</span>
                <span
                  className="h-full w-[20%] pr-2 centerDiv"
                  onClick={handleCloseEditModal}
                >
                  <AiFillCloseCircle className="text-[1.1rem]" />
                </span>
              </span>
              <div className="h-[70%] w-full flex items-center overflow-hidden">
                <textarea
                  className="h-[100%] text-[0.9rem]  bg-gray-600 resize-none min-w-[290px] placeHolderCss outline-none border-none"
                  value={userComment}
                  onChange={(event) => setUserComment(event.target.value)}
                  placeholder="Edit here..."
                />
                <span
                  className="h-[100%] text-[0.9rem] w-[15%] opacity-90 mt-2 ml-2"
                  onClick={() => handleEditComment(comment.postId, comment._id)}
                >
                  update
                </span>
              </div>
            </div>
          </>
        )}
      </>
    );
  }
);
