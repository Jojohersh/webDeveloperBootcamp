var express = require("express");

var app = express();

app.get("/", function(req, res) {
  res.send("Hi there, welcome to my assignment!");
});
app.get("/speak/:animal", function(req, res) {
  var animal = req.params.animal.toLowerCase();
  var sounds = {
    pig: "Oink",
    dog: "Woof woof!",
    cat: "Meowww",
    cow: "Moo",
    bird: "Tweet Tweet"
  };
  var sound = sounds[animal];
  if (sound) {
    res.send("The " + animal + " says '" + sound + "'");
  } else {
    res.send("Hmmmm, I ain't ever heard of no " + animal + " before...");
  }
});
app.get("/repeat/:word/:repeats", function(req, res) {
  var word = req.params.word;
  var repeats = Number(req.params.repeats);
  var resText = "";
  for (var i = 0; i < repeats; i++) {
    resText = resText.concat(" " + word);
  }
  resText = resText.trim();
  res.send(resText);
});
app.get("*", function(req, res) {
  res.send("Sorry, page not found... What are you doing with your life?");
});
app.listen(3000, function() {
  console.log("server listening on port 3000");
})
