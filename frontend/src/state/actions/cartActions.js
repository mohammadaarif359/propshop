import {ADD_CART_ITEM,REMOVE_CART_ITEM,SAVE_CART_SHIPPING_ADDRESS,SAVE_CART_PAYMENT_METHOD} from '../../constant/cartConstant'
import axios from 'axios'

export const AddToCart = (id,qty) => async(dispatch,getState)=> {
    // get product data by id
    const { data } = await axios.get(`/api/products/${id}`);
    dispatch({
        type:ADD_CART_ITEM,
        payload:{
            product:data._id,
            name:data.name,
            image:data.image,
            price:data.price,
            countInStock:data.countInStock,
            qty:qty
        }
    })

    // save into localstorage
    localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))
}
export const RemoveFromCart = (id) => async(dispatch,getState)=> {
    dispatch({
        type:REMOVE_CART_ITEM,
        payload:id
    })
    // save into localstorage
    localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))
}
export const SaveShippingAddress = (data) => async(dispatch)=> {
    dispatch({
        type:SAVE_CART_SHIPPING_ADDRESS,
        payload:data
    })
    // save into localstorage
    localStorage.setItem('shippingAddress',JSON.stringify(data))
}
export const SavePaymentMethod = (data) => async(dispatch)=> {
    dispatch({
        type:SAVE_CART_PAYMENT_METHOD,
        payload:data
    })
    // save into localstorage
    localStorage.setItem('paymentMethod',JSON.stringify(data))
}

