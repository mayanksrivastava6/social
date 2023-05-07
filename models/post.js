const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    content: {
        type: String,
        require: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    //includec the id of array in schema
    comments: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comment'
    }
},
{
    timestamps: true
});
 
const Post = mongoose.model('Post', postSchema);
module.exports = Post;