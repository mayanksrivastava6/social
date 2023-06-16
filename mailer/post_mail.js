const postmail = require('../models/user')
const postMailer = require('../dbconnect/nodemailer');

exports.NewPost = async (post) =>{
    const {user} = post;

    const userPosts = await postmail.findById(user)
    console.log(user);

    const {email} = userPosts;
    
  
    // console.log(email)

    postMailer.transporter.sendMail({
        from: 'socialmayank45@gmail.com',
        to: [email],
       subject: "New Comment Published!",
       html: '<h1>Yup, your post is now published!</h1>'
       
    }, (err, info) => {
        if (err){
            console.log('Error in sending mail', err);
            return;
        }

        console.log('Message sent', info);
        return;
    });

}