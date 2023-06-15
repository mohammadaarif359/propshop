import Product from '../models/productModel.js'
import asyncHandler from 'express-async-handler';

// get all products
const getProducts = async(req,res) =>{
    const pageSize = 4
    const page = Number(req.query.pageNum) || 1
    const keyword = req.query.keyword ? {
        name : {
            $regex:req.query.keyword,
            $options:'i'
        }
    } : {}

    const count = await Product.count({ ...keyword })
    const products = await Product.find({ ...keyword }).limit(pageSize).skip(pageSize * (page -1))
    res.json({products,page,pages:Math.ceil(count/pageSize)});
}

// get single products by id
const getProductById = asyncHandler(async(req,res) =>{
    const product = await Product.findById(req.params.id)
    if(product) {
        res.json(product)
    } else {
        //res.status(404).json({type:"error",message:"product not found",code:404})
        res.status(404)
        throw new Error('Product not found')
    }
})

// delete products by id
const deleteProduct = asyncHandler(async(req,res) =>{
    const product = await Product.findById(req.params.id)
    if(product) {
        product.remove()
        res.json({message:'product removed'})
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

// post crete product
const createProduct = asyncHandler(async(req,res) =>{
    const product = new Product({
        name:'Sample name',
        price:0,
        user_id:req.user._id,
        image:'images/sample.jpg',
        brand:'sample brand',
        category:'sample category',
        countInStock:1,
        numReviews:0,
        description:'sample description'
    })
    const createdProduct = await product.save();
    res.json(createdProduct)
})
// put update product
const updateProduct = asyncHandler(async(req,res) =>{
    const {name,price,description,image,brand,category,countInStock} = req.body
    const product = await Product.findById(req.params.id)
    if(product) {
        product.name = name
        product.price = price
        product.description = description
        product.image = image
        product.brand = brand
        product.category = category
        product.countInStock = countInStock
        const updatedProduct = await product.save();
        res.json(updatedProduct)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})
// post crete product
const createProductReview = asyncHandler(async(req,res) =>{
    const {rating,comment} = req.body
    const product = await Product.findById(req.params.id)
    if(product) {
        const alreadyReviewed = product.reviews.find(r=> r.user_id.toString() === req.user._id.toString())
        if(alreadyReviewed) {
            res.status(404)
            throw new Error('Product already reviewed') 
        }
        const reviews = {
            name:req.user.name,
            rating:Number(rating),
            comment:comment,
            user_id:req.user._id
        }
        // add new reviews in reviews array data
        product.reviews.push(reviews)
        // total no of reviews
        product.numReviews = product.reviews.length
        // avg rating calculation
        product.rating = product.reviews.reduce((acc,item)=>item.rating + acc,0) / product.reviews.length
        await product.save()
        res.status(200).json({message:'Review added'})
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})
// get top rated product
const getTopProducts = asyncHandler(async(req,res) =>{
    const products = await Product.find({}).sort({rating:-1}).limit(4)
    res.status(200).json(products)
    
})

export {
    getProducts,
    getProductById,
    deleteProduct,
    createProduct,
    updateProduct,
    createProductReview,
    getTopProducts
}