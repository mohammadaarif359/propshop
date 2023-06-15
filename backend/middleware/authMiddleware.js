import jwt from 'jsonwebtoken'
import User from  '../models/userModel.js'

const protect = async(req,res,next) =>{
    console.log('middleware');
    if(req.headers.authorization && req.headers.authorization.startsWith('Bareer')) {
        try{
            let token  = req.headers.authorization.split(' ')[1];
            let decodeData = jwt.verify(token,process.env.JWT_SECRET);
            req.user = await User.findById(decodeData.id).select('-password');
            next()
        }catch(error) {
            res.json({type:"error",message:"Un-Authorized user access",code:403})
        }
    } else {
        res.json({type:"error",message:"Un Authorized acesss",code:403})
    }
}
const admin = (req,res,next) =>{
    if(req.user && req.user.isAdmin) {
        next()
    } else {
        res.json({type:"error",message:"Not authorized as an admin",code:403})
    }
}
export {protect,admin}