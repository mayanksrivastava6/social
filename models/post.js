const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({
    content: {
        type: String,
        require: true
    },
    user:{
        type: mongoose.Schema.Type.ObjectId,
        ref: 'user'
    }
},
{
    timestamps: true
});
 
const Post = mongoose.model('Post', postSchema);
module.exports = Post;