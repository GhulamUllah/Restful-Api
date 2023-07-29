const Product = require('../models/productModel')
const Store = require('../models/storeModel')
const User = require('../models/userModel')



// Add Product with Logic of no more than 5 images are allowed per per product
const addProduct = async(req,res)=>{
    try {
        const {store_id,vender_id,category_id,price,name,description,discount} = req.body
        let images = []
        for (let index = 0; index < req.files.length; index++) {
            images.push(req.files[index].filename)

            
        }
        const store= await Store.findOne({_id:store_id})
        const store_name = store.name
       const product = await new Product({
            store_id:store_id,
            vender_id:vender_id,
            category_id:category_id,
            price:price,
            name:name,
            description:description,
            discount:discount,
            images:images
        })
        await product.save()
        res.status(200).send({success:true,message:"Product Added in Store => "+store_name,data:product})

    } catch (error) {
     res.status(400).send({success:false,message:error.message})   
    }
}

// Get Images

const getProduct=async(req,res)=>{
try {
    const product_data = await Product.find()
    if(product_data){
        res.status(200).send({success:true,data:product_data})
    }
    else{
        res.status(200).send({success:false,message:'Something went Wrong Check Your internet Connection and try again'})
    }
} catch (error) {
    res.status(400).send({success:false,message:error.message})
}
}

// Delete Product Logic is here

const deleteProduct = async(req,res)=>{
    try {
        const {id}=req.params
        const delproduct = await Product.findByIdAndDelete({_id:id})
        if(delproduct){
            
        res.status(200).send({success:true,message:"Product has been Deleted Successfully",data:delproduct})
    }
    else{
        res.status(200).send({success:false,message:'Something went Wrong Check Your internet Connection and try again'})
    }
    } catch (error) {
        
    res.status(400).send({success:false,message:error.message})
}
}

const updateProduct = async(req,res)=>{
try {
    const {id}=req.params
    const {price,name,description,discount} = req.body
    const product = await Product.findOne({_id:id})
console.log(req.user,product.vender_id)
    if (req.user._id.toString() === product.vender_id){
        const update_product = await Product.updateOne({_id:id},{$set:{
            price:price ? price : product.price,
            name: name ?  name : product.name,
            description : description ? description : product.description,
            discount: discount ? discount : product.discount
        }},{new:true})
        res.status(200).send({success:true,message:'Product Updated Successfully',data:update_product})
    }
    else{
        res.status(200).send({
            success:false,
            message:"You cannot update this Product"
        })
    }

} catch (error) {
    res.status(400).send({success:false,message:error.message})
    
}
}



//module Export 
module.exports = {
    addProduct,
    getProduct,
    updateProduct,
    deleteProduct
}