import { createStore,combineReducers,applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productListReducer,productDetailsReducer,productDeleteReducer,productCreateReducer,productUpdateReducer,productCreateReviewReducer,productTopRatedReducer } from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'
import {userLoginReducer,userRegisterReducer,userDetailsReducer,userProfileUpdateReducer,userListReducer,userDeleteReducer,userUpdateReducer} from './reducers/userReducers'
import {orderCreateReducer,orderDetailsReducer,orderPayReducer,orderListMyReducer,orderListReducer,orderDeliverReducer} from './reducers/orderReducers'
// for create empty object of combineReducers
const reducer = combineReducers({
    productList:productListReducer,
    productDetails:productDetailsReducer,
    productDelete:productDeleteReducer,
    productCreate:productCreateReducer,
    productUpdate:productUpdateReducer,
    productCreateReview:productCreateReviewReducer,
    productTopRated:productTopRatedReducer,
    cart:cartReducer,
    userLogin:userLoginReducer,
    userRegister:userRegisterReducer,
    userDetails:userDetailsReducer,
    userProfileUpdate:userProfileUpdateReducer,
    userList:userListReducer,
    userDelete:userDeleteReducer,
    userUpdate:userUpdateReducer,
    orderCreate:orderCreateReducer,
    orderDetails:orderDetailsReducer,
    orderPay:orderPayReducer,
    orderDeliver:orderDeliverReducer,
    orderListMy:orderListMyReducer,
    orderList:orderListReducer
})

// get localstoragecart item and if not exits set empty
const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];

// get localstorageuserinfoand if not exits set null
const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

// get shippingaddress and if not exits set null
const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {};

// for whole store/app inital state
const initalState = {
    cart:{cartItems:cartItemsFromStorage,shippingAddress:shippingAddressFromStorage},
    userLogin:{userInfo:userInfoFromStorage}
}

// for api call use in redux by thunk - async await
const middleware = [thunk]

// for create store 
const store = createStore(
    reducer,
    initalState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store;