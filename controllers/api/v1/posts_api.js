const Post = require('../../../models/post');

module.exports.index = async function(req, res){

    let posts= await Post.find({})

    .sort('-createdAt')
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path:'user'
        }
    });

    return res.json(200, {
        message: "List of posts",
        posts: posts
    })
}

module.exports.destroy = async function(req, res)
{
 
 try {

 let post=await Post.findById(req.params.id);
// .id means converting the objecct id into string


        return res.json(200,{
            message: "completed successfully"
        })
      
  
//   else{
//     return res.redirect('back');
//   }
}catch(err){
  return res.json(500,{
    message: "internal server error"
  })
}
};