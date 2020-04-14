var express = require("express");
var app = express();

// "/" => "Hi there!"
app.get("/", function(req,res){
  res.send("Hi there!");
});

// "/bye" => "Goodbye!"
app.get("/bye", function(req,res) {
  res.send("Goodbye!");
});
// "/dog" => "MEOW!"
app.get("/dog", function(req,res) {
  res.send("MEOW!");
});
app.get("/r/:subredditName", function(req,res) {
  console.log(req.params);
  var subreddit = req.params.subredditName;
  res.send("WELCOME TO THE " + subreddit.toUpperCase() + " SUBREDDIT!");
});
// all others
app.get("*", function(req,res) {
  res.send("you are a star!");
});
//tell express to listen for requests (start server)
app.listen(3000, function() {
  console.log("server listening on port 3000");
})
