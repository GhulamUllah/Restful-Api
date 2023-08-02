const Address = require('../models/addressModel')

const getAddress = async(req,res)=>{
try {
    const user_id = req.user._id
    const found_address =await Address.findOne({user_id:user_id})
    if(found_address){
        res.status(200).send({success:true,message:"Your address Details Loaded",data:found_address.address})

    }
    else{
        res.status(200).send({success:true,message:"You didn't added any Address Yet"})
    }
    
} catch (error) {
    res.status(400).send({success:false,message:error.message})
}
}


// add Address no repeated same user Collection as well as updated address logic
const addAddress = async (req, res) => {


    try {
        const  user_id  = req.user._id
        const { address } = req.body

        const data = await Address.findOne({ user_id: user_id })
        console.log(data)
        if (data) {
            let addressArray=[]
            for(let i = 0; i<data.address.length; i++){
                addressArray.push(data.address[i])
            }
           await addressArray.push(address)
           const updatedArray = await Address.findOneAndUpdate({user_id:user_id},{$set:{address:addressArray}},{new:true})
            res.status(200).send({success:true,message:"Address Added Details",data:updatedArray})
        }
        else {
            const address_data = await new Address({
                user_id: user_id,
                address: address
            })
            await address_data.save()
            res.status(200).send({ success: true, message: "address Added", data: address_data })
        }
    } catch (error) {
        res.status(400).send({ success: false, message: error.message })
    }

}

//Delete Address Logic
const deleteAddress = async(req,res)=>{
try {
    const user_id=req.user._id
    const {index}=req.body
    const match_user = await Address.findOne({user_id:user_id})
    if(match_user){
      await  match_user.address.splice(index,1)
        const updated = await Address.updateOne({user_id:user_id},{$set:{address:match_user.address}},{new:true})
        res.status(200).send({success:true,message:"Address Deleted Successfully",data:updated})
    }
    else{
        res.status(200).send({success:true,message:"You Don't have any Address Registered"})
    }
} catch (error) {
    res.status(400).send({ success: false, message: error.message })
    
}
}



//Update Address Logic is Here
const updateAddress = async(req,res)=>{
try {
    const {index,address}=req.body
    const {_id}=req.user
    const userCollection = await Address.findOne({user_id:_id})
    if(userCollection){
        await userCollection.address.splice(index,1,address)
        console.log(userCollection.address)
        const updated = await Address.updateOne({user_id:_id},{$set:{address:userCollection.address}},{new:true})
        res.status(200).send({success:true,message:"Address Updated Successfully",data:updated})
    }
    else{
        res.status(200).send({success:false,message:"No Record Found"})
    }
} catch (error) {
    res.status(400).send({success:false,message:error.message})
}
}


module.exports = {
    addAddress,
    deleteAddress,
    getAddress,
    updateAddress
}


