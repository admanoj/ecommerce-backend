exports.productValidation=(req,res,next)=>{
    req.check('product_name','Product name is required').notEmpty()
    req.check('product_price','Product price is required').notEmpty()
    .isNumeric()
    .withMessage('Price contains only numeric value')
    req.check('countInStock','stock value is required').notEmpty()
    .isNumeric()
    .withMessage('Stock value contans only numeric value')
    req.check('product_description','Desciption is required').notEmpty()
    .isLength({
        min:20
    })
    .withMessage('Description must be more than 20 characetrs')
    req.check('category','Category is required').notEmpty()

    const errors=req.validationErrors()
    if(errors){
        const showError=errors.map(error=>error.msg)[0]
        return res.status(400).json({error:showError})
    }

    next()

}


exports.userValidation=(req,res,next)=>{
    req.check('name',' name is required').notEmpty()
    req.check('email','email is required').notEmpty()
    .isEmail()
    .withMessage('invalid email')

    req.check('password','password is required').notEmpty()
    .isLength({
        min:8
    })
   
    .withMessage('password must be minimum of 8 characters')

 

    const errors=req.validationErrors()
    if(errors){
        const showError=errors.map(error=>error.msg)[0]
        return res.status(400).json({error:showError})
    }

    next()

}