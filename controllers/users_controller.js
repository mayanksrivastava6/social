const User = require('../models/user');



module.exports.profile = function(req,res){

    User.findById(req.params.id, function(err, user){

        return res.render('user_profile', {
            title: 'User Profile',
            profile_user: user
        });
    });
    
        

}
module.exports.update = function(req, res){
    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
            return res.redirect('back');
        });
    }else{
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
    return res.redirect('/');
    //todo
}

module.exports.destroySession = function(req, res, next){
    // req.logout();
    req.logout((err)=>
    {
        console.log(err)
    }
    );
    return res.redirect('/');
    

}
