import React, {useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { Row,Col } from 'react-bootstrap'
import Product from '../Product'
import Loader from '../Loader'
import Message from '../Message'
import Paginate from '../Paginate'
import { listProducts } from '../../state/actions/productActions'
import ProductCarousal from '../ProductCarousal'
import Meta from '../Meta'
const HomeScreen = ({match}) => {
  // keyword search
  const keyword = match.params.keyword
  // page search
  const pageNumber = match.params.pageNumber || 1
  // use disDispatch
  const dispatch = useDispatch();

  // use selector for call the store productList
  const productList = useSelector(state =>state.productList)
  const {loading,error,products,page,pages} = productList;

  // fetch products
  useEffect(() => {
      dispatch(listProducts(keyword,pageNumber))
  }, [dispatch,keyword,pageNumber])

  return (
    <>
        <Meta/>
        {!keyword && <ProductCarousal/>}
        <h1 className='my-2'>Lastest Product</h1>
        {error ? <Message type='danger' message={error}/> : (
         <> 
        <Row>
           {products.map((product,key)=>{
               return (<Col key={key} sm={12} md={6} lg={4} xl={3}>
                   <Product product={product}/>
               </Col>
               )
           })}
        </Row>
        <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''}/>
        </>  
        )} 
    </>
  )
}

export default HomeScreen