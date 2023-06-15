import path from 'path'
import morgan from 'morgan';
import express, { response } from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js';
import products from './data/products.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import {notFound,errorHandle} from './middleware/errorMiddleware.js'
import helmet from "helmet";

dotenv.config();

connectDB()

const app = express();
app.use(helmet())

if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.use(express.json())

/*app.get('/',(req,res)=>{
    res.send('Api is running..')
})*/

// product routes
app.use('/api/products',productRoutes)

// user routes
app.use('/api/users',userRoutes)

// order routes
app.use('/api/orders',orderRoutes)


// upload routes
app.use('/api/upload',uploadRoutes)

// paypal cliet id
app.get('/api/config/paypal',(req,res)=>
    res.send(process.env.PAYPAL_CLIENT_ID)
)
// upload folder
const __dirname = path.resolve()
app.use('/uploads',express.static(path.join(__dirname,'/uploads')))

// create static frontend build folder
if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname,'/frontend/build')))
    app.get('*',(req,res) =>res.sendFile(path.resolve(__dirname,'frontend','build','index.html')))
} else {
    app.get('/',(req,res)=>{
        res.send('Api is running..')
    })
}

// eror url not found
app.use(notFound)

// error handler route 
app.use(errorHandle)

const PORT = process.env.PORT;


app.listen(PORT, console.log(`Server running in  ${process.env.NODE_ENV} mode on port ${PORT}`))