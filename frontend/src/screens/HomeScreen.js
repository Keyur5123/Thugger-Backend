import React,{useState,useEffect} from 'react'
import {Row,Col} from "react-bootstrap"
import Product from "../Components/Product"
import axios from "axios"
function HomeScreen() {
    const [products,setProducts]=useState([]);
    useEffect(() => {
         const fetchproducts=async()=>{
            const response=await axios.get("http://localhost:5000/products");
            setProducts(response.data);
        }
        fetchproducts();
    }, [])
    return (
        <div>
            <h1>Latest Products</h1>
            <Row>
                {products.map((product)=>(
                    <Col lg={3} md={4} sm={6} xs={12}>
                        <Product id={product._id} product={product}/>
                    </Col>
                )
                    )}
            </Row>
        </div>
    )
}

export default HomeScreen
