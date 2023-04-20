const express = require("express");
const router = express.Router();
const commentController = require("../controller/commentController");
router.post("/create", commentController.createComment);
router.put("/edit", commentController.updateComment);
router.delete("/delete", commentController.deleteComment);
router.put("/reply", commentController.commentReply);
router.get("/fetchReply/:id", commentController.getCommentReply);
router.get("/postComments", commentController.getPostComment);
router.put("/like", commentController.commentLike);

module.exports = router;
