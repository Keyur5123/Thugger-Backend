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

function App() {
  return (
    <Router>
      <Header/>
      <main className="py-3">

        <Container >
        <Route path="/" component={HomeScreen} exact></Route>
        <Route path="/product/:id" component={ProductScreen} ></Route>
        <Route path="/shipping" component={ShippingScreen} ></Route>
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
