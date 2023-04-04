const express = require("express");
const router = express.Router();
const postController = require("../controller/postController");
router.get("/test", postController.postHome);
router.post("/create", postController.createPost);
router.put("/update/:id", postController.updatePost);
router.delete("/delete/:id", postController.deletePost);
router.get("/get/:id", postController.fetchPost);
router.get("/timeline", postController.getTimeline);
router.put("/like/:id", postController.like);
router.get("/comments/:id", postController.getComments);
router.use("/comment", require("./comment"));

module.exports = router;
