const Post = require('../models/post');
const Comment = require('../models/comment');
const PostMailer =  require('../mailer/post_mail')

module.exports.create = async function(req, res){
  try{
    let post=await Post.create({
      content: req.body.content,
      user: req.user._id,
   });

   
  PostMailer.NewPost(post)
      if(req.xhr){

        
        return res.status(200).json({
          data:{
            post: post
          },
          message: "Post created!"
        })
      }
      req.flash('success','Post published');
      return res.redirect('back');

  }catch(err){
    console.log('Error', err);
    return;
  }
   
}


module.exports.destroy = async function(req, res)
{
 
 try {

 let post=await Post.findById(req.params.id);
// .id means converting the objecct id into string

  if(post.user == req.user.id){
    post.remove();
      
     await Comment.deleteMany({post: req.params.id})
     if (req.xhr){
      return res.status(200).json({
          data: {
              post_id: req.params.id
          },
          message: "Post deleted"
      });
  }

  req.flash('success', 'Post and associated comments deleted!');
        return res.redirect('back');
      
  }
  else{
    return res.redirect('back');
  }
}catch(err){
  console.log('Error', err);
  return;
}
};

  
 