const Product = require('../models/productModel')
const Category = require('../models/categoryModel')
const User = require('../models/productModel')
const SubCategory = require('../models/subCategoryModel')
const Store = require('../models/storeModel')


const dataCount = async(req,res)=>{
try {
    
    const p_count = await Product.find().count()
    const cat_count = await Category.find().count()
    const subcat_count = await SubCategory.find().count()
    const store_count = await Store.find().count()
    const user_count = await User.find().count()
    res.status(200).send({success:true,messge:"Statistic Details:",data:{
        Total_Products: p_count,
        Total_Categories:cat_count,
        Total_SubCategories:subcat_count,
        Total_Stores:store_count,
        Total_Users:user_count
    }})
} catch (error) {
    res.status(400).send({success:false,messge:error.messge})
}

}


//Exports
module.exports = {
    dataCount
}