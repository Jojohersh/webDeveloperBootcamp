const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
//  APP CONFIG =========================================
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/restfulBlogApp");

//MONGOOSE MODEL ========================================
// title, image, body, created
var blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: {type:Date, default: Date.now}
})
var blog = mongoose.model("Blog", blogSchema);
// blog.create({
//   title: "test blog",
//   image: "https://cdn.pixabay.com/photo/2016/03/09/09/43/person-1245959_960_720.jpg",
//   body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
// })
// ROUTES ================================================
app.get("/", (req,res)=> {
  res.redirect("/blogs");
});
app.get("/blogs", (req,res)=>{
  var blogs = blog.find({}, (err, blogs)=>{
    if (err) {
      console.log(err);
    } else {
      res.render("index", {blogs:blogs});
    }
  });
});
//NEW ROUTE
app.get("/blogs/new", (req,res)=>{
  res.render("new");
});
//CREATE ROUTE
app.post("/blogs", (req,res)=>{
  // create blog
  var data = req.body.blog;
  blog.create(data, (err,newBlog) =>{
    if (err) {
      res.render("new");
    } else {
      // redirect to the index
      res.redirect("/blogs");
    }
  });
});
app.listen("3000", ()=> {
  console.log("Server running on port 3000...");
});
