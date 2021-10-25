const Category=require('../model/category')

// to insert data in category model
exports.postCategory=async(req,res)=>{
    let category= new Category(req.body)
    category.findOne({category_name:category.category_name},async(error,data)=>{
        if(data==null){
            category= await category.save()

            if(!category){
                return res.status(400).json({error:"something went wrong"})
            }
            res.send(category)
        }
        else{
            return res.status(400).json({error:'category must be unique'})
        }
    })
  
}


//to show all category list
exports.showCategoryList=async(req,res)=>{
    const category = await Category.find()
    if(!category){
        return res.status(400).json({error:'Something went wrong'})

    }
    res.send(category)
}

//to show single category
exports.categoryDetails=async(req,res)=>{
    const category=await Category.findById(req.params.id)
   

    if(!category){
        return res.status(400).json({error:"something went wrong"})
    }
    res.send(category)
}

//to update category
exports.updateCategory=async(req,res)=>{
    const category= await Category.findByIdAndUpdate(
        req.params.id,
        {
            category_name:req.body.category_name
        },
        {new:true}
    )
    if(!category){
        return res.status(400).json({error:"something went wrong"})
    }
    res.send(category)
}

//to delete category
exports.deleteCategory=(req,res)=>{
    Category.findByIdAndRemove(req.params.id)
    .then(category=>{
        if(!category){
            return res.status(400).json({error:'Something went wrong'})
        }
        else{
            return res.status(200).json({message:'category deleted'})
        }

    })
    .catch(err=>{
        return res.status(400).json({error:err  })
    })
}
















// exports.showInfo=(req,res)=>{
//     res.send('it is coming from the controller')
// }

// exports.showData=(req,res)=>{
//     res.send('it is another function')
// }
