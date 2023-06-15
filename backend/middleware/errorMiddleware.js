// url not found
const notFound = (req,res,next) =>{
    const error = new Error(`Not found - ${req.originUrl}`)
    res.status(404)
    next(error)
}

// error handle
const errorHandle = (err,req,res,next) =>{
    console.log('in handle error')
    console.log('err',err);
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode)
    res.json({
        message:err.message,
        stack:process.env.NODE_ENV === 'production' ? null : err.stack
    })
}

export {
    notFound,
    errorHandle
}