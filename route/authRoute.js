const express=require('express')
const {userRegister,signIn, signout, postEmailConfirmation, resendVerficationMail, forgetPassword ,resetPassword, userList, userDetails,requireSignin}= require('../controller/authController')
const {userValidation}= require('../validation')
const router=express.Router()


router.post('/register',userValidation,userRegister)
router.post('/signin',signIn)
router.post('/signout,',signout)
router.post('/confirmation/:token',postEmailConfirmation)
router.post('/resendconfirmation',resendVerficationMail)
router.post('/forgetpassword',forgetPassword)
router.post('/resetpassword/:token',resetPassword)
router.get('/userlist',requireSignin, userList)
router.get('/userdetails/:userid',requireSignin, userDetails)



module.exports=router