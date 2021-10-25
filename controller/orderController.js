const OrderItem =require('../model/order-item')
const Order = require('../model/order')

exports.postOrder=async(req,res)=>{
    const orderItemsIds =Promise.all(req.body.orderItems.map(async(orderItem)=>{
        let newOrderItem= new OrderItem({
            quantity:orderItem.quantity,
            product:orderItem.product
        })
        newOrderItem=await newOrderItem.save()
        return newOrderItem._id
    }))
    const orderItemsIdResolved=await orderItemsIds
    //calculating total price

    const totalPrices= await Promise.all(orderItemsIdResolved.map(async(orderItemId)=>{
        const itemOrder= await OrderItem.findById(orderItemId).populate('product','product_price')
        const total=itemOrder.quantity*itemOrder.product.product_price
        return total
       
    }))
    const TotalPrice=totalPrices.reduce((a,b)=>a+b,0)


    let order= new Order({
        orderItems:orderItemsIdResolved,
        shippingAddress1:req.body.shippingAddress1,
        shippingAddress2:req.body.shippingAddress2,
        city:req.body.city,
        zip:req.body.zip,
        country:req.body.country,
        phone:req.body.phone,
        totalPrice:TotalPrice,
        user:req.body.user
    })
    order=await order.save()
    if(!order){
        return res.status(400).json({error:"the order cannot be cpmpleted"})
    }
    res.send(order)

}

exports.orderList=async(req,res)=>{
    const order= await Order.find()
    .populate('user','name')
    .sort({createAt:-1})

    if(!order){
        return res.status(400).json({error:"something went wrong"})
    }
    res.send(order)
}

exports.orderDetails=async(req,res)=>{
    const order=await Order.findById(req.params.id)
    .populate('user','name')
    .populate({
        path:'orderItems',populate:{
            path:'product',populate:'category'
        }
    })
    if(!order){
        return res.status(400).json({error:"something went wrong"})
    }
    res.send(order)

}

exports.updateStatus=async(req,res)=>{
    const order=await Order.findByIdAndUpdate(
        req.params.id,
        {
            status:req.body.status
        },
        {new:true}
    )
    if(!order){
        return res.status(400).json({error:"something went wrong"})
    }
    res.send(order)
}