const express = require("express");
const router = express.Router();
const commentController = require("../controller/commentController");
router.get("/fetchComment/:id", commentController.getCommentDetails);
router.post("/create", commentController.createComment);
router.post("/commentReply", commentController.createCommentReply);
router.put("/edit", commentController.updateComment);
router.put("/editReply", commentController.updateCommentReply);
router.delete("/delete", commentController.deleteComment);
router.delete("/deleteReply", commentController.deleteReplyComment);
router.put("/reply", commentController.commentReply);
router.get("/fetchReply/:id", commentController.getCommentReply);
router.get("/postComments", commentController.getPostComment);
router.put("/like", commentController.commentLike);
router.delete("/deleteAllReply", commentController.deleteAllReply);
router.post("/removeNull/:id", commentController.removeNull);
router.delete(
  "/deleteNestedCommnet/:id",
  commentController.deleteNestedComments
);
module.exports = router;
