const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);

mongoose.connect("mongodb://localhost/blog_demo_2");

var Post = require("./models/post");
var User = require("./models/user");

Post.create({
  title: "My usual type of food",
  content: "dry"
}, (err,post)=>{
  User.findOne({email:"nooch@cats.com"},(err,foundUser)=>{
    if(err) {
      console.log(err);
    } else {
      foundUser.posts.push(post);
      foundUser.save((err,data)=>{
        if(err) {
          console.log(err);
        } else {
          console.log(data);
        }
      });
    }
  })
});

// User.findOne({email:"nooch@cats.com"}).populate("posts").exec((err,user)=>{
//   if(err) {
//     console.log(err);
//   } else {
//     console.log(user);
//   }
// });
