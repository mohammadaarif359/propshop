import React,{useState,useEffect} from 'react'
import {PayPalButton} from 'react-paypal-button-v2'
import axios from 'axios'
import {Button,Row,Col,ListGroup,Image,Card} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import { getOrderDetails,payOrder,deliverOrder } from '../../state/actions/orderActions'
import Message from '../Message'
import Loader from '../Loader'
import { ORDER_DELIVER_RESET, ORDER_PAY_RESET } from '../../constant/orderConstant'

const OrderScreen = ({match,history}) => {
    const orderId = match.params.id

    const [sdkReady, setSdkReady] = useState(false)

    // get order details from order reducer
    const orderDetails = useSelector(state=>state.orderDetails)
    const {order,loading,error} = orderDetails
    console.log('order data',order)
    
    // get payment details from order reducer
    const orderPay = useSelector(state=>state.orderPay)
    const {loading:loadingPay,success:successPay} = orderPay

    // update devliered from order reducer
    const orderDeliver = useSelector(state=>state.orderDeliver)
    const {loading:loadingDeliver,success:successDeliver} = orderDeliver

    // get userInfo details from login user reducer
    const userLogin = useSelector(state=>state.userLogin)
    const {userInfo} = userLogin
    
    const dispatch = useDispatch()
    useEffect(() => {
        if(!userInfo) {
            history.push('/login')
        }
        // add paypal script
        const addPaypalScript = async() =>{
            const {data:clientId} = await axios.get('/api/config/paypal');
            console.log('clientId',clientId)
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true
            script.onload = () =>{
                setSdkReady(true)
            }
            console.log('script sdkReady',sdkReady)
            document.body.appendChild(script)
        }
        if(!order || successPay || successDeliver) {
            dispatch({type:ORDER_PAY_RESET})
            dispatch({type:ORDER_DELIVER_RESET})
            dispatch(getOrderDetails(orderId))
        } else if(!order.isPaid) {
            if(!window.paypal) {
                addPaypalScript()
            } else {
                setSdkReady(true)
                console.log('in dispatch sdkReady',sdkReady)
            }
        }
    }, [dispatch,history,orderId,order,successPay,successDeliver]) 
    
    // success payment handler
    const successPaymentHandler = (paymentResult) =>{
        console.log('paymentResult',paymentResult)
        dispatch(payOrder(orderId,paymentResult))
    }
    // deliver handler
    const deliverHandler = (order) => {
        dispatch(deliverOrder(order))
    }
  return loading ? <Loader/> : error ? <Message type='danger' message={error}/> :
        <>    
        <Row>
            <Col md={8}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Shipping</h2>
                            <p><strong>Name :</strong> {order.user_id.name}</p>
                            <p><strong>Email :</strong><a href={`mailto:${order.user_id.email}`}>{order.user_id.email}</a></p>
                            <p>
                            <strong>Address</strong>
                            {order.shippingAddress.address},{order.shippingAddress.city},{order.shippingAddress.postalCode},{order.shippingAddress.country}
                            {order.isDelivered ? (
                          <Message type='success' message={`Delivered on ${order.deliveredAt}`}/>  
                            ) : (
                                <Message type='danger' message='Not Delivered'/>  
                            )}
                        </p>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h2>Payment Method</h2>
                        <p>
                            <strong>Method: </strong>
                            {order.paymentMethod}
                        </p>
                        {order.isPaid ? (
                          <Message type='success' message={`Paid on ${order.paidAt}`}/>  
                        ) : (
                            <Message type='danger' message='Not Paid'/>  
                        )}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h2>order Items</h2>
                        <ListGroup variant='flush'>
                            {order.orderItems.map((item,index)=>(
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
                                <Col>${order.itemsPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Shipping</Col>
                                <Col>${order.shippingPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Tax</Col>
                                <Col>${order.taxPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Total</Col>
                                <Col>${order.totalPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        {userInfo && !userInfo.isAdmin && !order.isPaid && (
                            <ListGroup.Item>
                            {!sdkReady ? <Loader/> : (
                                <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler}/>
                            )}
                            </ListGroup.Item>
                        )}
                        {loadingDeliver && <Loader/>}
                        {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                            <ListGroup.Item>
                                <Button className='btn btn-block' onClick={()=>{deliverHandler(order)}}>Mark As Delivered</Button>
                            </ListGroup.Item>
                        )}
                    </ListGroup>
                </Card>
            </Col>
        </Row>
        </>
}

export default OrderScreen