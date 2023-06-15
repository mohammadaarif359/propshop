import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Form,Row,Col,Button} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import { login } from '../../state/actions/userActions'
import FormContainer from '../FormContainer'
import Loader from '../Loader'
import Message from '../Message'

const AuthScreen = ({location,history}) => {
    // set state email and password
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // redirect set after login / register
    const redirect = location.search ? location.search.split('=')[1] : '';

    // dispatch
    const dispatch = useDispatch()
    // fetch userLogin store
    const userLogin = useSelector(state => state.userLogin)
    const {loading,error,userInfo} = userLogin
    
    // useeffect for redirect to home if alreay login
    useEffect(() => {
        if(userInfo) {
            history.push(redirect)
        }
    }, [history,userInfo,redirect])
    

    // submit handle
    const handleSubmit = (e) => {
        e.preventDefault();
        //dispatch action login to userAction for login api
        dispatch(login(email,password))
    }
    return (
        <FormContainer>
            <h1>Sign In</h1>
            {loading && <Loader/>}
            {error && <Message type='danger' message={error}/>}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type='email' name='email' value={email} onChange={(e)=>setEmail(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId = 'password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' name='password' value={password} onChange={(e)=>setPassword(e.target.value)}></Form.Control>
                </Form.Group>
                <Button type='submit' varaint='primary' className='my-2'>Sign</Button>
            </Form>
            <Row>
                <Col>New Customer ? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link></Col>
            </Row>
        </FormContainer>
    )
}

export default AuthScreen