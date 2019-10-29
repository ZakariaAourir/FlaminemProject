const express = require("express");
const router = express.Router();
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

let User = require("../models/user");

router.get("/register", (req, res, next) => {
  res.render("register");
});

router.get("/homepage", (req, res, next) => {
  res.render("homepage");
});

// login page
router.get("/login", (req, res, next) => {
  res.render("login");
});

router.get("/", isLoggedIn, (req, res, next) => {
  res.render("index");
});

// logout -
router.get("/logout", (req, res, next) => {
  req.logout();
  res.redirect("/login");
});

router.post("/register", (req, res, next) => {
  const name = req.body.name;
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  const newUser = new User({
    name: name,
    username: username,
    email: email,
    password: password
  });

  User.registerUser(newUser, (err, user) => {
    if (err) throw err;
    res.redirect("/login");
    console.log("succed");
  });
});

// local Strategy

passport.use(
  new LocalStrategy((username, password, done) => {
    User.getUserByUsername(username, (err, user) => {
      if (err) throw err;
      if (!user) {
        return done(null, false, { message: "User Not Found" });
      }
      User.comparePassword(password, user.password, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, { message: "wrong Password" });
        }
      });
    });
  })
);

//serialise

passport.serializeUser((user, done) => {
  done(null, user.id);
});
// deserialise

passport.deserializeUser((id, done) => {
  User.getUserById(id, (err, user) => {
    done(err, user);
  });
});

// login process - post method
router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
  })(req, res, next);
  console.log("you r logged in");
});

// acces controle
function isLoggedIn(req, res, next) {
  console.log(req.isAuthenticated());
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/homepage");
  }
}
module.exports = router;
