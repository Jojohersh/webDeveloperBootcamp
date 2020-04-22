// mongoose is an Object Data Mapper
const mongoose = require('mongoose');
//to remove deprecation messages
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect("mongodb://localhost/cat_app");

var catSchema = new mongoose.Schema({
  name: String,
  age: Number,
  temperament: String
});

var Cat = mongoose.model("Cat", catSchema);
//add new cat to db
var george = new Cat({
  name: "George",
  age: 11,
  temperament: "grouchy"
});
// var george = new Cat({
//   name: "Mrs. Norris",
//   age: 7,
//   temperament: "evil"
// });

// store cat to db, takes an error and the object
// george.save((err,cat)=>{
//   if(err) {
//     console.log("SOMETHING WENT WRONG");
//   } else {
//     console.log("Saved cat to database");
//     console.log(cat);
//   }
// });
// also .find({},function()), .remove({},function()), .create({},function())

Cat.create({
  name: "Nooch",
  age: 3,
  temperament: "friendly"
}, (err,cat) =>{
  if(err) {
    console.log("ERROR: " + err);
  } else {
    console.log(cat);
  }
});

//retrieve all cats from the db and console.log each one
Cat.find({}, (err,cats) => {
  if(err) {
    console.log("OH NO, ERROR!");
    console.log(err);
  } else {
    console.log("All the cats...");
    console.log(cats);
  }
});
