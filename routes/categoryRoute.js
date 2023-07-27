const express = require('express')
const category_route = express()
const bodyParser = require('body-parser')
const auth = require('../middleware/auth')
const categoryController = require('../controllers/categoryController')
category_route.use(bodyParser.json())
category_route.use(bodyParser.urlencoded({extended:true}))



category_route.get('/',auth,categoryController.loadCategory)
category_route.post('/add-category',auth,categoryController.addCategory)
category_route.delete('/delete-category/:id',auth,categoryController.deleteCategory)
category_route.put('/update-category/:id',auth,categoryController.updateCategory)


module.exports = category_route