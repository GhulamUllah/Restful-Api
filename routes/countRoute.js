const express = require('express')
const count_route = express()
const countController = require('../controllers/countController')
const bodyParser = require('body-parser')
count_route.use(bodyParser.json())
count_route.use(bodyParser.urlencoded({extended:true}))
const auth = require('../middleware/auth')



count_route.get('/get-count',auth,countController.dataCount)


//Exporting Logic is mensioned Below
module.exports = count_route