const express = require('express')
const User = require('../models/userModel')
const Store = require('../models/storeModel')


//Function Defined Below


// Create Store and Strict to Single User Single Account
const create_store = async (req,res)=>{
    try {
        const {vender_id,business_email,pin,address,latitude,longitude} = req.body
        
        const userData = await User.findOne({_id:vender_id})
        if(userData){
            if(!latitude || !longitude){
            res.status(200).send({success:false,message:"Location is Required"})

            }
            else{
            const storeData = await Store.findOne({vender_id:vender_id})
                if(storeData){
            res.status(200).send({success:false,message:"You have Already a Store"})

                }
                else{
                    const store =await new Store({
                        vender_id:vender_id,
                        business_email:business_email,
                        pin:pin,
                        address:address,
                        logo:req.file.filename,
                        location:{
                            type:'Point',
                            coordinates:[parseFloat(longitude),parseFloat(latitude)]
                        }
                    })
                    await store.save()
                    res.status(200).send({success:true,message:"Store Created Successfully",data:store})
                }
                
            }
        }
        else{
            res.status(200).send({success:false,message:"Seller ID Does Not Exist"})
        }
    } catch (error) {
        res.status(400).send({success:false,message:error.message})
    }
}




module.exports = {
    create_store
}