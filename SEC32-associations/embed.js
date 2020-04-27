const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);

mongoose.connect("mongodb://localhost/blog_demo");

//POST   title, content
var postSchema = new mongoose.Schema({
  title: String,
  content: String,
});

var Post = mongoose.model("Post", postSchema);
//USER   email, name
var userSchema = new mongoose.Schema({
  email: String,
  name: String,
  posts: [postSchema]
});

var User = mongoose.model("User", userSchema);

// var newUser = new User({
//   email: 'jobi@jobes.edu',
//   name: "Jobi"
// });
//
// newUser.posts.push({
//   title: "Opinions on cake",
//   content:"Meh."
// });
// newUser.posts.push({
//   title: "Opinions on coffee",
//   content: "Ayyyyy lmao"
// });

// newUser.save((err,user)=>{
//   if(err) {
//     console.log(err);
//   } else {
//     console.log(user);
//   }
// });

// var newPost = new Post({
//   title: "Reflections",
//   content: "Why do anything if everything is nothing?"
// });
// newPost.save((err,post)=>{
//   if(err) {
//     console.log(err);
//   } else {
//     console.log(post);
//   }
// });

User.findOne({name: "Jobi"}, (err, user)=>{
  if(err) {
    console.log(err);
  } else {
    user.posts.push({
      title: "Opinions on Adam",
      content: "Sick."
    });
    user.save((err,user)=>{
      if(err) {
        console.log(err);
      } else {
        console.log(user);
      }
    });
  }
});
