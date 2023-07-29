const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const auth = require('../middleware/auth')
const productController = require('../controllers/productController')
const multer = require('multer')
const product_route = express()
product_route.use(bodyParser.json())
product_route.use(bodyParser.urlencoded({ extended: true }))


// multer Setup for array
const storageref = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(__dirname,'../public/productImages'),(error,succes)=>{if(error) throw error})
    },
    filename:function(req,file,cb){
        const name = file.originalname+'-'+Date.now()
        cb(null,name,(err,suc)=>{if(err) throw err})
    }
})
const upload = multer({storage:storageref})



// Product Routes
product_route.get('/',productController.getProduct)
product_route.post('/add-product',auth,upload.array('images'),productController.addProduct)
product_route.delete('/delete-product/:id',auth,productController.deleteProduct)
product_route.patch('/update-product/:id',auth,productController.updateProduct)




//Module export 
module.exports = product_route