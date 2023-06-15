import {ORDER_CREATE_REQUEST,ORDER_CREATE_SUCCESS,ORDER_CREATE_FAIL,
    ORDER_DETAILS_REQUEST,ORDER_DETAILS_SUCCESS,ORDER_DETAILS_FAIL,
    ORDER_PAY_REQUEST,ORDER_PAY_SUCCESS,ORDER_PAY_FAIL,
    ORDER_MY_LIST_REQUEST, ORDER_MY_LIST_SUCCESS, ORDER_MY_LIST_FAIL, ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS, ORDER_LIST_FAIL,
    ORDER_DELIVER_REQUEST,ORDER_DELIVER_SUCCESS, ORDER_DELIVER_FAIL} from '../../constant/orderConstant'
import axios from 'axios'

export const createorder = (order) => async(dispatch,getState) =>{
    try{
        // dispatch update request
        dispatch({
            type:ORDER_CREATE_REQUEST,
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
        // profile api call and dispatch success
        const { data } = await axios.post(`/api/orders`,order,config)
        dispatch({
            type:ORDER_CREATE_SUCCESS,
            payload:data
        })
    }catch(error){
        // user deatil fail dispatch
        dispatch({
            type:ORDER_CREATE_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message : error.message 
        })
    }
}
export const getOrderDetails = (id) => async(dispatch,getState) =>{
    try{
        // dispatch get request
        dispatch({
            type:ORDER_DETAILS_REQUEST,
        })
        
        // get userInfo for getState - localstorage
        const { userLogin : {userInfo} } = getState()
        console.log('userInfo',userInfo)
        // config headers set
        const config= {
            headers:{
                //contentType:'application/json',
                Authorization: `Bareer ${userInfo.token}`
            }
        }
        // get order api call and dispatch success
        const { data } = await axios.get(`/api/orders/${id}`,config)
        console.log('order data action',data)
        dispatch({
            type:ORDER_DETAILS_SUCCESS,
            payload:data
        })
    }catch(error){
        // order deatil fail dispatch
        dispatch({
            type:ORDER_DETAILS_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message : error.message 
        })
    }
}
export const payOrder = (orderId,paymentResult) => async(dispatch,getState) =>{
    try{
        // dispatch put request
        dispatch({
            type:ORDER_PAY_REQUEST,
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
        // put order pay api call and dispatch success
        const { data } = await axios.put(`/api/orders/${orderId}/pay`,paymentResult,config)
        console.log('data',data)
        dispatch({
            type:ORDER_PAY_SUCCESS,
            payload:data
        })
    }catch(error){
        // order deatil fail dispatch
        dispatch({
            type:ORDER_PAY_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message : error.message 
        })
    }
}
export const deliverOrder = (order) => async(dispatch,getState) =>{
    try{
        // dispatch put request
        dispatch({
            type:ORDER_DELIVER_REQUEST,
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
        // put order pay api call and dispatch success
        const { data } = await axios.put(`/api/orders/${order._id}/deliver`,{},config)
        console.log('data',data)
        dispatch({
            type:ORDER_DELIVER_SUCCESS,
            payload:data
        })
    }catch(error){
        // order deatil fail dispatch
        dispatch({
            type:ORDER_DELIVER_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message : error.message 
        })
    }
}
export const listMyOrders = () => async(dispatch,getState) =>{
    try{
        // dispatch get request
        dispatch({
            type:ORDER_MY_LIST_REQUEST,
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
        // get my orders api call and dispatch success
        const { data } = await axios.get(`/api/orders/myorders`,config)
        console.log('data',data)
        dispatch({
            type:ORDER_MY_LIST_SUCCESS,
            payload:data
        })
    }catch(error){
        // order deatil fail dispatch
        dispatch({
            type:ORDER_MY_LIST_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message : error.message 
        })
    }
}
export const listOrders = () => async(dispatch,getState) =>{
    try{
        // dispatch get request
        dispatch({
            type:ORDER_LIST_REQUEST,
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
        // get orders api call and dispatch success
        const { data } = await axios.get(`/api/orders`,config)
        console.log('data',data)
        dispatch({
            type:ORDER_LIST_SUCCESS,
            payload:data
        })
    }catch(error){
        // order fail dispatch
        dispatch({
            type:ORDER_LIST_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message : error.message 
        })
    }
}