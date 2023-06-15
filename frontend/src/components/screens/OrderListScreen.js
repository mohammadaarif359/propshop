import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Table,Button} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import { listOrders } from '../../state/actions/orderActions'
import Loader from '../Loader'
import Message from '../Message'

const OrderListScreen = ({history}) => {
  const dispatch = useDispatch()

  // get userList for user reducer
  const orderList = useSelector(state =>state.orderList)
  const {loading,error,orders} = orderList
  console.log('orders',orders)

  // get logged in userinfo from user reducer
  const userLogin = useSelector(state =>state.userLogin)
  const {userInfo} = userLogin

  // dispatch the listUsers data action
  useEffect(() => {
      if(userInfo && userInfo.isAdmin) {
        dispatch(listOrders())
      } else {
        history.push('/login')
      }
  }, [dispatch,history,userInfo])

  return (
    <>
        <h1>Order</h1>
        {loading ? <Loader/> : error ? <Message type='danger' message={error}/> :(
            <Table striped bordered hover responsive className='table-sm'>
                <thead>
                    <th>ID</th>
                    <th>USER</th>
                    <th>DATE</th>
                    <th>TOTAL PRICE</th>
                    <th>PAID</th>
                    <th>DELIVERED</th>
                    <th></th>
                </thead>
                <tbody>
                    {orders.map((order)=>(
                        <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.user_id && order.user_id.name}</td>
                            <td>{order.createdAt.substring(0,10)}</td>
                            <td>{order.totalPrice}</td>
                            <td>{order.isPaid ? (
                                order.paidAt.substring(0,10)
                                ) : (
                                <i className='fas fa-times' style={{color:'red'}}></i>    
                                )}
                            </td>
                            <td>{order.isDelivered ? (
                                order.deliveredAt.substring(0,10)
                                ) : (
                                <i className='fas fa-times' style={{color:'red'}}></i>    
                                )}
                            </td>
                            <td>
                                <Link to={`/order/${order._id}`}>
                                    <Button variant='light' className='btn-sm'>
                                        Details
                                    </Button>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>

            </Table>
        )}
    </>
  )
}

export default OrderListScreen