import React,{useState} from 'react'
import {Form,Row,Col,Button} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import { SavePaymentMethod } from '../../state/actions/cartActions'
import FormContainer from '../FormContainer'
import CheckoutSteps from '../CheckoutSteps'

const PaymentScreen = ({history}) => {
    // get shipping data from cart reducer
    const cart = useSelector(state=>state.cart)
    const {shippingAddress} = cart
    if(!shippingAddress) {
        history.push('/shipping')
    }
    // set state
    const [paymentMethod, setPaymentMethod] = useState('PayPal')

    // dispatch action
    const dispatch = useDispatch()
    // handle shipping submit
    const handleSubmit = (e) =>{
        e.preventDefault();
        dispatch(SavePaymentMethod(paymentMethod))
        history.push('/placeorder')
    }
    return (
    <FormContainer>
        <CheckoutSteps step1 step2 step3/>
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label as='label'>Select Method</Form.Label>
                <Col>
                    <Form.Check type='radio' label='PayPal or Credit Card' id='PayPal' name='paymentMethod' value='PayPal' checked onChange={(e)=>setPaymentMethod(e.target.value)}></Form.Check>
                    <Form.Check type='radio' label='Stripe' id='Stripe' name='paymentMethod' value='Stripe' onChange={(e)=>setPaymentMethod(e.target.value)}></Form.Check>
                </Col>
            </Form.Group>
            <Button type='submit' varaint='primary' className='my-2'>Continue</Button>
        </Form>
    </FormContainer>
    )
}

export default PaymentScreen
