const express = require("express");
const nodemailer = require("nodemailer");

const indexRouter = express();

indexRouter.get("/", (req, res) => {
  res.render("albums/index");
});

indexRouter.get("/about", (req, res) => {
	res.render("about")
})

module.exports = indexRouter;