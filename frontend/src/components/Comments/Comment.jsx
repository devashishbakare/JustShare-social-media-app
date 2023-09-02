import React, { useState, useEffect } from "react";
// import { PiDotsThreeOutlineBold } from "react-icons/pi";
import { FcLike } from "react-icons/fc";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { baseUrl } from "../constants";
import "react-toastify/dist/ReactToastify.css";

export const Comment = React.memo(
  ({ parentId, comment, userReplyingStatus, deleteComment }) => {
    console.log("re-rendered");
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user._id;
    const [commentLoader, setCommentLoader] = useState(false);
    const [replies, setReplies] = useState([]);
    const [toggleShowComments, setToggleShowComments] = useState(false);
    const [showCommentMenu, setShowCommentMenu] = useState(false);
    const [commentReplyCount, setCommentReplyCount] = useState();

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

    const handleDeleteComment = async (postId, parentId, commentId) => {
      console.log(postId + " -> " + parentId + " -> " + commentId);
      /**
         router.delete("/delete", commentController.deleteComment);
         router.delete("/deleteReply", commentController.deleteReplyComment);
         */
      try {
        if (postId === "-1") {
          const config = {
            headers: {
              "Config-Type": "application/json",
            },
            data: { commentId: parentId, replyId: commentId },
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
            });
            setReplies(updatedReply);
            setCommentReplyCount(updatedReply.length);
            setShowCommentMenu(false);
            toast.success("Reply has been deleted..", {
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
          await deleteComment(true, postId, commentId);
          console.log("came back after this");
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

    return (
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
              {comment.like.length}&nbsp;likes&nbsp;
              <span
                className="ml-1 mr-1 cursor-pointer"
                onClick={() =>
                  userReplyingStatus(true, comment._id, comment.commenterName)
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
                        <span
                          className="text-[0.7rem] mt-2 cursor-pointer"
                          onClick={() => fetchReplies(comment._id)}
                        >
                          ---- &nbsp; View replies(
                          {commentReplyCount})
                        </span>
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
                          <div className="h-auto w-full">
                            {replies.map((reply) => (
                              <>
                                <Comment
                                  key={reply._id}
                                  parentId={comment._id}
                                  comment={reply}
                                  userReplyingStatus={userReplyingStatus}
                                  deleteComment={deleteComment}
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
            {userId === comment.userId ? (
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
            ) : (
              <>
                <FcLike className="text-[0.9rem] cursor-pointer" />
              </>
            )}
            {showCommentMenu && (
              <>
                <div className="absolute z-10 top-[1%] right-[-20%] h-auto w-auto border-2 flex flex-col bg-[#f5f5f5]">
                  <span className="h-[40px] w-[100px] centerDiv text-black text-[0.9rem] cursor-pointer">
                    Edit
                  </span>
                  <hr className="ml-1" />
                  <span
                    className="h-[40px] w-[100px] centerDiv text-black text-[0.9rem] cursor-pointer"
                    onClick={() =>
                      handleDeleteComment(comment.postId, parentId, comment._id)
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
    );
  }
);
