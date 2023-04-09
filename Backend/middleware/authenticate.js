const jwt = require("jsonwebtoken");

// Decoding a token and sending to controller to check whether id is correct or not
const verifyUser = (req, res, next) => {
  let token = req.session.token;
  if (!token) {
    console.log("token not present");
    return res.status(404).json("Token not found");
  }
  try {
    const decode = jwt.verify(token, process.env.PRIVATE_KEY);
    req.userId = decode.userId;
    next();
  } catch (error) {
    console.error("error in authenticating user", error);
  }
};

module.exports = {
  verifyUser,
};
