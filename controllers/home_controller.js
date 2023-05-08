const Post = require('../models/post');

module.exports.home = function(req, res){
    // console.log(req.cookies);
    // res.cookie('user_id', 25);
     Post.find({}, function(err, posts){

        return res.render('home', {
            title: "Codial | Home",
            posts: posts,
            
        });
        
     });
    //  Post
//    .findOne({_id: user._Id })
//    .populate('user') // key to populate
//    .then(post => {
//       res.json(post); 
//    });

    // Post.find({}).populate('user').exec(function(err, posts){
    //     return res.render('home', {
    //         title: "Codeial | Home",
    //         posts:  posts
    //     });
    // })
  
//     Post.populate(user, {path: "post"});
//     // .populate("food_list")
//   if(!user) return res.status(400).json({msg:'Not able to search.'});

//   const restaurants = [];
//   user.forEach(post=>{
//       restaurants.push(post);
//   });
}