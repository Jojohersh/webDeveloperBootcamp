const User = require('./models/user');
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const LocalStrategy = require('passport-local');
const passportLocalMongoose = require('passport-local-mongoose');

mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);
mongoose.connect("mongodb://localhost/auth_demo_app");

var app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(require("express-session")({
  secret: "Put Your English Words Here Por Favor",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
// adds serialization to the User schema
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//ROUTES==============================================================
app.get("/", (req,res)=>{
  res.render("home");
});

app.get("/secret",isLoggedIn, (req,res)=>{
  res.render("secret");
});

//AUTH ROUTES
//show register page
app.get("/register", (req,res)=>{
  res.render("register");
});
//handles user sign up
app.post("/register", (req,res)=>{
  req.body.username
  req.body.password
  User.register(new User({username:req.body.username}), req.body.password, (err, user)=>{
      if(err) {
        console.log(err);
        return res.render("register");
      }
      passport.authenticate("local")(req,res,()=>{
        res.redirect("/secret");
      });
  });
});
//LOGIN ROUTES
//render login form
app.get("/login", (req,res)=>{
  res.render("login");
});
//login logic
app.post("/login",passport.authenticate("local", {
  successRedirect: "/secret",
  failureRedirect: "/login"
}), (req,res)=>{
});
//LOGOUT ROUTE
app.get("/logout", (req,res)=>{
  req.logout();
  res.redirect("/");
});

function isLoggedIn(req,res,next) {
  if(req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

app.listen("3000", ()=>{
  console.log("server started on port 3000...");
});
