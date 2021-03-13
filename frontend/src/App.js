import Header from './Components/Header';
import {Container} from "react-bootstrap"
import Footer from './Components/Footer';
import "./bootstrap.min.css"
import HomeScreen from './screens/HomeScreen';
import {BrowserRouter as Router,Route} from "react-router-dom"
import ProductScreen from "./screens/ProductScreen"
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import test from './test';

function App() {
  return (
    <Router>
      <Header/>
      <main className="py-3">

        <Container >
        <Route path="/" component={HomeScreen} exact></Route>
        <Route path="/product/:id" component={ProductScreen} ></Route>
        <Route path="/placeorder" component={PlaceOrderScreen} ></Route>
        <Route path="/order/:id" component={OrderScreen} ></Route>
        <Route path="/payment" component={PaymentScreen} ></Route>
        <Route path="/shipping" component={ShippingScreen} ></Route>
        <Route path="/test" component={test} ></Route>
        <Route path="/cart/:id?" component={CartScreen} ></Route>
        <Route path="/login" component={LoginScreen} ></Route>
        <Route path="/register" component={RegisterScreen} ></Route>
        <Route path="/profile" component={ProfileScreen} ></Route>
        </Container> 
      </main>
      <Footer/>
    </Router>
  );
}

export default App;
