const express = require('express')
const bodyParser = require('body-parser')
const subcategory_route = express()
const auth = require('../middleware/auth')
const SubCategoryController = require('../controllers/subcategoryController')




subcategory_route.use(bodyParser.json())
subcategory_route.use(bodyParser.urlencoded({extended:true}))



// Sub-Category Routes
subcategory_route.get('/',SubCategoryController.getsubcat)
subcategory_route.post('/add-sub-category',auth,SubCategoryController.addSubCat)
subcategory_route.delete('/delete-sub-category/:id',auth,SubCategoryController.deletesub)
subcategory_route.patch('/update-sub-category/:id',auth,SubCategoryController.updatesub)



// Exports
module.exports = subcategory_route