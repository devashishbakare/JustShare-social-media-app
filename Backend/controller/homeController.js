const User = require("../models/User");
const bcrypt = require("bcrypt");
const home = (req, res) => {
  return res.send("okay chekc this");
};

//Regiser User
const registerUser = async (req, res) => {
  const { userName, email, password, confirmPassword } = req.body;

  if (!userName || !email || !password || !confirmPassword) {
    return res.status(500).json("check details");
  }

  if (password !== confirmPassword) {
    return res.status(500).json("check password and confirm password again");
  }

  try {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    const user = new User({
      userName,
      email,
      password: hash,
    });

    await user.save();

    return res.status(200).json(user);
  } catch (err) {
    console.error(err);
    return res.status(500).json("enable to register User");
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(500).json("fill all the tabs");
  }

  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json("user not found");
    }
    const isPresent = bcrypt.compareSync(password, user.password);

    if (!isPresent) {
      return res.status(500).json("email or password are not correct");
    }

    return res.status(200).json("login successfully");
  } catch (err) {
    console.error(err);
    return res.status(500).json("login failed");
  }
};
module.exports = {
  home,
  registerUser,
  login,
};
