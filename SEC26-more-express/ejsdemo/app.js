const express = require('express');
var app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function(req,res){
  res.render("home");
});

app.get("/fallinlovewith/:thing", function(req,res){
  var thing = req.params.thing;
  res.render("love", {thingVar: thing});
});
app.get("/posts", function(req,res) {
  var posts = [
    {title: "post 1", author: "Susy"},
    {title: "WOw! Click this!", author: "Jack"},
    {title: "Learn more about me!", author: "Amalon"},
  ];
  res.render("posts", {posts: posts});
})

app.listen(3000, function(){
  console.log("server running on port 3000...");
})
