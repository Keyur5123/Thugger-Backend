import Header from './Components/Header';
import logo from './logo.svg';
import {Container} from "react-bootstrap"
import Footer from './Components/Footer';
import "./bootstrap.min.css"
import HomeScreen from './screens/HomeScreen';
function App() {
  return (
    <div className="App">
      <Header/>
      <main className="py-3">
        <Container >
          <HomeScreen/>
        </Container> 
      </main>
      <Footer/>
    </div>
  );
}

export default App;
