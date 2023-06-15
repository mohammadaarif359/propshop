import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Form,Row,Col,Button, Table} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import { getUserDetails,updateUserProfile } from '../../state/actions/userActions'
import { listMyOrders } from '../../state/actions/orderActions'
import FormContainer from '../FormContainer'
import Loader from '../Loader'
import Message from '../Message'
import {USER_UPDATE_PROFILE_RESET} from '../../constant/userConstant'

const ProfileScreen  = ({location,history}) => {
    // set state
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message,setMessage] = useState(null)

    // dispatch
    const dispatch = useDispatch()
    
    // fetch userlogin store
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    // fetch userdetails store
    const userDetails = useSelector(state => state.userDetails)
    const {loading,error,user} = userDetails

    // fetch userupdate store
    const userProfileUpdate = useSelector(state => state.userProfileUpdate)
    const {success} = userProfileUpdate

    // fetch orderListMy store
    const orderListMy = useSelector(state => state.orderListMy)
    const {loading:loadingOrders,error:errorOrders,orders} = orderListMy
    
    // useeffect for redirect to home if alreay login
    useEffect(() => {
        if(!userInfo) {
            history.push('/login')
        } else {
            if(!user.name || success) {
                dispatch({type:USER_UPDATE_PROFILE_RESET})
                dispatch(getUserDetails('profile'))
                dispatch(listMyOrders())
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [history,userInfo,user,success])
    

    // submit handle
    const handleSubmit = (e) => {
        e.preventDefault();
        //dispatch action login to userAction for register api
        if(password !== confirmPassword) {
            setMessage('password dont match')
        } else {
            dispatch(updateUserProfile({id:user._id,name,email,password}))
        }
    }
    return (
        <Row>
            <Col md={3}>
                <h2>User Profile</h2>
                {loading && <Loader/>}
                {message && <Message type='danger' message={message}/>}
                {error && <Message type='danger' message={error}/>}
                {success && <Message type='success' message='Profile Updated!'/>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type='name' name='name' value={name} onChange={(e)=>setName(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='email'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type='email' name='email' value={email} onChange={(e)=>setEmail(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId = 'password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' name='password' value={password} onChange={(e)=>setPassword(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId = 'confirmPassword'>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type='password' name='confirmPassword' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Button type='submit' varaint='primary' className='my-2'>Update</Button>
                </Form>
            </Col>
            <Col md={9}>
                <h2>My Orders</h2>
                {loadingOrders ? <Loader/> : errorOrders ? <Message type='danger' message={errorOrders}/> : (
                    <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>DATE</th>
                                <th>TOTAL</th>
                                <th>PAID</th>
                                <th>DELIVERED</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order =>(
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.createdAt.substring(0,10)}</td>
                                    <td>{order.totalPrice}</td>
                                    <td>{order.isPaid ? order.paidAt.substring(0,10) : (
                                        <i className='fas fa-times' style={{color:'red'}}></i>
                                    )}</td>
                                    <td>{order.isDelivered ? order.deliveredAt.substring(0,10) : (
                                        <i className='fas fa-times' style={{color:'red'}}></i>
                                    )}</td>
                                    <td>{order.isDelivered}</td>
                                    <td>
                                        <Link to={`/order/${order._id}`}>
                                            <Button className='btn-sm' variant='light'>Details</Button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </Col>    
        </Row>
    )
}

export default ProfileScreen