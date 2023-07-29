const SubCategory = require('../models/subCategoryModel')
const Category = require('../models/categoryModel')


// Get All SubCategory Logic is here
const getsubcat = async (req, res) => {
    try {
        const getsub = await SubCategory.find()
        res.status(200).send({ success: true, data: getsub })
    } catch (error) {
        res.status(400).send({ success: false, message: error.message })
    }
}

//Add new SubCategory Logic is Here
const addSubCat = async (req, res) => {
    try {
        const { category_id, subcategory_name } = req.body
        const subcat = await SubCategory.find()
        const category = await Category.findOne({ _id: category_id })

        if (subcat.length > 0 && category) {
            let check = false

            for (let i = 0; i < subcat.length; i++) {
                if (subcat[i]['subcategory_name'].toLowerCase() === subcategory_name.toLowerCase()) {
                    check = true
                    res.status(200).send({ success: false, message: "Subcategory (" + subcat[i]['subcategory_name'] + ") Already Exist" })
                    break;
                }

            }

            if (!check) {
                const data = await new SubCategory({
                    category_id: category_id,
                    subcategory_name: subcategory_name
                })
                const datt = await data.save()
                res.status(200).send({
                    success: true,
                    message: "Congrats...! Sub-Category has been added successfully",
                    data: datt
                })
            }
            



        }

        else {
            if (category) {
                const data = await new SubCategory({
                    category_id: category_id,
                    subcategory_name: subcategory_name
                })
                const datt = await data.save()
                res.status(200).send({
                    success: true,
                    message: "Congrats...! Sub-Category has been added successfully",
                    data: datt
                })
            }
            else {
                res.status(200).send({ success: false, message: "Category Does not exist.. Please create parent Category First...!" })
            }
        }
    } catch (error) {

        res.status(400).send({ success: false, message: error.message })
    }
}


//Delete SubCategory Logic is Here
const deletesub = async (req, res) => {
    try {
        const { id } = req.params
        const deldata = await SubCategory.findByIdAndDelete({ _id: id })
        if (deldata) {
            res.status(200).send({ success: true, message: "Sub Category (" + deldata.subcategory_name + ") has been Deleted Successfully", data: deldata })
        }
        else {
            res.status(200).send({
                success: false,
                message: "Something Went Wrong Please Check your Connection and Try again"
            })
        }
    } catch (error) {
        res.status(400).send({ success: false, message: error.message })
    }
}

const updatesub = async (req, res) => {
    try {
        const { id } = req.params
        const { subcategory_name } = req.body
        const updatedata = await SubCategory.findByIdAndUpdate({ _id: id }, { $set: { subcategory_name: subcategory_name } }, { new: true })
        if (updatedata) {
            res.status(200).send({
                success: true,
                message: "SubCategory updated Successfully",
                data: updatedata
            })
        }
        else {
            res.status(200).send({
                success: false,
                message: "Something Went Wrong Please Check your Connection and Try again"
            })
        }
    } catch (error) {
        res.status(400).send({ success: false, message: error.message })

    }
}



//Exports
module.exports = {
    getsubcat,
    addSubCat,
    deletesub,
    updatesub
}