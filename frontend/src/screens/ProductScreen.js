import React,{useState,useEffect} from 'react'
import {Row,Col,ListGroup,Image,Button, Alert, Form} from "react-bootstrap"
import { useDispatch,useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { listProductsDetail } from '../actions/productAcions';
import Loader from '../Components/Loader';
import Ratings from "../Components/Ratings"

function ProductScreen({history,match}) {
    const dispatch = useDispatch()
    const [qty, setQty] = useState(0)
    const productListDetail = useSelector(state => state.productListDetail)
    const {loading,error,product}=productListDetail
    useEffect(() => {
        dispatch(listProductsDetail(match.params.id)) 
    }, [match,dispatch])
    function addToCartHandler(){
        history.push(`/cart/${match.params.id}?${qty}`)
    }
    return (
        <div>
            <Link className="btn btn-light my-3" to="/">
                Go Back
            </Link>
            {loading?<Loader/>:error?<Alert>{error}</Alert>:
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

                        {product.countInStock>0 && 
                        <ListGroup.Item>
                            <Row>
                                <Col >
                                    Qty
                                </Col>
                                <Col >
                                    <Form.Control as="select" value={qty} onChange={(e)=>{setQty(e.target.value)}} defaultValue="1">
                                        <option key={0} value={0}>0</option>
                                        {[...Array(product.countInStock).keys()].map((x)=>
                                            <option key={x+1} value={x+1}>{x+1}</option>
                                        )})
                                    </Form.Control>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        }

                        <ListGroup.Item>
                                    <Button className="btn-block" variant="dark" disabled={product.countInStock===0 || qty===0} onClick={addToCartHandler}>Add to cart</Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
            }
        </div>
    )
}

export default ProductScreen
