const mongoose = require('mongoose')


const Cart_Model = mongoose.Schema({
    vender_id:{
        type:String,
        required:true
    },
    product_id:{
        type:String,
        required:true
    },
    store_id:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    discount:{
        type:String,
        required:true
    },
   image:{
    type:String,
    required:true
   },
  quantity:{
    type:Number,
    required:true,
    default:1
  }
})

// Exports
module.exports = mongoose.model("Cart",Cart_Model)