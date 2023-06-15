import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Form,Row,Col,Button} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import { register } from '../../state/actions/userActions'
import FormContainer from '../FormContainer'
import Loader from '../Loader'
import Message from '../Message'

const RegisterScreen  = ({location,history}) => {
    // set state
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message,setMessage] = useState(null)

    // redirect set after login / register
    const redirect = location.search ? location.search.split('=')[1] : '';

    // dispatch
    const dispatch = useDispatch()
    // fetch userLogin store
    const userRegister = useSelector(state => state.userRegister)
    const {loading,error,userInfo} = userRegister
    
    // useeffect for redirect to home if alreay login
    useEffect(() => {
        if(userInfo) {
            history.push(redirect)
        }
    }, [history,userInfo,redirect])
    

    // submit handle
    const handleSubmit = (e) => {
        e.preventDefault();
        //dispatch action login to userAction for register api
        if(password !== confirmPassword) {
            setMessage('password dont match')
        } else {
            dispatch(register(name,email,password))
        }
    }
    return (
        <FormContainer>
            <h1>Sign Up</h1>
            {loading && <Loader/>}
            {message && <Message type='danger' message={message}/>}
            {error && <Message type='danger' message={error}/>}
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
                <Button type='submit' varaint='primary' className='my-2'>Register</Button>
            </Form>
            <Row>
                <Col>Have a account ? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Login</Link></Col>
            </Row>
        </FormContainer>
    )
}

export default RegisterScreen