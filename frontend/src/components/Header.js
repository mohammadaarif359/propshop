import React from 'react'
import {Link,Route} from 'react-router-dom'
import { Navbar,Nav,Container, NavDropdown } from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import { logout } from '../state/actions/userActions'
import SearchBox from './SearchBox'
const Header = ({history}) => {
    const dispatch = useDispatch()
  
    const userLogin = useSelector(state =>state.userLogin)
    const { userInfo } = userLogin
    console.log(userInfo);

    // hanlde logout
    const handleLogout = () =>{
        console.log('logout')
        dispatch(logout())
        history.push('/login')
    }

     return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg" collsapseOnSelect>
                <Container>
                    <Navbar.Brand as={Link} to="/">ProShop</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Route render={({history}) => <SearchBox history={history}/>}/>
                        <Nav className="ml-auto">
                            <Nav.Link as={Link} to="/cart"><i className="fas fa-shopping-cart"></i> Cart</Nav.Link>
                            {userInfo ? (
                                <NavDropdown title={userInfo.name} id='username'>
                                    <NavDropdown.Item as={Link} to='/profile'>
                                        Profile
                                    </NavDropdown.Item>
                                    <NavDropdown.Item onClick={handleLogout}>
                                        Logout
                                    </NavDropdown.Item>
                                       
                                </NavDropdown>
                            ) : (
                                <Nav.Link as={Link} to="/login"><i className="fas fa-user"></i> Sign In</Nav.Link> 
                            )}
                            {userInfo && userInfo.isAdmin && (
                                <NavDropdown title='admin' id='admin'>
                                    <NavDropdown.Item as={Link} to='/admin/userlist'>Users</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to='/admin/productlist'>Products</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to='/admin/orderlist'>Orders</NavDropdown.Item>
                                </NavDropdown>
                            )}
                            
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header