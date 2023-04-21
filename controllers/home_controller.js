module.exports.home = function(req,res){
    // return res.end('<h1>Express is up for media</h1>')
    return res.render('home',{
        ttitle: "home"
    });

}