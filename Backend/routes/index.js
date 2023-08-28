const authenticate = require("../middleware/authenticate");

const express = require("express");
const router = express.Router();
const homeController = require("../controller/homeController");
router.get("/", homeController.home);
router.post("/register", homeController.registerUser);
router.post("/login", homeController.login);
router.get("/getCookies", homeController.fetchCookies);
router.get("/logout", homeController.logout);
router.get(
  "/authenticate/:id",
  authenticate.verifyUser,
  homeController.checkAuthentication
);
router.use("/user", require("./user"));
router.use("/post", require("./post"));
router.use("/comment", require("./comment"));
module.exports = router;
