const express=require('express')
const {requireSignin} = require('../controller/authController')
const { postCategory,showCategoryList,categoryDetails,updateCategory,deleteCategory} = require('../controller/categoryController')
const router=express.Router()


router.post('/postcategory',requireSignin, postCategory)
router.get('/categorylist',showCategoryList)
router.get('/categorydetails/:id',categoryDetails)
router.put('/updatecategory/:id',requireSignin,updateCategory)
router.delete('/deletecategory/:id',requireSignin,deleteCategory)
// router .get('/hellocontroller', showInfo)
// router.get('/show',showData)


module.exports=router