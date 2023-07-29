const mongoose = require('mongoose')

let arrayCheck=(val)=>{
    return val.length <= 5
}
const product = mongoose.Schema({
    store_id:{
        type:String,
        required:true
    },
    vender_id:{
        type:String,
        required:true
    },
    category_id:{
        type:String,
        required:true
    },
    images:{
        type:Array,
        required:true,
        validate:[arrayCheck,"You cannot Enter more than 5 images"]
    },
    price:{
        type:String,
        required:true
    },
    description:{
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
})



module.exports = mongoose.model("product",product)