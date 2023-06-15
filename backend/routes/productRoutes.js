import express from "express"
const router = express.Router();
import Product from '../models/productModel.js'
import {getProducts,getProductById,deleteProduct,createProduct,updateProduct,createProductReview,getTopProducts} from '../controllers/productController.js'
import {protect,admin} from '../middleware/authMiddleware.js'

// get all products using /api/products and create product using same post 
router.route('/').get(getProducts).post(protect,admin,createProduct)

// get all products using /api/products/:id/reviews and create product reviews using same post 
router.route('/top').get(getTopProducts)

// get all products using /api/products/:id/reviews and create product reviews using same post 
router.route('/:id/reviews').post(protect,createProductReview)

// get single products using /api/products/:id
router.route('/:id').get(getProductById).delete(protect,admin,deleteProduct).put(protect,admin,updateProduct)

export default router;