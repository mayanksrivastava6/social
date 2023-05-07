const Post = require('../models/post')

module.exports.create = function(req, res){
      Post.create({
        content: req.body.content,
        user: req.user._id,
        name: req.user.name
      },function(err,post){
        if(err){console.log('error in creating a post'); return;}

        return res.redirect('back');

      })
}