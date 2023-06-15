import React,{useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {Row,Col,ListGroup,Image,FormControl,Button,Card} from 'react-bootstrap'
import {AddToCart,RemoveFromCart} from '../../state/actions/cartActions'
import Message from '../Message'
import {Link} from 'react-router-dom'

const CartScreen = ({match,location,history}) => {
  // get product id and qty from params
  const productId = match.params.id;
  const qty = location.search ? Number(location.search.split('=')[1]) : 1;
  console.log('qty=',qty);

  // dispatch call
  const dispatch = useDispatch()

  // get cart item data
  const cart = useSelector(state=>state.cart)
  const { cartItems } = cart;
  console.log('cartItems by local',cartItems)
  // call add to cart action
  useEffect(() => {
    if(productId) {
      dispatch(AddToCart(productId,qty))
    }
  }, [dispatch,productId,qty])
  
  // remove cart handler
  const removeFromCartHandler = (id) =>{
    console.log('remove item',id)
    dispatch(RemoveFromCart(id))
  }

  // checkout proceed
  const checkoutHandler = () => {
    history.push('/login?redirect=shipping')
    console.log('checkout')
  }
  return (
    <>
      <Row>
        <Col md={8}>
          <h1>Shopping Cart</h1>
          {cartItems.length === 0 ? <Message>Your cart is empty <Link to='/'>Back</Link></Message>:(
          <ListGroup>
            {cartItems.map(item =>{
              return(
                <ListGroup.Item key={item.product}>
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded/>
                    </Col>
                    <Col md={4}>
                      <Link to={`/products/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col md={2}>
                      ${item.price}
                    </Col>
                    <Col md={2}>
                        <FormControl as='select' value={item.qty} onChange={(e)=>dispatch(AddToCart(item.product,Number(e.target.value)))}>
                          {[...Array(item.countInStock).keys()].map((x)=>(
                              <option key={x+1} value={x+1}>{x+1}</option>
                          ))}
                        </FormControl>
                    </Col>
                    <Col md={1}>
                      <Button type='button' variant='light' onClick={()=>removeFromCartHandler(item.product)}><i className='fas fa-trash'></i></Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )
            })}
          </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h5>SubTotal Item ({cartItems.reduce((acc,item)=>acc + item.qty, 0)})</h5>
              </ListGroup.Item>
              <ListGroup.Item>
                <h5>Total Price : {cartItems.reduce((acc,item)=>acc + item.price * item.qty, 0).toFixed(2)}</h5>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button type='button' className='btn-block' disabled={cartItems.length === 0} onClick={checkoutHandler}>Proceed To Checkout</Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default CartScreen