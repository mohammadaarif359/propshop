//import logo from './logo.svg';
import { Container } from "react-bootstrap";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomeScreen from "./components/screens/HomeScreen";
import ProductScreen from "./components/screens/ProductScreen";
import CartScreen from "./components/screens/CartScreen";
import {BrowserRouter as Router,Route} from 'react-router-dom'
import AuthScreen from "./components/screens/AuthScreen";
import RegisterScreen from "./components/screens/RegisterScreen";
import ProfileScreen from "./components/screens/ProfileScreen";
import ShippingAddress from "./components/screens/ShippingAddress";
import PaymentScreen from "./components/screens/PaymentScreen";
import PlaceOrderScreen from "./components/screens/PlaceOrderScreen";
import OrderScreen from "./components/screens/OrderScreen";
import UserListScreen from "./components/screens/UserListScreen";
import UserEditScreen from "./components/screens/UserEditScreen";
import ProductListScreen from "./components/screens/ProductListScreen";
import ProductEditScreen from "./components/screens/ProductEditScreen";
import OrderListScreen from "./components/screens/OrderListScreen";


const App = () => {
  return (
    <Router>
      <Header/>
      <main className="py-2">
        <Container>
          <Route path='/' component={HomeScreen} exact/>
          <Route path='/page/:pageNumber' component={HomeScreen} exact/>
          <Route path='/search/:keyword' component={HomeScreen} exact/>
          <Route path='/search/:keyword/page/:pageNumber' component={HomeScreen} exact/>
          <Route path='/product/:id' component={ProductScreen} exact/>
          <Route path='/cart/:id?' component={CartScreen} exact/>
          <Route path='/login' component={AuthScreen} exact/>
          <Route path='/register' component={RegisterScreen} exact/>
          <Route path='/profile' component={ProfileScreen} exact/>
          <Route path='/shipping' component={ShippingAddress} exact/>
          <Route path='/payment' component={PaymentScreen} exact/>
          <Route path='/placeorder' component={PlaceOrderScreen} exact/>
          <Route path='/order/:id' component={OrderScreen} exact/>
          <Route path='/admin/userlist' component={UserListScreen} exact/>
          <Route path='/admin/user/:id/edit' component={UserEditScreen} exact/>
          <Route path='/admin/productlist' component={ProductListScreen} exact/>
          <Route path='/admin/productlist/:pageNum' component={ProductListScreen} exact/>
          <Route path='/admin/product/:id/edit' component={ProductEditScreen} exact/>
          <Route path='/admin/orderlist' component={OrderListScreen} exact/>
        </Container>
      </main>
      <Footer/>
    </Router>  
  );
}

export default App;
