const Cart = require('../models/cartModel')
const Product = require('../models/productModel')

const getCart = async(req,res)=>{
    try {
        const cartData = await Cart.find()
        if(cartData){
res.status(200).send({success:true,data:cartData})
        }
        else{
res.status(200).send({success:false,message:"Something Went Wrong or nothing in cart"})
        }
    } catch (error) {
        res.status(400).send({success:false,message:error.message})
    }
}

const addtocart = async(req,res)=>{
    try {
        const {id}=req.params
        const product = await Product.findOne({_id:id})
console.log(product)
        if(product){
           

            const cart=await new Cart({
                product_id:id,
                vender_id:product.vender_id,
                store_id:product.store_id,
                price:product.price,
                discount:product.discount,
                image:product.images[0],
                name:product.name,
            })
            await cart.save()
            res.status(200).send({success:true,message:"Product added to cart Successfully",data:cart})
        }else{
            res.status(200).send({success:false,message:"Product not Fount"})
        }

    } catch (error) {
        res.status(400).send({success:false,message:error.message})
    }
}

//Delete Item From Cart
const deleteCart = async(req,res)=>{
    try {
        const {id}= req.params
    if(id){
        const deldata = await Cart.findByIdAndDelete({_id:id})
        if(deldata){
            res.status(200).send({success:false,message:"Cart Item Deleted Successfully",data:deldata})
        }
        else{
            res.status(200).send({success:false,message:"No Cart Item Found Against your Data"})

        }
    }
    else{
        res.status(200).send({success:false,message:"There is a Technical Issue, Please Pass Cart Item ID",})

    }
    } catch (error) {
        res.status(400).send({success:false,message:error.message})
    }
}

// Cart Increment 
const Cartincrement = async(req,res)=>{
    try {
        const {id} = req.params

    } catch (error) {
        res.status(400).send({success:false,message:error.message})
    }
}


//Export Section
module.exports = {
    getCart,
    addtocart,
    deleteCart
}