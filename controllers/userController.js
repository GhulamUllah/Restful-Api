const nodemailer = require('nodemailer')
const random = require('randomstring')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const config = require('../config/config')


// Password Hashing Logic
const hashingFunc = async (password) => {
    const hashpass = await bcrypt.hash(password, 12)
    return hashpass;
}

//Token Genrating Logic
const userLoginToken = async (id) => {
    try {
        const token = await jwt.sign({ _id: id }, config.My_Secrate_Key)
        return token
    } catch (error) {
        console.log(error)
        res.status(400).send({ success: false, message: error })
    }
}


//Email Sending Logic
const EmailSender = async (otp, email, name, res) => {
    try {

        // Transport Create Logic
        const Transporter = await nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            requireTLS: true,
            secure: false,
            auth: {
                user: config.Email,
                pass: config.Password
            }
        })


        // Email Sending Logic
        await Transporter.sendMail({
            from: config.Email,
            to: email,
            subject: "OTP Verification",
            html: '<p>Hi <b style={{color:green}}>' + name + '</b>, Your Verication OTP is Here: <b style={{color:green}}>' + otp + '</b><</p>'
        }, (error, info) => {
            if (error) {
                res.status(400).send({ success: false, message: "There is an error in sending Email... Please Try Again After Checking Your Connection" })
                console.log(error)
            }
            else {
                console.log(info.response)
                res.status(200).send({ success: false, message: "Email Send Successfully Please Check Your Email and Verify", info: info.response })

            }
            return res
        })
    } catch (error) {
        console.log(error)
    }
}






// Here are my API Functions


// Signup Logic is here
const userSignup = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const userData = await User.findOne({ email: email })
        if (userData) {
            res.status(200).send({ success: false, message: 'Email Already Exists' })
        }
        else {
            const pass = await hashingFunc(password)
            const newUser = await new User({
                name: name,
                email: email,
                password: pass
            })
            const user = await newUser.save()
            res.status(200).send({ success: true, message: "Account Created Successfully", data: user })
        }


    } catch (error) {
        res.status(400).send({ success: false, message: error.message })
    }
}


// Login Logic is Here
const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        const userData = await User.findOne({ email: email })
        if (userData) {
            const verify = await bcrypt.compare(password, userData.password)
            if (verify) {
                const token = await userLoginToken(userData._id)
                const user = await User({
                    _id: userData._id,
                    name:userData.name,
                    email: userData.email,
                    password: userData.password,
                    balance: userData.balance,
                    type: userData.type,
                    resettoken: userData.resettoken,
                    token: token
                })

                res.status(200).send({ success: true, message: "Login Successful", data: user })
            }
            else {
                res.status(200).send({ success: false, message: "Wrong Password Attempt" })
            }
        }
        else {
            res.status(200).send({ success: true, message: "Email is not Registered" })
        }
    } catch (error) {
        res.status(400).send({ success: false, message: error.message })
    }
}

// Change Password Logic
const change_password = async (req, res) => {
    try {
        const { password, _id } = req.body
        const pass = await hashingFunc(password)
        const updatedpassword = await User.findByIdAndUpdate({ _id: _id }, {
            $set: {
                password: pass
            }
        }, { new: true })
        await updatedpassword.save()
        res.status(200).send({ success: true, message: 'Password Updated Successfully', data: updatedpassword })

    } catch (error) {
        res.status(400).send({ success: false, message: error.message })

    }
}


// Reset Otp Sent Logic is Here
const reset_password = async (req, res) => {

    try {
        const { email } = req.body
        const userData = await User.findOne({ email: email })
        if (userData) {
            const OTP = await random.generate()

            await EmailSender(OTP, userData.email, userData.name, res)
            const user = await User.updateOne({ otp: '' }, {
                $set: {
                    otp: OTP
                }
            }, { new: true })
            await user.save()
            res.status(200).send({ success: true, message: "Otp Sent Successfully", OTP: OTP, data: user })
        }

    } catch (error) {
        res.status(400).send({ success: false, message: error.message })

    }

}

// Reset OTP Accepting Logic is Here
const link_password = async (req, res) => {
    try {
        const { otp, password } = req.body
        const pass = await hashingFunc(password)
        if (!otp) {
            res.status(200).send({ success: false, message: "Please Enter OTP" })

        }
        else {
            const data = await User.findOneAndUpdate({ otp: otp }, { $set: { otp: '', password: pass } }, { new: true })
            await data.save()
            res.status(200).send({ success: true, message: "Your Password reset Successfully", data: data })

        }


    } catch (error) {
        res.status(400).send({ success: false, message: error.message })

    }
}


// Delete User Logic is Here
const delete_user = async (req, res) => {
    try {
        const id = req.params._id

        const deluser = await User.findOneAndDelete({ _id:id })
        res.status(200).send({ success: true, message: `Dear Admin...! Account Of User ${deluser.name} has been Deleted`, data: deluser })
    } catch (error) {
        res.status(400).send({ success: false, message: error.message })

    }
}


// Get All user Logic is Here
const Get_All_Users = async (req, res) => {
    try {
        const user = await User.find({})
        res.status(200).send({ success: true, data: user })
    } catch (error) {
        res.status(400).send({ success: false, message: error.message })

    }
}


module.exports = {
    userSignup,
    userLogin,
    change_password,
    reset_password,
    link_password,
    delete_user,
    Get_All_Users
}