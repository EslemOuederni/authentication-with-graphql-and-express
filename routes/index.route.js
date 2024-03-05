const express = require("express");

const router = express.Router();

const userRouter = require("./User.route");


router.use("/api/user", userRouter);

module.exports = router;