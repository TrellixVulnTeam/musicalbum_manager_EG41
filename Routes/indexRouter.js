const express = require("express");
const Album = require("../model/albumModel");
// const multers3 = require("multer-s3");
// const aws = require("aws-sdk");

const indexRouter = express();

indexRouter.get("/", (req, res) => {
  res.render("albums/index", {});
});

indexRouter.get("/about", (req, res) => {
  res.render("about");
});

module.exports = indexRouter;
