const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 4000;
const expressLayouts = require('express-ejs-layouts');
const dbconnection = require('./dbconnect/dbconnection');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./dbconnect/passport-local-strategy');
const passportJWT = require('./dbconnect/passport-jwt-strategy');
const passportGoogle = require('./dbconnect/passport-google-oauth2-strategey');
const redis =  require('redis');
const flash = require('connect-flash');
const customMware = require('./dbconnect/middleware');
// const port = 4000;
   

app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'));
//make the upload parts available
app.use('/uploads', express.static(__dirname +'/uploads'));

// app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
// app.set('layout extractStyles', true);
// app.set('layout extractScripts', true);
//use express router
// app.use('/' , require('./routes'));

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(session({
    name: 'media',
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie:{
        maxAge: (1000 * 60 * 100)
    }
}));

app.use(passport.initialize());
app.use(passport.session());
// app.use(passport.checkAuthentication);
app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);

app.use('/' , require('./routes'));


app.listen(port, function(err){
    if(err){
        console.log('Error in running the server',{err});

    }

    console.log('Server is running on port:',{port});
});
dbconnection();