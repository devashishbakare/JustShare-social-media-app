const Post = require("../models/Post");
const User = require("../models/User");
const Comment = require("../models/Comment");

const postHome = (req, res) => {
  return res.send("yes home post");
};

// creating a post
const createPost = async (req, res) => {
  try {
    const { userId, desc, image } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json("user not found");
    }
    let newPost = new Post(req.body);
    await newPost.save();

    await user.updateOne({
      $push: { posts: newPost._id },
    });

    return res.status(200).json(newPost);
  } catch (err) {
    console.error(err);
    return res.status(500).json("Not able to create a post");
  }
};

// updating post

const updatePost = async (req, res) => {
  let id = req.params.id;
  try {
    let post = await Post.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    if (!post) {
      return res.status(404).json("Post not found");
    }

    return res.status(200).json(post);
  } catch (err) {
    console.error(err);
    return res.status(500).json("Not able to update a post");
  }
};

// deleting post

const deletePost = async (req, res) => {
  let postId = req.params.id;
  try {
    let post = await Post.findByIdAndDelete({ _id: postId });
    let userId = post.userId;
    let user = await User.findById(userId);

    await user.updateOne({
      $pull: { posts: post._id },
    });

    if (!post) {
      return res.status(404).json("Post Not Found");
    }

    return res.status(200).json(post);
  } catch (err) {
    console.error(err);
    return res.status(500).json("Not able to delete a post");
  }
};

// feacj post

const fetchPost = async (req, res) => {
  let postId = req.params.id;

  try {
    let post = await Post.findById(postId).select("-updatedAt");

    const comments = [];

    await Promise.all(
      post.comment.map(async (singleComment) => {
        const commentData = await Comment.findById(singleComment);
        comments.push(commentData);
      })
    );

    if (!post) return res.status(404).json("post not found");
    return res.status(200).json({ post, comments });
  } catch (err) {
    console.error(err);
    return res.status(500).json("Error while fetching post");
  }
};

//fetch all post in timeline

const getTimeline = async (req, res) => {
  const userId = req.query.id;
  try {
    let currentUser = await User.findById(userId);
    if (!currentUser) return res.status(404).json("User Not Found");
    let currentUserPost = await Post.find({ userId });

    let friendPost = await Promise.all(
      currentUser.followings.map((userId) => {
        return Post.findOne({ userId });
      })
    );

    let allPost = friendPost.concat(...currentUserPost);
    return res.status(200).json(allPost);
  } catch (err) {
    console.error(err);
    return res.status(500).json("Faild to fetch a post");
  }
};

// like and dislike a post

const like = async (req, res) => {
  const { userId, postId } = req.body;

  console.log("pId " + postId + " uId " + userId);

  try {
    const response = {
      like: false,
      message: "like and dislike is done",
    };
    let post = await Post.findById(postId);

    if (!post) return res.status(404).json("post not found");

    if (post.like.includes(userId)) {
      await post.updateOne({ $pull: { like: userId } });
      return res.status(200).json(response);
    } else {
      let status = await post.updateOne({ $push: { like: userId } });
      response.like = true;
      return res.status(200).json(response);
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json("Error while liking a post");
  }
};

const getComments = async (req, res) => {
  const postId = req.params.id;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json("post not found");
    } else {
      let allComments = await Promise.all(
        post.comment.map((commentId) => {
          return Comment.findById(commentId);
        })
      );
      return res.status(200).json(allComments);
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json("Error while fetching comments");
  }
};

const fetchUserPost = async (req, res) => {
  let userId = req.params.id;

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json("user not found");
  }

  const data = await Promise.all(
    user.posts.map((postId) => {
      return Post.findById(postId);
    })
  );
  return res.status(200).json(data);
};

module.exports = {
  postHome,
  createPost,
  updatePost,
  deletePost,
  fetchPost,
  getTimeline,
  like,
  getComments,
  fetchUserPost,
};
