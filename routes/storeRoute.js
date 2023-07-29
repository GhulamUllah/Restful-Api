const express = require("express")
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


//Store Routes Logic is Here
store_routes.post('/add-store',auth,upload.single('logo'),storeController.create_store)
store_routes.get('/',auth,storeController.get_store)
store_routes.delete('/delete-store/:id',auth,storeController.delete_store)
store_routes.patch('/update-store/:id',auth,storeController.update_store)



// Export
module.exports = store_routes
