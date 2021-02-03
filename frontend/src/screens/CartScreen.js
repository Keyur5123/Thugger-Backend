import React,{useEffect} from 'react'
import {Link} from "react-router-dom"
import {Col,Row,ListGroup,Button, Image,Form} from "react-bootstrap"
import {useDispatch,useSelector} from "react-redux"
import {addToCart,removeFromCart} from "../actions/cartActions"
import Message from '../Components/Message'
function CartScreen({match,location,history}) {
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const {cartItems}=cart
    console.log(cartItems);
    const qty=location.search?Number(location.search.split("=")[1]):1
    const id=match.params.id
    useEffect(() => {
        if(id){
            dispatch(addToCart(id,qty))
        }
        console.log(window.location.search.split("=")[1])
    }, [dispatch,match,qty])
    const removeFromCartHandler=(id)=>{
           dispatch(removeFromCart(id));
    } 
           
    
    const checkoutHandler=()=>{
        history.push(`/login/redirect?shipping`)
    }
    return (
        <Row>
            <Col md={8}>
                <h1> Shopping Cart</h1>
                {cartItems.length===0?<Message>Cart to empty che</Message>:(
                    <ListGroup variant="flush">
                        {cartItems.map(item=>(
                            <ListGroup.Item key={item.product}>
                                <Row>
                                    <Col md={2}>
                                        <Image src={item.image} fluid />
                                    </Col>
                                    <Col md={3}>
                                        <Link to={`/product/${item.product}`}>{item.name}</Link> 
                                    </Col>
                                    <Col md={2}>
                                        ${item.price}
                                    </Col>
                                    <Col md={2}>
                                    <Form.Control as="select" value={item.qty} onChange={(e)=>dispatch(addToCart(item.product,Number(e.target.value)))} defaultValue="1">
                                        {[...Array(item.countInStock).keys()].map((x)=>
                                            <option key={x+1} value={x+1}>{x+1}</option>
                                        )})
                                    </Form.Control>
                                    </Col>
                                    <Col md={2}>
                                        <Button variant="light" onClick={()=>removeFromCartHandler(item.product)} ><i className="fa fa-trash" aria-hidden="true"></i></Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                ))}
                    </ListGroup>
                ) }
            </Col>
           <Col md={4}>
               <ListGroup>
                   <ListGroup.Item>
                       <h2>
                           Subtotal ({cartItems.reduce((acc,item)=>acc+item.qty,0)}) items
                       </h2>
                       ${cartItems.reduce((acc,item)=>acc+item.qty*item.price,0)}
                       
                   </ListGroup.Item>
               </ListGroup>
               <ListGroup.Item>
                   <Button  className="btn btn-block" disabled={cartItems.length===0} onClick={checkoutHandler} >Proceed to checkout</Button>
               </ListGroup.Item>

           </Col>

        </Row>
    )
}

export default CartScreen
