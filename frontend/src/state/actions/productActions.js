import axios  from 'axios'
import {PRODUCT_LIST_REQUEST,PRODUCT_LIST_SUCCESS,PRODUCT_LIST_FAIL,
        PRODUCT_DETAILS_REQUEST,PRODUCT_DETAILS_SUCCESS,PRODUCT_DETAILS_FAIL,
        PRODUCT_DELETE_REQUEST,PRODUCT_DELETE_SUCCESS,PRODUCT_DELETE_FAIL,
        PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_FAIL, PRODUCT_CREATE_SUCCESS,
        PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_SUCCESS, PRODUCT_UPDATE_FAIL,
        PRODUCT_CREATE_REVIEW_FAIL, PRODUCT_CREATE_REVIEW_SUCCESS, PRODUCT_CREATE_REVIEW_REQUEST,
        PRODUCT_TOP_REQUEST, PRODUCT_TOP_SUCCESS, PRODUCT_TOP_FAIL} from '../../constant/productConstant'

export const listProducts = (keyword='',pageNum='') => async(dispatch) => {
    try{
        // product list request dispatch
        dispatch({type:PRODUCT_LIST_REQUEST})

        // product list get and success dispatch 
        const res = await axios.get(`/api/products?keyword=${keyword}&pageNum=${pageNum}`)
        dispatch({type:PRODUCT_LIST_SUCCESS,payload:res.data})
    
    } catch(error){
        // product list fail dispatch
        dispatch({
            type:PRODUCT_LIST_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message : error.message 
        })
    }
}

export const listProductDetails = (id) => async(dispatch) => {
    try{
        // product list request dispatch
        dispatch({type:PRODUCT_DETAILS_REQUEST})

        // product list get and success dispatch 
        const res = await axios.get(`/api/products/${id}`)
        dispatch({type:PRODUCT_DETAILS_SUCCESS,payload:res.data})
    
    } catch(error){
        // product list fail dispatch
        dispatch({
            type:PRODUCT_DETAILS_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message : error.message 
        })
    }
}
export const deleteProduct = (id) => async(dispatch,getState) =>{
    try{
        // dispatch product delete request
        dispatch({
            type:PRODUCT_DELETE_REQUEST,
        })
        
        // get userInfo for getState - localstorage
        const { userLogin : {userInfo} } = getState()
        console.log('userInfo',userInfo)
        // config headers set
        const config= {
            headers:{
                contentType:'application/json',
                Authorization: `Bareer ${userInfo.token}`
            }
        }
        // users delete api call and dispatch success
        await axios.delete(`/api/products/${id}`,config)
        dispatch({
            type:PRODUCT_DELETE_SUCCESS
        })
    }catch(error){
        // user delete fail dispatch
        dispatch({
            type:PRODUCT_DELETE_FAIL,
           payload:error.response && error.response.data.message ? error.response.data.message : error.message 
        })
    }
}
export const createProduct = () => async(dispatch,getState) =>{
    try{
        // dispatch product create request
        dispatch({
            type:PRODUCT_CREATE_REQUEST,
        })
        
        // get userInfo for getState - localstorage
        const { userLogin : {userInfo} } = getState()
        console.log('userInfo',userInfo)
        // config headers set
        const config= {
            headers:{
                contentType:'application/json',
                Authorization: `Bareer ${userInfo.token}`
            }
        }
        // users  api call and dispatch success
        const { data } = await axios.post(`/api/products`,{},config)
        dispatch({
            type:PRODUCT_CREATE_SUCCESS
        })
    }catch(error){
        // product create fail dispatch
        dispatch({
            type:PRODUCT_CREATE_FAIL,
           payload:error.response && error.response.data.message ? error.response.data.message : error.message 
        })
    }
}
export const updateProduct = (product) => async(dispatch,getState) =>{
    try{
        // dispatch product update request
        dispatch({
            type:PRODUCT_UPDATE_REQUEST,
        })
        
        // get userInfo for getState - localstorage
        const { userLogin : {userInfo} } = getState()
        console.log('userInfo',userInfo)
        // config headers set
        const config= {
            headers:{
                contentType:'application/json',
                Authorization: `Bareer ${userInfo.token}`
            }
        }
        // users  api call and dispatch success
        const { data } = await axios.put(`/api/products/${product._id}`,product,config)
        dispatch({
            type:PRODUCT_UPDATE_SUCCESS,
            payload:data
        })
    }catch(error){
        // product update fail dispatch
        dispatch({
            type:PRODUCT_UPDATE_FAIL,
           payload:error.response && error.response.data.message ? error.response.data.message : error.message 
        })
    }
}
export const createProductReview = (productId,review) => async(dispatch,getState) =>{
    try{
        // dispatch product create review request
        dispatch({
            type:PRODUCT_CREATE_REVIEW_REQUEST,
        })
        
        // get userInfo for getState - localstorage
        const { userLogin : {userInfo} } = getState()
        console.log('userInfo',userInfo)
        // config headers set
        const config= {
            headers:{
                contentType:'application/json',
                Authorization: `Bareer ${userInfo.token}`
            }
        }
        // product review create  api call and dispatch success
        const { data } = await axios.post(`/api/products/${productId}/reviews`,review,config)
        dispatch({
            type:PRODUCT_CREATE_REVIEW_SUCCESS
        })
    }catch(error){
        // product review create fail dispatch
        dispatch({
            type:PRODUCT_CREATE_REVIEW_FAIL,
           payload:error.response && error.response.data.message ? error.response.data.message : error.message 
        })
    }
}
export const listTopProducts = () => async(dispatch) => {
    console.log('top rated action')
    try{
        // product list request dispatch
        dispatch({type:PRODUCT_TOP_REQUEST})

        // product list get and success dispatch 
        const res = await axios.get(`/api/products/top`)
        dispatch({type:PRODUCT_TOP_SUCCESS,payload:res.data})
    
    } catch(error){
        // product list fail dispatch
        dispatch({
            type:PRODUCT_TOP_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message : error.message 
        })
    }
}