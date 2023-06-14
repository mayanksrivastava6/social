const mongoose = require('mongoose');


const commentSchema = new mongoose.Schema({
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
    post:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
    email:{
        type:String
    }
},{
    timestamp: true
});


const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;