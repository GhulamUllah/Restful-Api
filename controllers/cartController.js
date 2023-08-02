const Cart = require('../models/cartModel')
const Product = require('../models/productModel')

const getCart = async (req, res) => {
    try {
        const cartData = await Cart.find()
        if (cartData) {
            res.status(200).send({ success: true, data: cartData })
        }
        else {
            res.status(200).send({ success: false, message: "Something Went Wrong or nothing in cart" })
        }
    } catch (error) {
        res.status(400).send({ success: false, message: error.message })
    }
}

const addtocart = async (req, res) => {
    try {
        const { id } = req.params
        const product = await Product.findOne({ _id: id })
        console.log(product)
        if (product) {
            let cartdata = []
            const cart = await new Cart({
                product_id: id,
                vender_id: product.vender_id,
                store_id: product.store_id,
                price: product.price,
                discount: product.discount,
                image: product.images[0],
                name: product.name,
                quantity: product.quantity
            })

            await cartdata.push(cart)




            await cart.save()
            res.status(200).send({ success: true, message: "Product added to cart Successfully", data: cartdata })
        } else {
            res.status(200).send({ success: false, message: "Product not Fount" })
        }

    } catch (error) {
        res.status(400).send({ success: false, message: error.message })
    }
}

//Delete Item From Cart
const deleteCart = async (req, res) => {
    try {
        const { id } = req.params
        if (id) {
            const deldata = await Cart.findByIdAndDelete({ _id: id })
            if (deldata) {
                res.status(200).send({ success: false, message: "Cart Item Deleted Successfully", data: deldata })
            }
            else {
                res.status(200).send({ success: false, message: "No Cart Item Found Against your Data" })

            }
        }
        else {
            res.status(200).send({ success: false, message: "There is a Technical Issue, Please Pass Cart Item ID", })

        }
    } catch (error) {
        res.status(400).send({ success: false, message: error.message })
    }
}

// Cart Increment 
const Cartincrement = async (req, res) => {
    try {
        const { id } = req.params
        const updated = await Cart.findOne({ _id: id })
        if (updated) {
            console.log(updated)
            const data = await Cart.updateOne({ _id: id }, { $set: { quantity: updated.quantity + 1 } })
            if (data) {
                console.log(data)
                res.status(200).send({ success: true, message: "Quantity Increased", data: data })
                
            }
            else {
                res.status(200).send({ success: false, message: "Cannot Update Quantity Please try again" })
            }
        }
        else {
            res.status(200).send({ success: false, message: "No Product Found against Your id" })
        }
    } catch (error) {
        res.status(400).send({ success: false, message: error.message })
    }
}


const Cartdecrement = async (req, res) => {
    try {
        const { id } = req.params
        const updated = await Cart.findOne({ _id: id })
        if (updated) {
            if (updated.quantity >= 2) {
                const data = await Cart.updateOne({ _id: id }, { $set: { quantity: updated.quantity - 1 } })
                if (data) {
                    console.log(data)
                    res.status(200).send({ success: true, message: "Quantity Decreased", data: data })
                }
                else {
                    res.status(200).send({ success: false, message: "Cannot Update Quantity Please try again" })
                }
            }
            else{
                res.status(200).send({success:false, message:"Quantity Can never be Less than 1"})
            }
        }
        else {
            res.status(200).send({ success: false, message: "No Product Found against Your id" })
        }
    } catch (error) {
        res.status(400).send({ success: false, message: error.message })
    }
}


// Cart Pagination logic is here just for practice
const pagination=async(req,res)=>{
try {
    const {page,sort}= req.body
    let skip;
    let customsort
    if(page <= 1){
        skip=0
    }
    else{
        skip=(page - 1)*5
    }
    if(sort){
        if(sort === 'name'){
            customsort={
                name:1
            }
        }
        else if(sort ==='_id'){
            customsort={
                _id:1
            }
        }
    }
    const data = await Cart.find().sort(customsort).skip(skip).limit(5)
    res.status(200).send({success:true,message:"Cart Paginate",data:data})
} catch (error) {
    res.status(400).send({ success: false, message: error.message })
    
}
}


//Export Section
module.exports = {
    getCart,
    addtocart,
    deleteCart,
    Cartincrement,
    Cartdecrement,
    pagination
}