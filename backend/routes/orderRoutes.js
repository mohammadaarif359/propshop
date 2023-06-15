import express from "express"
const router = express.Router();
import {protect,admin} from '../middleware/authMiddleware.js'
import {addOrderItems,getOrderById,updateOrderToPaid,getMyOrders,getOrders,updateOrderToDeliver} from '../controllers/orderController.js'

// create order using /api/orders
router.route('/').post(protect,addOrderItems).get(protect,admin,getOrders)
// get my orders using /api/orders/myorder
router.route('/myorders').get(protect,getMyOrders)
// get order by using /api/orders/:id
router.route('/:id').get(protect,getOrderById)
// update order to paid using /api/orders/:id/pay
router.route('/:id/pay').put(protect,updateOrderToPaid)
// update order to paid using /api/orders/:id/deliver
router.route('/:id/deliver').put(protect,admin,updateOrderToDeliver)

export default router;