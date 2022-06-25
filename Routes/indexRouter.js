const express = require("express");
const Album = require("../model/albumModel");
const multers3 = require("multer-s3");
const aws = require("aws-sdk");

const indexRouter = express();

indexRouter.get("/", (req, res) => {
	Album.find({}, (err, albums) => {
    if (err) {
      res.status(400).json({msg: "error finding ablums" });
    }
    res.render("albums/index", {albums});
  });
  
});

indexRouter.get("/about", (req, res) => {
  res.render("about");
});

module.exports = indexRouter;