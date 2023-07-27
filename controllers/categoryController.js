const Category = require('../models/categoryModel')
const User = require('../models/userModel')

// Load All Categories Logic is Here
const loadCategory = async (req, res) => {
    try {
        console.log(req.user)
        const catData = await Category.find()
        res.status(200).send({ success: true, data: catData })
    } catch (error) {
        res.status(400).send({ success: false, message: error.message })
    }
}

// Adding Category Logic is Here 
const addCategory = async (req, res) => {
    try {
        const { category_name } = req.body
        const catData = await Category.find()
        if (catData.length > 0) {
            let checkdata = false
            for (let index = 0; index < catData.length; index++) {
                console.log(catData[index]['category_name'])
                if (catData[index]['category_name'].toLowerCase() === category_name.toLowerCase()) {
                    checkdata = true
                    res.status(200).send({ success: false, message: "Category by name ( " + category_name + " ) Already Exists" })
                    break;
                }
            }
            if (checkdata === false) {

                const newcat = await new Category({
                    category_name: category_name
                })
                await newcat.save()
                res.status(200).send({ success: true, message: "Category Created Successfully", data: newcat })
            }

        }
        else {
            const newcat = await new Category({
                category_name: category_name
            })
            await newcat.save()
            res.status(200).send({ success: true, message: "Category Created Successfully", data: newcat })
        }
    } catch (error) {
        console.log("Error part")
        res.status(400).send({ success: false, message: error.message })

    }
}



// Delete Category Logic is Here
const deleteCategory = async (req, res) => {

    try {
        const { id } = req.params
        const catData = await Category.findOneAndDelete({ _id: id })
        res.status(200).send({success:true,message:"Category "+catData.category_name+" has been Deleted Successfully",data:catData})
    } catch (error) {
        res.status(400).send({ success: false, message: error.message })

    }
}



// Updating Category Logic is Here
const updateCategory = async(req,res)=>{
    try {
        const {id}= req.params
        const {category_name}= req.body
         const catData = await Category.findByIdAndUpdate({_id:id},{$set:{category_name:category_name}},{new:true})
         if(catData){
            res.status(200).send({success:true,message:"Category Updated Successfully",data:catData})
         }
         else{
            res.status(200).send({success:false,message:"Somthing Went Wrong...! Please Try Again with Correct Credientials"})

         }
    } catch (error) {
        res.status(400).send({ success: false, message: error.message })
        
    }
}




// Exporting All Modules/Functions
module.exports = {
    loadCategory,
    addCategory,
    deleteCategory,
    updateCategory
}