const Post = require("../models/Post");
const User = require("../models/User");
const Comment = require("../models/Comment");
const mongoose = require("mongoose");
const createComment = async (req, res) => {
  const { userId, postId, newComment } = req.body;

  console.log(`uid -> ${userId} pid -> ${postId}`);
  try {
    let user = await User.findById(userId);
    if (!user) return res.status(404).json("User Not Found");

    let comment = new Comment({
      postId: postId,
      userId: userId,
      text: newComment,
      commenterName: user.userName,
      commenterProfilePicture: user.profilePicture,
    });

    await comment.save();

    let post = await Post.findById(postId);
    if (!post) return res.status(404).json("Post not found");

    let updatedPost = await post.updateOne({
      $push: { comment: comment._id },
    });

    if (!updatedPost)
      return res.status(404).json("Enable to add comment on this");

    const response = {
      messege: "comment has been added",
      data: comment,
    };
    return res.status(200).json(response);
  } catch (err) {
    console.error(err);
    return res.status(500).json("Error while creating comment");
  }
};

const createCommentReply = async (req, res) => {
  try {
    const { userId, postId, newComment, commentId } = req.body;
    let user = await User.findById(userId);
    if (!user) return res.status(404).json("User Not Found");

    let comment = new Comment({
      postId: postId,
      userId: userId,
      text: newComment,
      commenterName: user.userName,
      commenterProfilePicture: user.profilePicture,
    });

    await comment.save();

    const commentToAddReply = await Comment.findById(commentId);

    if (!commentToAddReply) {
      return res.status(404).json("comment Not Found");
    }

    await commentToAddReply.updateOne({
      $push: { reply: comment._id },
    });

    return res.status(200).json(comment._id);
  } catch (error) {
    return res
      .status(500)
      .json("something went wrong while adding commment Reply");
  }
};

