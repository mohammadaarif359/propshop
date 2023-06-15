import Order from '../models/orderModel.js'
import asyncHandler from 'express-async-handler';

// create order
const addOrderItems = asyncHandler(async(req,res) =>{
    const { orderItems,shippingAddress,paymentMethod,itemsPrice,taxPrice,shippingPrice,totalPrice } = req.body
    if(orderItems && orderItems.length === 0) {
        res.status(400)
        throw new Error('No order item found')
        return
    } else {
        const order = new Order({
            orderItems,
            user_id:req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        })
        const createdOrder = await order.save()
        res.status(200).json(createdOrder)
    }
})

const getOrderById = asyncHandler(async(req,res) =>{
    const order = await Order.findById(req.params.id).populate('user_id','name email')
    if(order) {
        res.status(200).json(order)
    } else {
        res.status(400)
        throw new Error('Order not found')
    }
})

const updateOrderToPaid = asyncHandler(async(req,res) =>{
    const order = await Order.findById(req.params.id)
    if(order) {
        order.isPaid = true
        order.paidAt = Date.now()
        order.paymentResult = {
            id:req.body.id,
            status:req.body.status,
            update_time:req.body.update_time,
            email_address:req.body.payer.email_address
        }

        const updateOrder = await order.save()
        res.status(200).json(updateOrder)
    } else {
        res.status(400)
        throw new Error('Order not found')
    }
})
const updateOrderToDeliver = asyncHandler(async(req,res) =>{
    const order = await Order.findById(req.params.id)
    console.log('in back devlied');
    if(order) {
        order.isDelivered = true
        order.deliveredAt = Date.now()

        const updateOrder = await order.save()
        res.status(200).json(updateOrder)
    } else {
        res.status(400)
        throw new Error('Order not found')
    }
})

const getMyOrders = asyncHandler(async(req,res) =>{
    const order = await Order.find({user_id:req.user._id})
    res.status(200).json(order)
})

const getOrders = asyncHandler(async(req,res) =>{
    const order = await Order.find({}).populate('user_id','_id name')
    res.status(200).json(order)
})

export {
    addOrderItems,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDeliver,
    getMyOrders,
    getOrders
}