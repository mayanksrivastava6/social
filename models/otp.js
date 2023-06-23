const mongoose = require('mongoose');

// const otpGenerator = require('otp-generator');
const otpSchema = new mongoose.Schema({
   otp:
   {
    type: String,
    unique: true,
    

   },
   email: {
    type: String,
    required: true,
    unique: true,
},
"createdAt" : {
    type: Date,
}

    
},
{
    timestamps: true
});
 
const Otp = mongoose.model('Otp', otpSchema);
module.exports = Otp;