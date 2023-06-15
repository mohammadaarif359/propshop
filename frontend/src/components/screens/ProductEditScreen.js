import axios from 'axios'
import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Form,Row,Col,Button} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import { listProductDetails,updateProduct } from '../../state/actions/productActions'
import FormContainer from '../FormContainer'
import Loader from '../Loader'
import Message from '../Message'
import { PRODUCT_UPDATE_RESET } from '../../constant/productConstant'

const ProductEditScreen  = ({match,history}) => {
    const productId = match.params.id
    console.log(productId)
    // set state
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description,setDescription] = useState('')
    const [uploading,setUploading] = useState(false)

    // dispatch
    const dispatch = useDispatch()
    // fetch productDetails store
    const productDetails = useSelector(state => state.productDetails)
    const {loading,error,product} = productDetails
    console.log('product',product)
    // updateproduct store 
    const productUpdate = useSelector(state => state.productUpdate)
    const {loading:loadingUpdate,error:errorUpdate,success:successUpdate} = productUpdate
    
    // useeffect for redirect to home if alreay login
    useEffect(() => {
        if(successUpdate){
            dispatch({type:PRODUCT_UPDATE_RESET})
            history.push('/admin/productlist')
        } else {
            if(productId !== product._id) {
                dispatch(listProductDetails(productId))
            } else {
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setBrand(product.brand)
                setCategory(product.category)
                setCountInStock(product.countInStock)
                setDescription(product.description)
            }
        }
    }, [dispatch,productId,product,successUpdate])
    
    // upload handle
    const uploadFileHandler = async(e) =>{
        const file = e.target.files[0];
        const formData = new FormData()
        formData.append('image',file);
        setUploading(true)
        try{
            const config = {
                headers:{
                    'Content-Type':'multipart/form-data'
                } 
            }
            const {data} = await axios.post('/api/upload',formData,config)
            setImage(data)
            setUploading(false)
        } catch(error) {
            console.log(error)
            setUploading(false)
        }
    }
    // submit handle
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateProduct({_id:productId,name,price,image,brand,category,countInStock,description}))
    }
    return (
        <>
        <Link to='/admin/productlist' className='btn btn-light my-3'>Go Back</Link>
        <FormContainer>
            <h1>Edit Product</h1>
            {loadingUpdate && <Loader/>}
            {errorUpdate && <Message type='danger' message={errorUpdate}/>}
            {loading ? <Loader/> : error ? <Message type='danger' message={error}/> : (
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type='name' name='name' value={name} onChange={(e)=>setName(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='price'>
                    <Form.Label>Price</Form.Label>
                    <Form.Control type='number' name='price' value={price} onChange={(e)=>setPrice(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='image'>
                    <Form.Label>Image</Form.Label>
                    <Form.Control type='text' name='image' value={image} onChange={(e)=>setImage(e.target.value)}></Form.Control>
                    <Form.Control id='image-file' type='file' label='Choose File' custom onChange={uploadFileHandler}></Form.Control>
                    {uploading && <Loader/>}
                </Form.Group>
                <Form.Group controlId='brand'>
                    <Form.Label>Brand</Form.Label>
                    <Form.Control type='text' name='brand' value={brand} onChange={(e)=>setBrand(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='category'>
                    <Form.Label>Category</Form.Label>
                    <Form.Control type='text' name='category' value={category} onChange={(e)=>setCategory(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='countInStock'>
                    <Form.Label>Count In Stock</Form.Label>
                    <Form.Control type='number' name='countInStock' value={countInStock} onChange={(e)=>setCountInStock(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='description'>
                    <Form.Label>Description</Form.Label>
                    <Form.Control type='text' name='description' value={description} onChange={(e)=>setDescription(e.target.value)}></Form.Control>
                </Form.Group>
                <Button type='submit' varaint='primary' className='my-2'>Update</Button>
            </Form>
            )}
        </FormContainer>
        </>
    )
}

export default ProductEditScreen