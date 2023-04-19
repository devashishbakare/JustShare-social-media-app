const Post = require("../models/Post");
const User = require("../models/User");
const Comment = require("../models/Comment");
const createComment = async (req, res) => {
  let postId = req.body.postId;
  let userId = req.body.userId;

  console.log(`uid -> ${userId} pid -> ${postId}`);
  try {
    let user = await User.findById(userId);
    if (!user) return res.status(404).json("User Not Found");

    let comment = new Comment({
      postId: postId,
      userId: userId,
      text: req.body.text,
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
    if (comment) {
      const postUpdateStatus = await Post.updateOne(
        { _id: postId },
        { $pull: { comment: comment._id } }
      );
      const commentDeletionStatus = await Comment.deleteOne({ _id: commentId });
      const response = {
        postUpdateStatus,
        commentDeletionStatus,
      };
      return res.status(200).json(response);
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json("Error while deleting comment");
  }
};

const commentReply = async (req, res) => {
  const { postId, commentId, userId, text } = req.body;

  try {
    let post = await Post.findById(postId);
    let comment = await Comment.findById(commentId);
    let user = await User.findById(userId);

    if (!post || !comment || !user) {
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

    if (post && comment) {
      let commentReplyStatus = await comment.updateOne({
        $push: { reply: commentReply._id },
      });
      return res.status(200).json(commentReplyStatus);
    } else {
      return res.status(404).json("Post Or comment  not found");
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json("Error in adding reply");
  }
};

const getCommentReply = async (req, res) => {
  const { postId, commentId } = req.body;

  try {
    const post = await Post.findById(postId);
    const comment = await Comment.findById(commentId);

    if (post && comment) {
      const allReply = await Promise.all(
        comment.reply.map((currentCommentId) => {
          return Comment.findById(currentCommentId);
        })
      );

      return res.status(200).json(allReply);
    } else {
      return res.status(404).json("Post or comment not found");
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

module.exports = {
  createComment,
  updateComment,
  deleteComment,
  commentReply,
  getCommentReply,
  getPostComment,
  commentLike,
};
