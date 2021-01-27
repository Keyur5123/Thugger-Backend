import React,{useState,useEffect} from 'react'
import {Row,Col,ListGroup,Image,Button} from "react-bootstrap"
import products from "../products"
import Ratings from "../Components/Ratings"
import axios from "axios"
function ProductScreen({match}) {
    const [product,setProduct]=useState([]);
    useEffect(() => {
         const fetchproducts=async()=>{
            const response=await axios.get("http://localhost:5000/products");
            setProduct(response.data.find((p)=>p._id===match.params.id));
        }
        fetchproducts();
    }, [match])
    return (
        <div>
            <Row>
                <Col md={6}>
                    <Image src={product.image} alt="" fluid />
                </Col>
                <Col md={3}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h3>{product.name}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Ratings rating={product.rating} reviews={`${product.numReviews} reviews`} />
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Price: ${product.price}
                        </ListGroup.Item>
                        <ListGroup.Item>
                        Description: {product.description}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={3}>
                    <ListGroup>
                        <ListGroup.Item>
                            <Row>
                            <Col>
                                Price:
                            </Col>
                            <Col>
                                ${product.price}
                            </Col>                                
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>
                                    Status:
                                </Col>
                                <Col>
                                    {product.countInStock===0?"Out of Stock":"In Stock"}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                                    <Button className="btn-block" variant="dark" disabled={product.countInStock===0}>Add to cart</Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
        </div>
    )
}

export default ProductScreen
