const mongoose = require('mongoose')


const categorySchema=new mongoose.Schema({
    category_name:{
        type:String,
        required:true,
        trim:true

    }
},{timestamps:true})
//createdAT
//updatedAT

module.exports=mongoose.model('Category',categorySchema)