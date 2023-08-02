const express = require('express')
const User = require('../models/userModel')
const Store = require('../models/storeModel')


//Function Defined Below


// Create Store and Strict to Single User Single Account
const create_store = async (req,res)=>{
    try {
        const {vender_id,business_email,pin,address,latitude,longitude,name} = req.body
       console.log(name)
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
                else if(req.user._id.toString() !== vender_id){
                    res.status(200).send({success:false,message:"You are Trying to Hack which is not posible here jani"})

                }
                else{
                    const store =await new Store({
                        vender_id:vender_id,
                        name:name,
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

//Load Store
const get_store = async(req,res)=>{
    try {
       const stores = await Store.find() 
       res.status(200).send({success:true,data:stores})
    } catch (error) {
        res.status(400).send({success:false,message:error.message})
    }
}

//delete Store Logic is Below
const delete_store = async(req,res)=>{
    try {
        const {id}=req.params
        const delstore = await Store.findByIdAndDelete({_id:id})
        res.status(200).send({success:true,message:"Store named: ("+delstore.name+") Deleted Successfully"})
    } catch (error) {
        res.status(400).send({success:false,message:error.message})
        
    }
}


// Update Store Details Logic is Here
const update_store = async(req,res)=>{
    try {
        const {business_email,pin,address,latitude,longitude,name} = req.body

        const {id}= req.params
        const store = await Store.findOne({_id:id})
        if(store){
            const updatedStore = await Store.updateOne({
                _id:id
            },
            {$set:{
                business_email: business_email ? business_email : store.business_email,
                pin: pin ? pin : store.pin,
                name: name ? name : store.name,
                address: address ? address : store.address,
                latitude:latitude ? latitude : store.latitude,
                longitude:longitude ? longitude : store.longitude
            }},{new:true})
            res.status(200).send({success:true,message:'Store Details Updated Successfully',data:updatedStore})
        }
        else{
            res.status(200).send({success:false,message:"No Store Found Against Your details"})
        }
    } catch (error) {
        res.status(400).send({success:false,message:error.message})
        
    }
}

// Finding the nearest Store Logic is here 
const near_store = async(req,res)=>{


        try {
            const {latitude,longitude,maxDistance}=req.body
            let store_data = await Store.aggregate([
                {
                    $geoNear:{
                        near:{
                            type:"Point",
                            coordinates:[parseFloat(longitude),parseFloat(latitude)]
                        },
                        spherical:true,
                        includeLocs:"dist.location",
                        maxDistance:maxDistance*1906,
                        distanceField:"dist.calculated"
                }
            }
            ])

            res.status(200).send({success:true,message:"Nearest Stores",data:store_data})
        } catch (error) {
            res.status(400).send({success:false,message:error.message})
        }
}




module.exports = {
    create_store,
    get_store,
    delete_store,
    update_store,
     near_store

}