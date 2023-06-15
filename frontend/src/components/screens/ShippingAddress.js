import React,{useState} from 'react'
import {Form,Row,Col,Button} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import { SaveShippingAddress } from '../../state/actions/cartActions'
import FormContainer from '../FormContainer'
import CheckoutSteps from '../CheckoutSteps'

const ShippingAddress = ({history}) => {
    // get shipping data from cart reducer
    const cart = useSelector(state=>state.cart)
    const {shippingAddress} = cart
    // set state
    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)

    // dispatch action
    const dispatch = useDispatch()
    // handle shipping submit
    const handleSubmit = (e) =>{
        e.preventDefault();
        dispatch(SaveShippingAddress({address,city,postalCode,country}))
        history.push('/payment')
    }
    return (
    <FormContainer>
        <CheckoutSteps step1 step2/>
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId='address'>
                <Form.Label>Address</Form.Label>
                <Form.Control type='text' name='address' value={address} required onChange={(e)=>setAddress(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='city'>
                <Form.Label>City</Form.Label>
                <Form.Control type='text' name='city' value={city} required onChange={(e)=>setCity(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId = 'postalCode'>
                <Form.Label>postalCode</Form.Label>
                <Form.Control type='text' name='postalCode' value={postalCode} required onChange={(e)=>setPostalCode(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId = 'country'>
                <Form.Label>Country</Form.Label>
                <Form.Control type='text' name='country' value={country} required onChange={(e)=>setCountry(e.target.value)}></Form.Control>
            </Form.Group>
            <Button type='submit' varaint='primary' className='my-2'>Continue</Button>
        </Form>
    </FormContainer>
    )
}

export default ShippingAddress
