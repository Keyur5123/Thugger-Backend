import React,{useState,useEffect} from 'react'
import {Row,Col,ListGroup,Image,Button, Alert, Form} from "react-bootstrap"
import { useDispatch,useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { listProductsDetail, productCreateReviewAction } from '../actions/productAcions';
import Loader from '../Components/Loader';
import Ratings from "../Components/Ratings"
import Message from "../Components/Message"
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants';
import Meta from '../Components/Meta';

function ProductScreen({history,match}) {
    const dispatch = useDispatch()
    const [rating, setrating] = useState(0)
    const [comment, setcomment] = useState("")
    const [qty, setQty] = useState(0)
    const productCreateReview = useSelector(state => state.productCreateReview)
    const {success,error:errorReview }=productCreateReview
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo}=userLogin
    const productListDetail = useSelector(state => state.productListDetail)
    const {loading,error,product}=productListDetail
    useEffect(() => {
        if(success){
            setcomment("")
            setrating(0)
            dispatch({type:PRODUCT_CREATE_REVIEW_RESET})
        }
        dispatch(listProductsDetail(match.params.id)) 
    }, [match,dispatch,success,product])
    function addToCartHandler(){
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }
    const submitHandler=(e)=>{
        e.preventDefault()
        if(rating===0){
            alert("No Rating")
        }
        else{
            dispatch(productCreateReviewAction(match.params.id,{comment,rating}))
        }
    }
    return (
        <div>
            <Link className="btn btn-light my-3" to="/">
                Go Back
            </Link>
            {loading?<Loader/>:error?<Alert>{error}</Alert>:
            <>
            <Meta title={product.name}/>
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
                <h1>Reviews</h1>
            <Row>
                <Col md={6}>
                    {product.reviews.length===0 && <Message>No reviews</Message> }
                    <ListGroup variant="flush">
                            {product.reviews.map(review=>
                        <ListGroup.Item>
                            <strong>{review.name}</strong>
                            <Ratings rating={review.rating}/>
                            <p>{review.createdAt.substring(0,10)}</p>
                            <p>{review.comment}</p>
                        </ListGroup.Item>    
                            )}
                        
                    <ListGroup.Item>
                        
                    {userInfo ? 
                    <>
                    <h2>Write a Review</h2>
                    <Form onSubmit={submitHandler}>
                        <Form.Group >
                            <Form.Label>Ratings</Form.Label>
                            <Form.Control as="select" value={rating} onChange={(e)=>setrating(e.target.value)} >
                                <option value="Select">...Select</option>
                                <option value="1">1-Poor</option>
                                <option value="2">2-Fair</option>
                                <option value="3">3-Good</option>
                                <option value="4">4-Very Good</option>
                                <option value="5">5-Excellent</option>
                            </Form.Control>
                            Comment
                            <Form.Control as="textarea" row="3" value={comment} onChange={(e)=>setcomment(e.target.value)}></Form.Control>
                        </Form.Group>
                        <Button type="submit">Add Review</Button>
                    </Form>
                    </>
                    : <p>To add a review &nbsp;
                        <Link to="/login">Sign in</Link>
                        </p>
                        }
                    {errorReview && <Message variant="danger">{errorReview}</Message>}
                        </ListGroup.Item>
                        </ListGroup>
                </Col>
            </Row>
            </>
            }
        </div>
    )
}

export default ProductScreen
