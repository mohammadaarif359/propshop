import {ADD_CART_ITEM,REMOVE_CART_ITEM,SAVE_CART_SHIPPING_ADDRESS,SAVE_CART_PAYMENT_METHOD} from '../../constant/cartConstant'

export const cartReducer = (state={ cartItems:[],shippingAddress:{} },action) => {
    switch(action.type) {
        case ADD_CART_ITEM:
            // qty item
            const item = action.payload

            // get item exits
            const itemExits = state.cartItems.find(x => x.product === item.product)
            if(itemExits) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(x=> x.product === itemExits.product ? item : x)
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems,item]
                }
            }
        case REMOVE_CART_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter(x =>x.product !== action.payload)
            }
        case SAVE_CART_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress: action.payload
            }
        case SAVE_CART_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod: action.payload
            }
        default:
            return state
    }
}