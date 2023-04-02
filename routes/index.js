const express = require("express");
const router = express.Router();
const homeController = require("../controller/homeController");
router.get("/", homeController.home);
router.post("/register", homeController.registerUser);
router.post("/login", homeController.login);
router.use("/user", require("./user"));
module.exports = router;
