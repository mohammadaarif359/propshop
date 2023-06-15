import mongoose from 'mongoose'
import dotenv from 'dotenv'
import users from './data/users.js'
import products from './data/products.js'
import User from './models/userModel.js'
import Product from './models/productModel.js'
import Order from './models/orderModel.js'
import connectDB from './config/db.js'

dotenv.config()
connectDB()

const destroyData = async() =>{
    try{  
        // delete all user,product and order data  
        await User.deleteMany()
        await Product.deleteMany()
        await Order.deleteMany()

        console.log('data destroy');
        process.exit()

    }catch(error) {
        console.log(`${error}`);
        process.exit()
    }
}

const importData = async() =>{
    try{  
        // insert smaple user
        const sampleUsers = await User.insertMany(users)
        // get admin user id that insert by sample user data
        const AdminUserId = sampleUsers[0]._id;

        // insert sample product
        const sampleProducts = products.map(product => {
            return {...product,user_id:AdminUserId}
        })
        await Product.insertMany(sampleProducts);
        console.log('data imported');
        process.exit()

    }catch(error) {
        console.log(`${error}`);
        process.exit()
    }
}

if(process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}