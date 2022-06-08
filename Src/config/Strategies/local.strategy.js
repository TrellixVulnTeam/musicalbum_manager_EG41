const express = require("express");
const crypto = require("crypto");
const passport = require("passport");
const { Strategy } = require("passport-local");
const User = require("../../../model/userModel");

module.exports = function localStrategy() {
  passport.use(
    new Strategy(
      {
        usernameField: "email",
        passwordField: "passwword",
        session: false,
      },
      function (email, password, done) {
        // ...
        User.findOne({ email }, function (err, user) {
          if (err) {
            return done(err);
          }
          if (user && user.password === password) {
            done(null, user);
          } else {
            done(null, false);
          }
        });
      }
    )
  );
};

// passport.use(
//   new Strategy(function verify(email, password, done) {
//     db.findOne({ email }, function (err, user) {
//       if (err) {
//         return done(err);
//       }
//       if (!user) {
//         return done(null, false, {
//           message: "Incorrect email or password.",
//         });
//       }

//       crypto.pbkdf2(
//         password,
//         user.salt,
//         310000,
//         32,
//         "sha256",
//         function (err, hashedPassword) {
//           if (err) {
//             return done(err);
//           }
//           if (!crypto.timingSafeEqual(user.hashed_password, hashedPassword)) {
//             return done(null, false, {
//               message: "Incorrect username or password.",
//             });
//           }
//           return done(null, user);
//         }
//       );
//     });
//   })
// );

