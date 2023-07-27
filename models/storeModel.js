const mongoose = require('mongoose')


const store = mongoose.Schema({
    vender_id:{
        type:String,
        required:true
    },
    business_email:{
        type:String,
        required:true
    },
    logo:{
        type:String,
        required:true
    },
    pin:{
        type:String,
        required:true
    },
    location:{
       type: {type:String,
        required:true},
        coordinates:[]
    },
    address:{
        type:String,
        required:true
    }
})
store.index({location:"2dsphere"})
module.exports = mongoose.model("Store",store)