const Post = require("../models/Post");
const User = require("../models/User");

const postHome = (req, res) => {
  return res.send("yes home post");
};

// creating a post
const createPost = async (req, res) => {
  try {
    let newPost = new Post(req.body);
    await newPost.save();
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
    if (!post) return res.status(404).json("post not found");
    return res.status(200).json(post);
  } catch (err) {
    console.error(err);
    return res.status(500).json("Error while fetching post");
  }
};

//fetch all post in timeline

const getTimeline = async (req, res) => {
  let userId = req.body.id;
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
  let postId = req.params.id;
  let userId = req.body.id;

  try {
    let post = await Post.findById(postId);

    if (!post) return res.status(404).json("post not found");

    if (post.like.includes(userId)) {
      await post.updateOne({ $pull: { like: userId } });
      return res.status(200).json("disliked!!");
    } else {
      let status = await post.updateOne({ $push: { like: userId } });

      return res.status(200).json("liked!!");
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json("Error while liking a post");
  }
};

module.exports = {
  postHome,
  createPost,
  updatePost,
  deletePost,
  fetchPost,
  getTimeline,
  like,
};
