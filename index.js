const express = require('express');
const app = express();
const port = 4000;
   

app.listen(port, function(err){
    if(err){
        console.log('Error in running the server',{err});

    }
    
    console.log('Server is running on port:',{port});
});