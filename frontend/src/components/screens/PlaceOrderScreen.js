import React,{useState,useEffect} from 'react'
import {Button,Row,Col,ListGroup,Image,Card} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import { SaveShippingAddress } from '../../state/actions/cartActions'
import { createorder } from '../../state/actions/orderActions'
import CheckoutSteps from '../CheckoutSteps'
import Message from '../Message'

const PlaceOrderScreen = ({history}) => {
    const dispatch = useDispatch()

    // get cart data from cart reducer
    const cart = useSelector(state=>state.cart)
    console.log('shippingAddress',cart.shippingAddress)
    console.log('paymentMethod',cart)

    // get createorder from order reducer
    const orderCreate = useSelector(state=>state.orderCreate)
    const {order,success,error} = orderCreate


    // decimal value
    const addDecimals = (num) =>{
        return (Math.round(num * 100) / 100).toFixed(2)
    }

    // check success order and redirect
    useEffect(() => {
       if(success) {
           history.push(`/order/${order._id}`)
       }
       // eslint-disable-next-line
    }, [history,success])
    
    // calculate price
    cart.itemsPrice = addDecimals(cart.cartItems.reduce((acc,item)=> acc + item.qty * item.price,0))
    // calculate shipping
    cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 10)
    // calculate shipping
    cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)))
    //calculate totalprice
    cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2)
    const placeOrderHandle = () =>{
        console.log('place order')
        dispatch(createorder({
            orderItems:cart.cartItems,
            shippingAddress:cart.shippingAddress,
            paymentMethod:cart.paymentMethod,
            itemsPrice:cart.itemsPrice,
            shippingPrice:cart.shippingPrice,
            taxPrice:cart.taxPrice,
            totalPrice:cart.totalPrice

        }))
    }
  return (
    <>
        <CheckoutSteps step1 step2 step3 step4/>
        <Row>
            <Col md={8}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Shipping</h2>
                        <p>
                            <strong>Address</strong>
                            {cart.shippingAddress.address},{cart.shippingAddress.city},{cart.shippingAddress.postalCode},{cart.shippingAddress.country}
                        </p>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h2>Payment Method</h2>
                        <p>
                            <strong>Method: </strong>
                            {cart.paymentMethod}
                        </p>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h2>order Items</h2>
                        <ListGroup variant='flush'>
                            {cart.cartItems.map((item,index)=>(
                                <ListGroup.Item key={index}>
                                    <Row>
                                        <Col md={2}>
                                            <Image src={item.image} alt={item.name} fluid rounded/>
                                        </Col>
                                        <Col>
                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                        </Col>
                                        <Col md={4}>
                                            {item.qty} * ${item.price} = ${item.qty * item.price}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </ListGroup.Item>
                </ListGroup>
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup>
                        <ListGroup.Item>
                            <h2>Order Summary</h2>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Items</Col>
                                <Col>${cart.itemsPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Shipping</Col>
                                <Col>${cart.shippingPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Tax</Col>
                                <Col>${cart.taxPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Total</Col>
                                <Col>${cart.totalPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            {error && <Message type='danger' message={error}/>}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button type='button' className='btn-block w-75' disabled={cart.cartItems === 0} onClick={placeOrderHandle}>Place Order</Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    </>
  )
}

export default PlaceOrderScreen