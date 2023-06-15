import express from "express"
const router = express.Router();
import {loginUser,registerUser,profileUser,updateProfileUser,getUsers,deleteUser,getUserById,updateUser} from '../controllers/userController.js'
import {protect,admin} from '../middleware/authMiddleware.js'
// get all users using get /api/users
router.route('/').get(protect,admin,getUsers)

// register user using post /api/users
router.post('/',registerUser)

// login user authentication using post /api/users/login
router.post('/login',loginUser)

// get user profile using get /api/users/profile use after login and update using put /api/users/profile same
router.route('/profile').get(protect,profileUser).put(protect,updateProfileUser)

// delet user using delete /api/users/id, get user by get /api/users/id, update user put /api/users/id
router.route('/:id').delete(protect,admin,deleteUser).get(protect,admin,getUserById).put(protect,admin,updateUser)
export default router;