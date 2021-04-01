import React,{useState,useEffect} from 'react'
import {Row,Col} from "react-bootstrap"
import {useDispatch,useSelector} from "react-redux"
import Product from "../Components/Product"
import {listProducts} from "../actions/productAcions"
import Loader from "../Components/Loader"
import Message from "../Components/Message"

function HomeScreen({match}) {
    const keyword=match.params.keyword
    const pageNumber=match.params.pageNumber
    // const [products,setProducts]=useState([]);
    const dispatch=useDispatch();
    const productList = useSelector(state => state.productList);
    const {loading,error,products,page,pages }=productList
    console.log(page,pages);
    useEffect(() => {
        dispatch(listProducts(keyword,pageNumber))
        //  const fetchproducts=async()=>{
        //     const response=await axios.get("http://localhost:5000/products");
        //     setProducts(response.data);
        // }
        // fetchproducts();
    }, [dispatch,keyword,pageNumber])
    return (
        <div>
            <h1>Latest Products</h1>
            {loading?<Loader/>:error?<Message variant="danger">{error}</Message>:
            <Row>
                {products.map((product)=>(
                    <Col lg={3} md={4} sm={6} xs={12}>
                        <Product id={product._id} product={product}/>
                    </Col>
                )
                    )}
            </Row>
            }
        </div>
    )
}

export default HomeScreen
