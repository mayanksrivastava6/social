const User = require('../models/user');



module.exports.home =function(req,res){
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
module.exports.create = async function(req, res){
    if (req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
       console.log(req.body.email);
        
        if(err){console.log('error in finding user in signing up'); return}

        if (!user){
            User.create(req.body, function(err, user){
                if(err){console.log(err); return}

                return res.redirect('/users/sign-in');
            })
        }else{
            return res.redirect('back');
        }

    });
    // try{
    //     let {email}=req.body;
    //     email=email.toLowerCase();
    //     const user=await User.findOne({email});
    //     console.log(user);

    // }
    // catch(err){
    //     console.log(err);
    // }
}
// module.exports.create = async function(req,res){
//     try{
//     const {email}=req.body;
//     console.log(email);
//     if(req.body.password != req.body.confirm_password){
//         return res.redirect('back');
//     }
//     const olduser = await user.findOne({
//         email:email,
//     });
//     console.log(olduser);
//     if (olduser){
//         console.log("user already exists");
//         res.json({success:false,msg:"User already exist"});
  
//       }else{
//         try{
//           const new_email = user({
//             email:email,
//           });
//           await new_email.save();
//           res.json({success:true,msg:"data was send succesfully"});
//         }catch{
//           res.json({succes:false});
//         }
//     } 
// }
//     catch (err) {
//       console.log("catched error"+err);
//     }
// }    

// sign in and session for user
module.exports.create_session = function(req,res){
//    steps to authenticate
    // find user
    User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log('error in finding user in signing in');
    return}
    })

    // user found
    if(user){
        if(user.password != req.body.password){
            return res.redirect('back');
        }
         // handle password
    // session creation
    res.cookie('user_id', user_id);
    return res.redirect('./user/home');
    }
   else{
    return res.redirect('back');
   }


    // user not found
    //todo
}