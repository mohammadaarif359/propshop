import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Form,Row,Button} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import { getUserDetails,updateUser } from '../../state/actions/userActions'
import FormContainer from '../FormContainer'
import Loader from '../Loader'
import Message from '../Message'
import { USER_UPDATE_RESET } from '../../constant/userConstant'

const UserEditScreen  = ({match,history}) => {
    const userId = match.params.id
    // set state
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin,setIsAdmin] = useState(false)

    
    // dispatch
    const dispatch = useDispatch()
    // fetch useDetails store
    const userDetails = useSelector(state => state.userDetails)
    const {loading,error,user} = userDetails

    // updateuse store
    const userUpdate = useSelector(state => state.userUpdate)
    const {loading:loadingUpdate,error:errorUpdate,success:successUpdate} = userUpdate
    
    // useeffect for redirect to home if alreay login
    useEffect(() => {
        if(successUpdate) {
            dispatch({type:USER_UPDATE_RESET})
            history.push('/admin/userlist')
        } else {
            if(!user.name || userId !== user._id) {
                dispatch(getUserDetails(userId))
            } else {
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }
    }, [dispatch,history,user,userId,successUpdate])
    

    // submit handle
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateUser({_id:userId,name,email,isAdmin}))
        
    }
    return (
        <>
        <Link to='/admin/userlist' className='btn btn-light my-3'>Go Back</Link>
        <FormContainer>
            <h1>Edit User</h1>
            {loadingUpdate && <Loader/>}
            {errorUpdate && <Message type='danger' message={errorUpdate}/>}
            {loading ? <Loader/> : error ? <Message type='danger' message={error}/> : (
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type='name' name='name' value={name} onChange={(e)=>setName(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type='email' name='email' value={email} onChange={(e)=>setEmail(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId = 'isAdmin'>
                    <Form.Check type='checkbox' label='Is Admin' name='isAdmin' checked={isAdmin} onChange={(e)=>setIsAdmin(e.target.checked)}></Form.Check>
                </Form.Group>
                <Button type='submit' varaint='primary' className='my-2'>Update</Button>
            </Form>
            )}
        </FormContainer>
        </>
    )
}

export default UserEditScreen