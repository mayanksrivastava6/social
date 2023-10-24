const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({
   
    content: {
        type: String,
        require: true
    },
    user:    
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    
    ,
    //includec the id of array in schema
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],
    like: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Like'
        }
    ]
},
{
    timestamps: true
});
 
const Post = mongoose.model('Post', postSchema);
module.exports = Post;