const express = require("express");
const passport = require("passport");
const { check, validationResult } = require("express-validator");
const User = require("../model/userModel");

const userRouter = express();

userRouter
  .route("/register")
  .get((req, res) => {
    res.render("users/register", { layout: false, title: "Register" });
  })
  .post(
    check("firstname", "firstname is rquired").notEmpty(),
    check("lastname", "lastname is rquired").notEmpty(),
    check("email", "email is rquired")
      .notEmpty()
      .isEmail()
      .withMessage("email is not a valid email"),
    check("password", "password is required")
      .notEmpty()
      .isLength({ min: 4 })
      .withMessage("password must be at least 4 characters"),
    check("confirm_password").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password confirmation does not match password");
      }
      // Indicates the success of this synchronous custom validator
      return true;
    }),
    (req, res) => {
      const { firstname, lastname, email, password, confirm_password } =
        req.body;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        //res.status(400).json({ errors: errors.array() });
        res.render("users/register", {
          layout: false,
          errors: errors.array(),
          title: "Register",
        });
        console.log(errors.array());
      } else {
        User.findOne({ email }, (err, existingUser) => {
          if (err) {
            res.status(400).json({ error: "error fetching data" });
          }
          if (existingUser) {
            res.render("users/register", {
              layout: false,
              title: "Register",
              error: "email already in use",
            });
            console.log("email already in use");
          }

          let user = new User({
            firstname,
            lastname,
            email,
            password,
            confirm_password,
          });
          user.save((err, data) => {
            if (err) {
              //return res.status(400).json({ error: "error saving to database" });
              console.log(err);
            }
            req.flash(
              "info",
              "login into your account to enjoy amazimg services"
            );
            res.redirect("/user/login");
          });
        });
      }
    }
  );

userRouter
  .route("/login")
  .get((req, res) => {
    res.render("users/login", { layout: false, title: "Login" });
  })
  .post(
    passport.authenticate("local", {
      failureRedirect: "/user/login",
      failureFlash: "Invalid Email or password",
    }),
    function (req, res) {
      req.falsh("info", "you are succesfully logged in");
      res.redirect("/");
    }
  );

userRouter.post("/logout", function (req, res, next) {
  req.logout();
  res.redirect("/");
});

module.exports = userRouter;
