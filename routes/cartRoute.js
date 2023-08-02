const express = require('express')
const auth = require('../middleware/auth')
const bodyParser = require('body-parser')
const cartController = require('../controllers/cartController')
const cart_route = express()
cart_route.use(bodyParser.json())
cart_route.use(bodyParser.urlencoded({extended:true}))



cart_route.get('/',auth,cartController.getCart)
cart_route.post('/add-to-cart/:id',auth,cartController.addtocart)
cart_route.post('/cartincrement/:id',auth,cartController.Cartincrement)
cart_route.post('/cartdecrement/:id',auth,cartController.Cartdecrement)
cart_route.post('/delete-from-cart/:id',auth,cartController.deleteCart)
cart_route.get('/paginate',auth,cartController.pagination)


// Export Section
module.exports = cart_route