const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

const connectDB = require('./config/mongoose');
const port = 4000;
   

app.use(express.urlencoded());

app.use(cookieParser());
//use express router
app.use('/' , require('./routes'));

app.set('view engine', 'ejs');
app.set('views', './views');

app.listen(port, function(err){
    if(err){
        console.log('Error in running the server',{err});

    }

    console.log('Server is running on port:',{port});
});