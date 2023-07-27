const mongoose = require('mongoose')
const categoryModel = mongoose.Schema({
    category_name: {
        type: String,
        required: true
    }
})
module.exports = mongoose.model("category", categoryModel)