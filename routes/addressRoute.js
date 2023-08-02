const express = require('express')
const addressController = require('../controllers/addressController')
const address_route = express()
const bodyParser = require('body-parser')
const auth = require('../middleware/auth')
address_route.use(bodyParser.json())
address_route.use(bodyParser.urlencoded({ extended: true }))



// Routes
address_route.get('/',auth,addressController.getAddress)
address_route.post('/add-address',auth,addressController.addAddress)
address_route.delete('/delete-address',auth,addressController.deleteAddress)
address_route.patch('/update-address',auth,addressController.updateAddress)



//Exports
module.exports = address_route