const Product=require('../model/product')

// to store product in databse

exports.postProduct=async(req,res)=>{
    let product=new Product ({
        product_name:req.body.product_name,
        product_price:req.body.product_price,
        countInStock:req.body.countInStock,
        product_description:req.body.product_description,
        product_image:req.file.path,
        category:req.body.category

    })
    product= await product.save()
    if(!product){
        return res.status(400).json({error:'Something went wrong'})
    }
    res.send(product)
}

exports.productList=async(req,res)=>{
    const product=await Product.find()
    .populate('category')
    if(!product){
        return res.status(400).json({error:"Something went wrong"})
    }
    res.send(product)
}

//to show single product
exports.productDetails=async(req,res)=>{
    const product=await Product.findById(req.params.id)
    if (!product){
        return res.status(400).json({error:"Something went wrong"})
    }
    res.send(product)
}

//to update product
exports.updateProduct = async (req,res) =>{
const product= await Product.findByIdAndUpdate(
    req.params.id,
    {
        product_name:req.body.product_name,
        product_price:req.body.product_price,
        countInStock:req.body.countInStock,
        product_description:req.body.product_description,
        product_image:req.body.product_image,
        category:req.body.category
    },
    {new: true}
)
if (!product){
    return res.status(400).json({error:"Something went wrong"})
}
res.send(product)
}

//delet product
exports.deletProduct=(req,res)=>{
    Product.findByIdAndRemove(req.params.id).then(product=>{
        if(!product){
            return res.status(400).json({error:'product  not found'})
        }
        else{
            return res.status(200).json({message:'product deleted'})
        }

    })
    .catch(err=>{
        return res.status(400).json({error:err})
    })
}


