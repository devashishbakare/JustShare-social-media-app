const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
router.put("/update/:id", userController.updateUser);
router.delete("/delete/:id", userController.deleteUser);
router.get("/getUser/:id", userController.fetchUser);
router.put("/follow/:id", userController.followUser);
router.put("/unfollow/:id", userController.unfollowUser);
module.exports = router;
