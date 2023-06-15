import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'
import asyncHandler from 'express-async-handler'

// login user
const loginUser = asyncHandler(async(req,res) =>{
    const {email,password} = req.body
    const user = await User.findOne({email:email})
    if(user && (await user.matchPassword(password))) {
        let response = {}
        response._id = user.id
        response.name = user.name
        response.email = user.email
        response.isAdmin = user.isAdmin
        response.token = generateToken(user._id)
        //res.status(200).json({type:'success',message:'login sucessfully',data:response,code:200})
        res.status(200).json(response)
    } else {
        //res.status(400).json({type:"error",message:"Invalid email or password",code:400})
        res.status(400)
        throw new Error('invalid username or password')
    }
})

// register user
const registerUser = asyncHandler(async(req,res) =>{
    const {name,email,password} = req.body
    let userExits = await User.findOne({email:email})
    if(userExits) {
        res.status(400)
        throw new Error('user already exits')
        //res.status(400).json({type:'error',message:'user already exits',code:400})
    } else {
        const user  = await User.create({
            name,
            email,
            password
        })
        if(user) {    
            let response = {}
            response._id = user.id
            response.name = user.name
            response.email = user.email
            response.isAdmin = user.isAdmin
            response.token = generateToken(user._id)
            res.status(200).json(response)  
            //res.json({type:'success',message:'user register sucessfully',data:[],code:200})
        } else {
            throw new Error('Something went wrong')
            //res.json({type:'error',message:'invalid eamil or password',data:[],code:204})
        }
    }
})
// profile user
const profileUser = asyncHandler(async(req,res) =>{
    const user = req.user
    if(user) {
        res.status(200).json(user);
        //res.status(200).json({type:'success',message:'ok',response:user,code:200})
    } else {
        res.status(204)
        throw new Error('user not found')
        //res.json({type:'error',message:'user not found',response:[],code:204})
    }
})

// profile user update
const updateProfileUser = asyncHandler(async(req,res) =>{
    const user = await User.findById(req.user._id)
    if(user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if(req.body.password) {
            user.password = req.body.password    
        }
        const updateUser = await user.save();
        let response = {}
        response._id = updateUser.id
        response.name = updateUser.name
        response.email = updateUser.email
        response.isAdmin = updateUser.isAdmin
        response.token = generateToken(updateUser._id)
        res.status(200).json(response)
        //res.status(200).json({type:'success',message:'ok',response:user,code:200})
    } else {
        res.status(204)
        throw new Error('user not found')
        //res.json({type:'error',message:'user not found',response:[],code:204})
    }
})

// get all users
const getUsers = asyncHandler(async(req,res) =>{
    const users = await User.find()
    res.status(200).json(users)
})

// delete  users
const deleteUser = asyncHandler(async(req,res) =>{
    const user = await User.findById(req.params.id)
    if(user) {
        user.remove()
        res.status(200).json({message:'User deleted'})
    } else {
        res.status(204)
        throw new Error('user not found')
    }
})
// get  user by id
const getUserById = asyncHandler(async(req,res) =>{
    const user = await User.findById(req.params.id).select('-password')
    if(user) {
        res.status(200).json(user)
    } else {
        res.status(204)
        throw new Error('user not found')
    }
})
// user update
const updateUser = asyncHandler(async(req,res) =>{
    const user = await User.findById(req.params.id)
    if(user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.isAdmin = req.body.isAdmin || user.isAdmin
        const updateUser = await user.save();
        let response = {}
        response._id = updateUser.id
        response.name = updateUser.name
        response.email = updateUser.email
        response.isAdmin = updateUser.isAdmin
        res.status(200).json(response)
    } else {
        res.status(204)
        throw new Error('user not found')
    }
})
export {
    loginUser,
    registerUser,
    profileUser,
    updateProfileUser,
    getUsers,
    deleteUser,
    getUserById,
    updateUser
}