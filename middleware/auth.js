const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const config = require('../config/config')
const User = require('../models/userModel')



// Auth Logic is Defined Below


const VerifyToken = async (req, res, next) => {
    try {
        const token = req.body.token || req.query.token || req.headers['authorization']
        if (!token) {
            res.status(400).send({ success: false, message: "Authentication Failed" })

        }
        else {
            const isVerified = await jwt.verify(token, config.My_Secrate_Key);
            if(isVerified){
                const user = await User.findOne({_id:isVerified});
                req.user = user
                next()
            }

        }


    } catch (error) {
        res.status(400).send({ success: false, message: error.message })
    }
     

}
module.exports = VerifyToken;