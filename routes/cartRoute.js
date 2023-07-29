const express = require('express')
const auth = require('../middleware/auth')
const bodyParser = require('body-parser')
const cartController = require('../controllers/cartController')
const cart_route = express()
cart_route.use(bodyParser.json())
cart_route.use(bodyParser.urlencoded({extended:true}))



cart_route.get('/',auth,cartController.getCart)
cart_route.post('/add-to-cart/:id',auth,cartController.addtocart)


// Export Section
module.exports = cart_route