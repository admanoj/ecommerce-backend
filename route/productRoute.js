const express=require('express')
const {requireSignin} = require('../controller/authController')
const {postProduct, productList, productDetails, updateProduct, deletProduct} =require('../controller/productController')

const upload=require('../middleware/file-upload')
const { productValidation } = require('../validation')
const router= express.Router()

router.post('/postproduct',requireSignin,upload.single('product_image'),productValidation, postProduct)
router.post('/postproduct',postProduct)
router.get('/productlist',productList)
router.get('/productdetails/:id',productDetails)
router.put('/updateproduct/:id',requireSignin,updateProduct)
router.delete('/deleteproduct/:id',requireSignin,deletProduct)


module.exports=router