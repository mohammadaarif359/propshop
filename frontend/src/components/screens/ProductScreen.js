import React, { useEffect,useState } from 'react'
import {Link} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import {Row,Col,Image,ListGroup,Card,Button, FormControl, Form} from 'react-bootstrap'
import Rating from '../Rating'
import Loader from '../Loader'
import Message from '../Message'
import { listProductDetails,createProductReview } from '../../state/actions/productActions'
import { PRODUCT_CREATE_REVIEW_RESET } from '../../constant/productConstant'
import Meta from '../Meta'

const ProductScreen = ({history,match}) => {
    // qty state
    const [qty, setQty] = useState(1)
    // rating and comment state
    const [rating,setRating] = useState(0)
    const [comment,setComment] = useState('')
    // use dispatch
    const dispatch = useDispatch()

    // use selector for call the store productListDetails
    const productDetails = useSelector(state =>state.productDetails)
    const {loading,error,product} = productDetails

    // use selector for call the store productListDetails
    const productCreateReview = useSelector(state =>state.productCreateReview)
    const {loading:loadingProductReview,error:errorProductReview,success:successProductReview} = productCreateReview

    // use selector for call the store userLogin
    const userLogin = useSelector(state =>state.userLogin)
    const {userInfo} = userLogin
    
    useEffect(() => {
        // check if reivew added
        if(successProductReview) {
            alert('Review Add Successfully')
            setRating(0)
            setComment('')
            dispatch({type:PRODUCT_CREATE_REVIEW_RESET})
        }
        dispatch(listProductDetails(match.params.id))
    }, [dispatch,match,successProductReview])

    // add to cart
    const addToCardHandler = () =>{
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }
    // add product review
    const submitReviewHandler = (e) => {
        e.preventDefault()
        dispatch(createProductReview(match.params.id,{
            rating,
            comment
        }))
    }
  return (
    <>
        <Link className='btn btn-dark my-3' to='/'>Go Back</Link>
        {loading ? <Loader/> : error ? <Message type='danger' message={error}/> : (
        <>
        <Meta title={product.name}/>
        <Row>
            <Col md={5}>
                <Image src={product.image} alt={product.name} fluid/>
            </Col>
            <Col md={4}>    
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h3>{product.name}</h3>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                    </ListGroup.Item>
                    <ListGroup.Item>
                        Price : ${product.price}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        Description : {product.description}
                    </ListGroup.Item>
                </ListGroup>
            </Col>
            <Col md={3}>    
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <Row>
                            <Col>Price:</Col>
                            <Col><strong>${product.price}</strong></Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Status:</Col>
                            <Col><strong>{product.countInStock > 0  ? 'In Stock' : 'Out Of Stock'}</strong></Col>
                        </Row>
                    </ListGroup.Item>
                    {product.countInStock > 0 && (
                    <ListGroup.Item>
                        <Row>
                            <Col>Qty:</Col>
                            <Col>
                                <FormControl as='select' value={qty} onChange={(e)=>setQty(e.target.value)}>
                                    {[...Array(product.countInStock).keys()].map((x)=>(
                                        <option key={x+1} value={x+1}>{x+1}</option>
                                    ))}
                                </FormControl>
                            </Col>
                        </Row>
                    </ListGroup.Item>    
                    )}
                    <ListGroup.Item>
                        <Button onClick={addToCardHandler} className='btn-block' type='button' disabled={product.countInStock === 0}>
                            Add To Cart                            
                        </Button>
                    </ListGroup.Item>
                </ListGroup>
            </Col>
        </Row>
        <Row>
            <Col md={6}>
                <h2 className='my-3'>Reviews</h2>
                {product.reviews.length === 0 && <Message type='info' message='No Reviews'/>}
                <ListGroup variant='flush'>
                    {product.reviews.map(review=>(
                        <ListGroup.Item key={review._id}>
                            <strong>{review.name}</strong>
                            <Rating value={review.rating}/>
                            <p>{review.comment}</p>
                            <p>{review.createdAt.substring(0,10)}</p>
                        </ListGroup.Item>
                    ))}
                    <ListGroup.Item>
                        <h2>Write new Review</h2>
                        {errorProductReview && <Message type='danger' message={errorProductReview}/>}
                        {userInfo ? (
                            <Form onSubmit={submitReviewHandler}>
                                <Form.Group controlId='rating'>
                                    <Form.Label>Rating</Form.Label>
                                    <Form.Control as='select' value={rating} onChange={(e)=>setRating(e.target.value)}>
                                        <option value=''>Select..</option>
                                        <option value='1'>1 - Poor</option>
                                        <option value='2'>2 - Fair</option>
                                        <option value='3'>3 - Good</option>
                                        <option value='4'>4 - Very Good</option>
                                        <option value='5'>5 - Excellent</option>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId='comment'>
                                    <Form.Label>Comment</Form.Label>
                                    <Form.Control type='text' name='comment' value={comment} onChange={(e)=>setComment(e.target.value)}></Form.Control>
                                </Form.Group>
                                <Button type='submit' variant='primary' className='my-2'>Submit</Button>
                            </Form>
                            ) : (<Message type='info' message='Please sign in to write review'/>
                        )}
                    </ListGroup.Item>
                </ListGroup>
            </Col>
        </Row>
        </>
        )}
    </>
  )
}

export default ProductScreen