import {USER_LOGIN_REQUEST,USER_LOGIN_SUCCESS,USER_LOGIN_FAIL, USER_LOGOUT,
    USER_REGISTER_REQUEST,USER_REGISTER_SUCCESS,USER_REGISTER_FAIL,
    USER_DETAILS_REQUEST,USER_DETAILS_SUCCESS,USER_DETAILS_FAIL,USER_DETAILS_RESET,
    USER_UPDATE_PROFILE_REQUEST,USER_UPDATE_PROFILE_SUCCESS, USER_UPDATE_PROFILE_FAIL,
    USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_LIST_FAIL,USER_LIST_RESET, USER_DELETE_REQUEST, USER_DELETE_SUCCESS, USER_DELETE_FAIL, 
    USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL} from '../../constant/userConstant';
import { ORDER_MY_LIST_RESET } from '../../constant/orderConstant';
import axios from 'axios';
export const login = (email,password) => async(dispatch) =>{
    try{
        // dispatch login request
        dispatch({
            type:USER_LOGIN_REQUEST
        })
        // config headers set
        const config= {
            headers:{
                contentType:'application/json'
            }
        }
        // login api call and dispatch success
        const { data } = await axios.post('/api/users/login',{email,password},config)
        console.log('user action data',data)
        dispatch({
            type:USER_LOGIN_SUCCESS,
            payload:data
        })
        // set userdata in local storage
        localStorage.setItem('userInfo',JSON.stringify(data))
    }catch(error){
        // login fail dispatch
        dispatch({
            type:USER_LOGIN_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message : error.message 
        })
    }
}

export const register = (name,email,password) => async(dispatch) =>{
    try{
        // dispatch login request
        dispatch({
            type:USER_REGISTER_REQUEST
        })
        // config headers set
        const config= {
            headers:{
                contentType:'application/json'
            }
        }
        // login api call and dispatch success
        const { data } = await axios.post('/api/users',{name,email,password},config)
        dispatch({
            type:USER_REGISTER_SUCCESS,
            payload:data
        })
        // set userdata in local storage
        localStorage.setItem('userInfo',JSON.stringify(data))
    }catch(error){
        // login fail dispatch
        dispatch({
            type:USER_REGISTER_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message : error.message 
        })
    }
}

export const getUserDetails = (id) => async(dispatch,getState) =>{
    try{
        console.log('id',id)
        // dispatch login request
        dispatch({
            type:USER_DETAILS_REQUEST,
        })
        
        // get userInfo for getState - localstorage
        const { userLogin : {userInfo} } = getState()
        // config headers set
        const config= {
            headers:{
                contentType:'application/json',
                Authorization: `Bareer ${userInfo.token}`
            }
        }
        // profile api call and dispatch success
        const { data } = await axios.get(`/api/users/${id}`,config)
        dispatch({
            type:USER_DETAILS_SUCCESS,
            payload:data
        })
    }catch(error){
        // user deatil fail dispatch
        dispatch({
            type:USER_DETAILS_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message : error.message 
        })
    }
}

export const updateUserProfile = (user) => async(dispatch,getState) =>{
    try{
        // dispatch update request
        dispatch({
            type:USER_UPDATE_PROFILE_REQUEST,
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
        const { data } = await axios.put(`/api/users/profile`,user,config)
        dispatch({
            type:USER_UPDATE_PROFILE_SUCCESS,
            payload:data
        })
        // update login user data
        dispatch({
            type:USER_LOGIN_SUCCESS,
            payload:data
        })
        // localstorage set updated use data
        localStorage.setItem('userInfo',JSON.stringify(data))

    }catch(error){
        // user deatil fail dispatch
        dispatch({
            type:USER_UPDATE_PROFILE_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message : error.message 
        })
    }
}
export const listUsers = () => async(dispatch,getState) =>{
    try{
        // dispatch userlist request
        dispatch({
            type:USER_LIST_REQUEST,
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
        // users api call and dispatch success
        const { data } = await axios.get(`/api/users`,config)
        dispatch({
            type:USER_LIST_SUCCESS,
            payload:data
        })
    }catch(error){
        // users fail dispatch
        dispatch({
            type:USER_LIST_FAIL,
           payload:error.response && error.response.data.message ? error.response.data.message : error.message 
        })
    }
}
export const deleteUser = (id) => async(dispatch,getState) =>{
    try{
        // dispatch userlist request
        dispatch({
            type:USER_DELETE_REQUEST,
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
        const { data } = await axios.delete(`/api/users/${id}`,config)
        dispatch({
            type:USER_DELETE_SUCCESS
        })
    }catch(error){
        // user delete fail dispatch
        dispatch({
            type:USER_DELETE_FAIL,
           payload:error.response && error.response.data.message ? error.response.data.message : error.message 
        })
    }
}
export const updateUser = (user) => async(dispatch,getState) =>{
    try{
        // dispatch update request
        dispatch({
            type:USER_UPDATE_REQUEST,
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
        const { data } = await axios.put(`/api/users/${user._id}`,user,config)
        dispatch({
            type:USER_UPDATE_SUCCESS
        })
        dispatch({
            type:USER_DETAILS_SUCCESS,
            payload:data
        })
    }catch(error){
        // user deatil fail dispatch
        dispatch({
            type:USER_UPDATE_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message : error.message 
        })
    }
}
export const logout = () => (dispatch) =>{
    localStorage.removeItem('userInfo')
    dispatch({type:USER_LOGOUT})
    dispatch({type:USER_DETAILS_RESET})
    dispatch({type:ORDER_MY_LIST_RESET})
    dispatch({type:USER_LIST_RESET})
} 