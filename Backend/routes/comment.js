const express = require("express");
const router = express.Router();
const commentController = require("../controller/commentController");
router.post("/create", commentController.createComment);
router.put("/edit", commentController.updateComment);
router.delete("/delete", commentController.deleteComment);
router.post("/reply", commentController.commentReply);
router.get("/fetchReply", commentController.getCommentReply);
module.exports = router;
