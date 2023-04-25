const User = require('../models/user');



module.exports.profile =function(req,res){
    // res.end('<h1>profile</h1>')
    return res.render('user_profile',{
        title: 'User Profile'
    })
}

// reder sign up page
module.exports.signUp =  function(req,res){
    return res.render('user_sign_up',{
        title: "Media | Singn Up"
    })
},
// rander sign in page
module.exports.signIn =  function(req,res){
    return res.render('user_sign_in',{
        title: "Media | Singn In"
    })
}
// sign up
module.exports.create = function(req,res){

    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email},function(err, user){
        if(err){
            console.log('error in finding user in signin up');
            return
        }
        if(!user){
            User.Creat(req.body, function(err, user){
            if(err){console.log('error in creating user while signing up');
        return
            }
            return res.redirect('/users/sign-in');

            })
        }else{
            return res.redirect('back');
        }
    });
   
}

// sign in and session for user
module.exports.create_session = function(req,res){
    
    //todo
}