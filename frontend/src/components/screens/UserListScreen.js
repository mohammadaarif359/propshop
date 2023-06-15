import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Table,Button} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import { listUsers,deleteUser } from '../../state/actions/userActions'
import Loader from '../Loader'
import Message from '../Message'

const UserListScreen = ({history}) => {
  const dispatch = useDispatch()

  // get userList for user reducer
  const userList = useSelector(state =>state.userList)
  const {loading,error,users} = userList
  console.log('users',users)

  // get userDelete for user reducer
  const userDelete = useSelector(state =>state.userDelete)
  const {success:successDelete} = userDelete

  // get logged in userinfo from user reducer
  const userLogin = useSelector(state =>state.userLogin)
  const {userInfo} = userLogin

  // dispatch the listUsers data action
  useEffect(() => {
      if(userInfo && userInfo.isAdmin) {
        dispatch(listUsers())
      } else {
        history.push('/login')
      }
  }, [dispatch,history,successDelete])

  // deleteHandler
  const deleteHandler = (id) => {
      if(window.confirm('Are You Sure')) {
        dispatch(deleteUser(id))
      }
  }
  return (
    <>
        <h1>User</h1>
        {loading ? <Loader/> : error ? <Message type='danger' message={error}/> :(
            <Table striped bordered hover responsive className='table-sm'>
                <thead>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>EMAIL</th>
                    <th>ADMIN</th>
                    <th></th>
                </thead>
                <tbody>
                    {users.map((user)=>(
                        <tr key={user._id}>
                            <td>{user.name}</td>
                            <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                            <td>{user.isAdmin ? (
                                <i className='fas fa-check' style={{color:'green'}}></i>) : (
                                <i className='fas fa-times' style={{color:'red'}}></i>    
                                )}</td>
                            <td>
                                <Link to={`/admin/user/${user._id}/edit`}>
                                    <Button variant='light' className='btn-sm'>
                                        <i className='fas fa-edit'></i>
                                    </Button>
                                </Link>
                                <Button variant='danger' className='btn-sm' onClick={()=>deleteHandler(user._id)}>
                                <i className='fas fa-trash'></i>
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>

            </Table>
        )}
    </>
  )
}

export default UserListScreen