const express = require("express");
const passport = require("passport");
const LocalStrategy = require('passport-local');
const crypto = require('crypto');
const CryptoJS = require("crypto-js"); 
const { check, validationResult } = require("express-validator");
const User = require("../model/userModel");

const authRouter = express();

passport.use(new LocalStrategy(function verify(email, password, cb) {
  User.findOne({email}, function(err, user) {
    if (err) {
    	 return cb(err); 
    	 }
    if (!user) { 
    return cb(null, false, { message: 'Incorrect Email or password.' }); }

    crypto.pbkdf2(password, user.salt, 310000, 32, 'sha256', function(err, hashedPassword) {
      if (err) { return cb(err); }
      if (!crypto.timingSafeEqual(user.hashed_password, hashedPassword)) {
        return cb(null, false, { message: 'Incorrect Email or password.' });
      }
      return cb(null, user);
    });
  });
  
}));


passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    cb(null, { id: user.id, email: user.email });
  });
});

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});


// register
authRouter
  .route("/register")
  .get((req, res) => {
    res.render("users/register", { layout: false });
  })
  .post((req, res, next) => {
  	const { firstname, lastname, email, password, confirm_password } =
        req.body; 
  const salt = crypto.randomBytes(16);
  crypto.pbkdf2(req.body.password, salt, 310000, 32, 'sha256', function(err, hashedPassword) {
    if (err) { 
    return next(err); 
    }
   
        const user = new User({
            firstname,
            lastname,
            email,
            password: hashedPassword,
            confirm_password,
          });
        //res.send('hh')
        //console.log(user)
          
     user.save((err) => {
     	if (err) { return next(err);}
     	
     	req.login(user, function(err) {
        if (err) { return next(err); }
        res.redirect('/');
        console.log(user)
      });
     })   
  });
});

  
// login
authRouter
  .route("/login")
  .get((req, res) => {
    res.render("users/login", { layout: false });
  })
  .post(
    passport.authenticate("local", {
      successRedirect: '/',
      failureRedirect: "/auth/login",
      failureFlash: "Invalid Email or password",
    }),
    
  );
  
// logout
authRouter.post('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) { 
    return next(err); 
    }
    res.redirect('/');
  });
});

module.exports = authRouter;