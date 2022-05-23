const mongoose = require('mongoose')


const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter a name"]
    },
    password:{
        type:String,
        required: [true, "Please enter a password"]
    },
    email: {
        type:String,
        required: [true, "Please enter an email"],
        unique: true
    }
}, {timestamps:true})

const User = mongoose.model('User', userSchema)

module.exports = User