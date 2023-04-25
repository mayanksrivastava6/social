const mongoose = require('mongoose');

uri = "mongodb+srv://mayank:Manu@webserver.6vsbgqn.mongodb.net/webserver?retryWrites=true&w=majority";

console.log('connected to database');
const connectDB = () =>{
    return mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiledTopology: true,
    });
}


module.exports = connectDB;