import React,{useEffect} from 'react'
import {Link} from 'react-router-dom'
import { Carousel,Image } from 'react-bootstrap'
import Loader from './Loader'
import Message from './Message'
import { useSelector,useDispatch } from 'react-redux'
import { listTopProducts } from '../state/actions/productActions'

const ProductCarousal = () => {
    const dispatch = useDispatch()

    const productTopRated = useSelector(state => state.productTopRated)
    const {loading,error,products} = productTopRated
    console.log('top rated product',products)

    useEffect(() => {
      dispatch(listTopProducts())
    }, [dispatch])
    
  return loading ? <Loader/> : error ? <Message type='danger' message={error}/> : (
      <Carousel pause='hover' className='bg-dark'>
          {products.map(product =>(
              <Carousel.Item key={product._id}>
                    <Link to=''>
                        <Image src={product.image} alt={product.image} fluid/>
                        <Carousel.Caption className='carousel-caption'>
                            <h2>{product.name} ({product.price})</h2>
                        </Carousel.Caption>
                    </Link>
              </Carousel.Item>
          ))}
      </Carousel>
    
  )
}

export default ProductCarousal