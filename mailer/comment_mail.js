const usermodel = require('../models/user')
const nodemailer = require('../dbconnect/nodemailer');


exports.newComment = async (comment) => {
    
    console.log('inside newComment mailer', comment);
    const {user} = comment;
    

    console.log(user)
    const userdetails = await  usermodel.findById(user)

    const {email} = userdetails
    
  
    // console.log(email)

    nodemailer.transporter.sendMail({
        from: 'socialmayank45@gmail.com',
        to: [email],
       subject: "New Comment Published!",
       html: '<h1>Yup, your comment is now published!</h1>'
       
    }, (err, info) => {
        if (err){
            console.log('Error in sending mail', err);
            return;
        }

        console.log('Message sent', info);
        return;
    });
}