const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const home = (req, res) => {
  return res.send("okay chekc this");
};

//Regiser User
const registerUser = async (req, res) => {
  // console.log(req.body);

  const { userName, email, password, confirmPassword, profilePicture } =
    req.body;
  if (!userName || !email || !password || !confirmPassword) {
    return res.status(500).json("check details");
  }
  if (password !== confirmPassword) {
    return res.status(500).json("check password and confirm password again");
  }
  let userExist = await User.findOne({ email });
  if (userExist) {
    return res.status(500).json("user already exist");
  }
  try {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    const user = new User({
      userName,
      email,
      password: hash,
      profilePicture,
    });
    await user.save();
    return res.status(200).json(user);
  } catch (err) {
    console.error(err);
    return res.status(500).json("enable to register User");
  }
};

//Login user
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

    const token = jwt.sign({ userId: user._id }, process.env.PRIVATE_KEY, {
      expiresIn: "10d",
    });

    if (!token) return res.status(500).json("unable to generate a token");

    // Adding token to session cookie
    req.session.token = token;

    console.log("cookie data", req.session.token);
    const response = {
      user,
      token,
      message: "login successfull",
      cookie: req.session.token,
    };

    return res.status(200).json(response);
  } catch (err) {
    console.error(err);
    return res.status(500).json("login failed");
  }
};

const fetchCookies = (req, res) => {
  return res.status(200).json(req.session.token);
};
//todo : here we are just deleting cookie from a session you have to consider other things here while loggin out
const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log("Error while deleteing a session", err);
    } else {
      console.log("session deleted");
    }
  });
  return res.status(200).json("sessoin destroy");
};

const checkAuthentication = (req, res) => {
  let userId = req.params.id;
  if (userId === req.userId)
    return res.status(200).json("authentication successfull");

  return res.status(500).json("authentication failed");
};

module.exports = {
  home,
  registerUser,
  login,
  fetchCookies,
  logout,
  checkAuthentication,
};
