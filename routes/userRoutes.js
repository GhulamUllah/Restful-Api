const express = require('express')
const bodyParser = require('body-parser')
const userRoute = express()
const userController = require('../controllers/userController')
const auth = require('../middleware/auth')
userRoute.use(bodyParser.json())
userRoute.use(bodyParser.urlencoded({ extended: true }))
userRoute.post('/register', userController.userSignup)
userRoute.post('/login', userController.userLogin)
userRoute.post('/change_password', auth,userController.change_password)
userRoute.post('/reset_password', userController.reset_password)
userRoute.post('/link_password', userController.link_password)
userRoute.get('/',auth,userController.Get_All_Users)
userRoute.delete('/delete_user/:id',auth,userController.delete_user)

module.exports = userRoute
