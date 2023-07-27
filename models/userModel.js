const mongoose = require('mongoose')


const Usermodel = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        default: 100
    },
    resettoken: {
        type: String,
        default: ''
    },
    token: {
        type: String,
        default: ''
    },
    otp: {
        type: String,
        default: ''
    }
})
module.exports = mongoose.model("User", Usermodel)