const updateComment = async (req, res) => {
  let postId = req.body.postId;
  let commentId = req.body.commentId;
  let text = req.body.text;

  try {
    let post = await Post.findById(postId);
    if (post.comment.includes(commentId) == false) {
      return res.status(403).json("comment is not present");
    } else {
      const updatedComment = await Comment.findByIdAndUpdate(
        { _id: commentId },
        { text: text },
        { new: true }
      );
      return res.status(200).json(updatedComment);
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json("Error while updating comment");
  }
};

// TODO : Reply on Reply we have to do that by following way
// TODO : when user click on see raply link then we can pass to header and fetch a reply and rendered it

const deleteComment = async (req, res) => {
  try {
    const { postId, commentId } = req.body;

    const comment = await Comment.findById(commentId);
    const post = await Post.findById(postId);

    if (!post || !comment) {
      return res.status(404).json("post or comment not found");
    }

    const postUpdateStatus = await post.updateOne({
      $pull: { comment: comment._id },
    });

    await Promise.all(
      comment.reply.map(async (replyId) => {
        return await Comment.findByIdAndDelete(replyId);
      })
    );

    const commentDeletionStatus = await Comment.deleteOne({ _id: comment._id });

    return res.status(200).json(commentDeletionStatus._id);
  } catch (err) {
    console.error(err);
    return res.status(500).json("Error while deleting comment");
  }
};

const commentReply = async (req, res) => {
  const { postId, commentId, userId, text } = req.body;

  try {
    let post = await Post.findById(postId);
    let user = await User.findById(userId);

    if (!post || !user) {
      return res.status(404).json("user or post or comment not found");
    }

    let commentReply = new Comment({
      postId: postId,
      userId: userId,
      text: text,
      commenterName: user.userName,
      commenterProfilePicture: user.profilePicture,
    });
    await commentReply.save();

    if (post && user) {
      let updatedComment = await Comment.findByIdAndUpdate(
        { _id: commentId },
        {
          $push: { reply: commentReply._id },
        },
        { new: true }
      );
      return res.status(200).json(updatedComment);
    } else {
      return res.status(404).json("Post Or comment  not found");
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json("Error in adding reply");
  }
};

const getCommentReply = async (req, res) => {
  const commentId = req.params.id;
  try {
    const comment = await Comment.findById(commentId);
    if (!comment) return res.status(404).json("comment not found");
    if (comment) {
      const allReply = await Promise.all(
        comment.reply.map((currentCommentId) => {
          return Comment.findById(currentCommentId);
        })
      );
      return res.status(200).json(allReply);
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json("Error in adding reply");
  }
};

const getPostComment = async (req, res) => {
  try {
    const userId = req.query.userId;
    const postId = req.query.postId;
    // const { userId, postId } = req.query;
    console.log(`user id ${userId} and postid ${postId}`);

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "user not found",
      });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    const postComments = await Promise.all(
      post.comment.map((eachComment) => {
        return Comment.findById(eachComment);
      })
    );

    return res.status(200).json({
      message: "Fetch all comments of Post",
      data: postComments,
    });
  } catch (err) {
    console.error("Unable to fetch commnets");
  }
};

// comment like
const commentLike = async (req, res) => {
  let commentId = req.body.commentId;
  let userId = req.body.userId;

  console.log(`user id is ${userId} commentId ${commentId}`);

  try {
    const response = {
      like: false,
      message: "like and dislike is done",
    };
    let comment = await Comment.findById(commentId);

    if (!comment) return res.status(404).json("comment not found");

    if (comment.like.includes(userId)) {
      await comment.updateOne({ $pull: { like: userId } });
      return res.status(200).json(response);
    } else {
      let status = await comment.updateOne({ $push: { like: userId } });
      response.like = true;
      return res.status(200).json(response);
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json("Error while liking a comment");
  }
};

const deleteReplyComment = async (req, res) => {
  // data: { commentId: deleteFrom, replyId: commentId }
  try {
    const { commentId, replyId } = req.body;
    console.log("parentComment " + commentId + " reply Id" + replyId);

    const comment = await Comment.findById(commentId);
    const rId = new mongoose.Types.ObjectId(replyId);
    await comment.updateOne({
      $pull: { reply: { $in: [rId, "null"] } },
    });

    const deletedReply = await Comment.findByIdAndDelete(replyId);
    if (deletedReply) {
      return res.status(200).json(deletedReply._id);
    }
  } catch (error) {
    console.log("what an error " + error);
    return res.status(500).json("something went wrong");
  }
};

const deleteAllReply = async (req, res) => {
  try {
    const allPost = await Post.find({});

    await Promise.all(
      allPost.map(async (post) => {
        await post.updateOne({
          $set: { comment: [] },
        });
      })
    );

    await Comment.deleteMany();
    return res.status(200).json("deleted All");
  } catch (error) {
    return res.status(500).json("something went wrong");
  }
};

const removeNull = async (req, res) => {
  try {
    let commentId = req.params.id;
    const updatedComment = await Comment.findByIdAndUpdate(
      { _id: commentId },
      {
        $pull: { reply: null },
      }
    );
    return res.status(200).json(updatedComment);
  } catch (error) {
    return res.status(500).json("something went wrong");
  }
};

const getCommentDetails = async (req, res) => {
  try {
    const commentId = req.params.id;
    const comment = await Comment.findById(commentId);

    if (comment) {
      return res.status(200).json(comment);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json("something went wrong");
  }
};

const updateCommentReply = async (req, res) => {
  const { commentId, text } = req.body;
  console.log(commentId + " text " + text);
  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      { _id: commentId },
      { text: text }
    );
    if (updateComment) {
      return res.status(200).json(updateComment._id);
    } else {
      return res.status(404).json("user not found");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json("something went wrong");
  }
};

module.exports = {
  createComment,
  updateComment,
  deleteComment,
  commentReply,
  getCommentReply,
  getPostComment,
  commentLike,
  deleteReplyComment,
  deleteAllReply,
  createCommentReply,
  removeNull,
  getCommentDetails,
  updateCommentReply,
};
