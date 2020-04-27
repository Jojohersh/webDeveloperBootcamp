const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override')
const expressSanitizer = require('express-sanitizer');
//  APP CONFIG =========================================
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);
mongoose.connect("mongodb://localhost/restfulBlogApp");

//MONGOOSE MODEL ========================================
// title, image, body, created
var blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: {type:Date, default: Date.now}
})
var Blog = mongoose.model("Blog", blogSchema);
// Blog.create({
//   title: "test blog",
//   image: "https://cdn.pixabay.com/photo/2016/03/09/09/43/person-1245959_960_720.jpg",
//   body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
// })
// ROUTES ================================================
app.get("/", (req,res)=> {
  res.redirect("/blogs");
});
app.get("/blogs", (req,res)=>{
  var blogs = Blog.find({}, (err, blogs)=>{
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
  req.body.blog.body = req.sanitize(req.body.blog.body);
  Blog.create(req.body.blog, (err,newBlog) =>{
    if (err) {
      res.render("new");
    } else {
      // redirect to the index
      res.redirect("/blogs");
    }
  });
});
//SHOW ROUTE
app.get("/blogs/:id", (req,res)=>{
  Blog.findById(req.params.id, (err,foundBlog)=>{
    if(err) {
      res.redirect("/blogs");
    } else {
      res.render("show", {blog:foundBlog});
    }
  });
});
//EDIT ROUTE
app.get("/blogs/:id/edit", (req,res)=>{
  Blog.findById(req.params.id, (err,foundBlog)=>{
    if(err) {
      console.log(err);
    } else {
      res.render("edit",{blog:foundBlog});
    }
  });
});
//UPDATE ROUTE
app.put("/blogs/:id", (req,res)=>{
  req.body.blog.body = req.sanitize(req.body.blog.body);
  Blog.findByIdAndUpdate(req.params.id,req.body.blog, (err,updatedBlog)=>{
    if(err) {
      res.redirect("/blogs/");
    } else {
      res.redirect("/blogs/" + req.params.id);
    }
  });
});
//DESTROY ROUTE
app.delete("/blogs/:id", (req,res)=>{
  //destroy blog
  Blog.findByIdAndRemove(req.params.id, (err)=>{
    if(err) {
      res.redirect("/blogs");
    } else {
      res.redirect("/blogs");
    }
  });
  //redirect somewhere
});

app.listen("3000", ()=> {
  console.log("Server running on port 3000...");
});
