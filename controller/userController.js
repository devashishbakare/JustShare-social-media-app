const User = require("../models/User");
const bcrypt = require("bcrypt");

// updating user info in db
const updateUser = async (req, res) => {
  let id = req.params.id;

  let user = await User.findById(id);

  if (!user) return res.status(404).json("user not found");

  if (req.body.password) {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    req.body.password = bcrypt.hashSync(req.body.password, salt);
  }

  try {
    user = await User.updateOne({ _id: id }, req.body);
    return res.status(200).json("user updated successfully");
  } catch (err) {
    console.error(err);
    return res.status(500).json("unable to update a user");
  }
};

// deleting user from db
const deleteUser = async (req, res) => {
  let id = req.params.id;

  try {
    let user = await User.findByIdAndDelete({ _id: id });
    if (!user) return res.status(404).json("User not found");
    return res.status(200).json("User deleted successfully");
  } catch (err) {
    console.error(err);
    return res.status(500).json("Error while deleting user");
  }
};

// fetching data from db, with care like not to share a password and when user last updated his info
const fetchUser = async (req, res) => {
  let id = req.params.id;
  try {
    let user = await User.findById(id).select("-password -updatedAt");

    if (!user) {
      return res.status(404).json("User not found");
    }
    return res.status(200).json(user);
  } catch (err) {
    console.error(err);
    return res.status(500).json("Not able the fetch user data");
  }
};

//updating user follower and following list, follow request fullfilled
const followUser = async (req, res) => {
  try {
    let requesterUser = await User.findById(req.body.id);
    let requestToUser = await User.findById(req.params.id);

    if (!requesterUser || !requestToUser) {
      return res.status(403).json("user not found");
    }
    if (requesterUser.followings.includes(requestToUser._id) == true) {
      return res.status(409).json("you already follow him");
    } else {
      await requesterUser.updateOne({
        $push: { followings: requestToUser._id },
      });
      await requestToUser.updateOne({
        $push: { followers: requesterUser._id },
      });
      return res.status(200).json("Followed !!");
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json("Not able to follow user");
  }
};

//updated user followers and following list, unfollow request fullfilled
const unfollowUser = async (req, res) => {
  try {
    let requesterUser = await User.findById(req.body.id);
    let requestToUser = await User.findById(req.params.id);

    if (!requesterUser || !requestToUser) {
      return res.status(403).json("user not found");
    }
    if (requesterUser.followings.includes(requestToUser._id) == false) {
      return res.status(409).json("you do not follow this user");
    } else {
      await requesterUser.updateOne({
        $pull: { followings: requestToUser._id },
      });
      await requestToUser.updateOne({
        $pull: { followers: requesterUser._id },
      });
      return res.status(200).json("unFollowed !!");
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json("not able to unfollw user");
  }
};

module.exports = {
  updateUser,
  deleteUser,
  fetchUser,
  followUser,
  unfollowUser,
};
