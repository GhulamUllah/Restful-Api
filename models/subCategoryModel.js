const mongoose = require('mongoose')


const subCategory = mongoose.Schema({
    category_id:{
        type:String,
        required:true
    },
    subcategory_name:{
        type:String,
        required:true
    }
})
module.exports = mongoose.model("subCategory",subCategory)