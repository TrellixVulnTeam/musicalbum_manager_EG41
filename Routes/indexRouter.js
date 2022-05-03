const express = require("express");
const nodemailer = require("nodemailer");

const indexRouter = express();

indexRouter.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});

indexRouter
  .route("/contact")
  .get((req, res) => {
    res.render("contact", { layout: false, title: "Contact" });
  })
  .post(async (req, res) => {
    let transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "idokoken1@gmail.com",
        pass: "",
      },
    });

    try {
      let info = await transporter.sendMail({
        from: '"Idoko ken" <idokoken1@gmail.com>',
        to: "chisomidoko05@gmail.com, ndgroups@gmail.com",
        subject: "Hello ",
        text: "Hello world?",
        html: "<b>Hello world?</b>",
      });

      req.flash("info", "Thanks for reaching out to us");
      res.redirect("/");
      console.log("message sent" + info.response);
    } catch (error) {
      res.redirect("/");
      console.log(error);
    }
  });

module.exports = indexRouter;
