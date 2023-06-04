const User = require('../models/user');
const fs = require('fs');
const path = require('path');

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
