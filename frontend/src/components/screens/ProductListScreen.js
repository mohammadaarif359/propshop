import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Table,Button,Row,Col} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import { listProducts,deleteProduct,createProduct } from '../../state/actions/productActions'
import Loader from '../Loader'
import Message from '../Message'
import Paginate from '../Paginate'
import { PRODUCT_CREATE_RESET } from '../../constant/productConstant'

const ProductListScreen = ({history,match}) => {
  const pageNum = match.params.pageNum || 1
  const dispatch = useDispatch()

  // get userList for user reducer
  const productList = useSelector(state =>state.productList)
  const {loading,error,products,pages,page} = productList
  console.log('products',products)

  // delete product for product reducer
  const productDelete = useSelector(state =>state.productDelete)
  const {loading:loadingDelete,error:errorDelete,success:successDelete} = productDelete

  // create product for product reducer
  const productCreate = useSelector(state =>state.productCreate)
  const {loading:loadingCreate,error:errorCreate,success:successCreate,product:createdProduct} = productCreate

  // get logged in userinfo from user reducer
  const userLogin = useSelector(state =>state.userLogin)
  const {userInfo} = userLogin

  // dispatch the listUsers data action
  useEffect(() => {
      dispatch({type:PRODUCT_CREATE_RESET})
      if(!userInfo.isAdmin) {
        history.push('/login')
      } else {

      }
      if(successCreate){
        history.push(`/admin/product/${createdProduct._id}/edit`) 
      } else {
          dispatch(listProducts('',pageNum))
      }
  }, [dispatch,history,userInfo,successDelete,successCreate,createdProduct,pageNum])

  // createHandler
  const createProductHandler = () =>{
      // create
      console.log('create click')
      dispatch(createProduct())
  }
  // deleteHandler
  const deleteHandler = (id) => {
      if(window.confirm('Are You Sure')) {
        dispatch(deleteProduct(id))
      }
  }
  return (
    <>
        <Row>
            <Col><h1>Products</h1></Col>
            {/*<Col className='text-right'>
                <Button className='btn-light' onClick={createProductHandler}>
                    <i className='fas fa-plus'></i> Create Product
                </Button>
            </Col>*/}
        </Row>
        {loadingDelete && <Loader/>}
        {errorDelete && <Message type='danger' message={errorDelete}/>}
        {loadingCreate && <Loader/>}
        {errorCreate && <Message type='danger' message={errorCreate}/>}
        {loading ? <Loader/> : error ? <Message type='danger' message={error}/> :(
            <>
            <Table striped bordered hover responsive className='table-sm'>
                <thead>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>BRAND</th>
                    <th>CATEGORY</th>
                    <th>PRICE</th>
                </thead>
                <tbody>
                    {products.map((product)=>(
                        <tr key={product._id}>
                            <td>{product._id}</td>
                            <td>{product.name}</td>
                            <td>{product.brand}</td>
                            <td>{product.category}</td>
                            <td>{product.price}</td>
                            <td>
                                <Link to={`/admin/product/${product._id}/edit`}>
                                    <Button variant='light' className='btn-sm'>
                                        <i className='fas fa-edit'></i>
                                    </Button>
                                </Link>
                                <Button variant='danger' className='btn-sm' onClick={()=>deleteHandler(product._id)}>
                                <i className='fas fa-trash'></i>
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Paginate pages={pages} page={page} isAdmin={true}/>
            </>
        )}
    </>
  )
}

export default ProductListScreen