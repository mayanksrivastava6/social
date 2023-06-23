const User = require('../models/user');
const Otp = require('../models/otp');
const fs = require('fs');
const path = require('path');
const queue = require('../dbconnect/kue');
const otpGenerator = require('otp-generator')
const bcrypt = require('bcrypt')
const nodemailer=require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: 'socialmayank45@gmail.com',
        pass: 'mhucqqbsycoykknr'
    },
  });

module.exports.myprofile = function(req,res, user){

   

        return res.render('profile', {
            title: 'User Profile',
            profile_user: user
        });
   
}


module.exports.profile = function(req,res){

    User.findById(req.params.id, function(err, user){

        return res.render('user_profile', {
            title: 'User Profile',
            profile_user: user
        });
    });
    
        

}
module.exports.update = async function(req, res){
   
    if(req.user.id == req.params.id){
        try{
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req,res, function(err){
                if(err){
                    console.log('multer error', err)
                }
                
                user.name = req.body.name;
                user.email = req.body.email;

                if(req.file){
                    if (user.avatar){
                        fs.unlinkSync(path.join(__dirname, '..', user.avatar));
                    }
                   
                    //this is saving the path of the
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                user.save();
                return res.redirect('back');
            })

        }catch(err){
            req.flash('error', err);
            return res.redirect('back');
        }

    }
    else{
            return res.status(401).send('Unauthorized');
        }

}

// reder sign up page
module.exports.signUp =  function(req, res){
    if(req.isAuthenticated()){
       return res.redirect('/users/profile');
    } 

    return res.render('user_sign_up',{
        title: "Media | Singn Up"
    })
}
// rander sign in page
module.exports.signIn =  function(req, res){
  
    if(req.isAuthenticated()){
       return res.redirect('/users/profile');
    }
    return res.render('user_sign_in',{
        title: "Media | Singn In"
    })
}
// sign up
module.exports.create = function(req, res){
    if (req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
       console.log(req.body.email);
        
        if(err){console.log('error in finding user in signing up'); return}

        if (!user){
            User.create(req.body, function(err,user){
                if(err){console.log(err); return}

                return res.redirect('/users/sign-in');
            })
        }else{
            return res.redirect('back');
        }

    });
   
}


// sign in and session for user
module.exports.createSession = function(req, res){
    req.flash('success', 'Logged in Successfully');
    return res.redirect('/');
    //todo
}

module.exports.forgotpass = async (req, res)=>{
       try{
           res.render('forgotpass');
       }
       catch(err)
       {
           console.log('ERROR', err);
           return;
       }
}

module.exports.destroySession = async function(req, res){

    // req.flash('success', 'You have Logged out');
   try{
//    let user= await req.logout();
     req.logout((err)=>
    {
        console.log(err)
    }
    );
    req.flash('success', 'You have Logged out!');
    
    return res.redirect('/');
   }
    catch(err)
    {
        console.log('ERROR', err);
        return;
    }
    

}


module.exports.sendOTP = async function(req, res)  {
    try {
      // console.log(req.route.path);
      const { email } = req.body;

      const user = await User.findOne({ email });
      if (!user) throw new Error("No user found!");
      const userotp = await Otp.findOne({ email });
      if (!userotp) {
        const userotp = Otp({
          createdAt: new Date(),
          email,
          otp: null,
        });
        await userotp.save();
        userotp.otp = otpGenerator.generate(4, {
          upperCaseAlphabets: false,
          specialChars: false,
          lowerCaseAlphabets: false,
        });
        await userotp.save();
      }
      
      if(userotp){
        userotp.otp = otpGenerator.generate(4, {
        upperCaseAlphabets: false,
        specialChars: false,
        lowerCaseAlphabets: false,
      });
      await userotp.save();

      const mailoptions = {
        from: "socialmayank45@gmail.com",
        to: email,
        subject: "Verification OTP",
        html: `
        <div
          class="container"
          style="max-width: 90%; margin: auto; padding-top: 20px"
        >
          <h2>Social AKG OTP verification</h2>
          <h4>You are about change your account password.</h4>
          <p style="margin-bottom: 30px;">Please enter this OTP to change password.</p>
          <h1 style="font-size: 40px; letter-spacing: 2px; text-align:center;">${userotp.otp}</h1>
     </div>
      `,
      };
      transporter.sendMail(mailoptions, (err, info) => {
        if (err) {
          console.log(err);
          throw new Error("Mail not sent");
        } else {

          console.log("mail sent");
        }
      });
    }
    return res.render('otp_input', {
        title: 'OTP verification',
        profile_user: user
    });
    //   res.status(200).json({
    //     success: true,
    //     msg: "mail sent",
    //   });
    } catch (error) {
      res.status(400).json({ success: false, msg: error.message });
      console.log(error);
    }
  }

  module.exports.verify= async function(req, res)  {
    try {
    //   console.log(req.route.path);
      const { email, otp } = req.body;
      const user = await User.findOne({email});
      const userotp = await Otp.findOne({ email });
      // console.log(user);
      console.log(userotp);
      if (!userotp) throw new Error("OTP timed out.");
      if (!user) throw new Error("No user found!");
      if (userotp.otp == otp) {
        res.status(200).json({
          success: true,
          msg: "user verified",
          id:user._id,
        });
      } else res.status(400).json({ success: false, msg: "OTP incorrect" });
    } catch (error) {
      res.status(400).json({ success: false, msg: error.message });
      console.log(error);
    }
  }

// module.exports.generateOtp = (
//     otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false }),
//     console.log(otp)

// );
