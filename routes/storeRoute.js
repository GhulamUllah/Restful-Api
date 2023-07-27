const express = require("express")
const User = require('../models/userModel')
const storeController = require('../controllers/storeController')
const multer = require('multer')
const bodyParser = require('body-parser')
const store_routes = express()
store_routes.use(bodyParser.json())
store_routes.use(bodyParser.urlencoded({ extended: true }))
store_routes.use(express.static('public'))
const auth = require('../middleware/auth')
const path = require("path")

// Multer Setup
const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(__dirname,'../public/storeLogos'),function(error,success){if(error) throw error})
    },
    filename:function(req,file,cb){
  const name=Date.now()+'-'+file.originalname

        cb(null,name,function(error,success){if(error) throw error})
    }


})
const upload = multer({storage:storage})

store_routes.post('/create-store',auth,upload.single('logo'),storeController.create_store)
module.exports = store_routes
