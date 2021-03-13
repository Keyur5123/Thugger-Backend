import React,{useEffect, useState} from 'react'
import {Link} from 'react-router-dom';
import {Button,Col,Image,ListGroup, Row } from "react-bootstrap";
import {useDispatch,useSelector} from "react-redux"
import CheckoutSteps from '../Components/CheckoutSteps';
import FormContainer from '../Components/FormContainer';
import { createOrderAction } from '../actions/orderActions';
import Message from '../Components/Message'
function PlaceOrderScreen({history}) {
    const cart = useSelector(state => state.cart)
    const dispatch = useDispatch()
    const createdOrder = useSelector(state => state.createdOrder) 
    const { success,error,order }=createdOrder
    useEffect(() => {
        if(success){
            history.push(`order/${order._id}`)
        }
    }, [history,success])
    const {shippingAddress,paymentMethod}=cart
    cart.itemsprice=cart.cartItems.reduce((acc,item)=>acc+item.price*item.qty,0).toFixed(2)
    cart.shippingPrice=(cart.itemsprice>100?0:100).toFixed(2)
    cart.taxPrice=(cart.itemsprice*0.15).toFixed(2)
    cart.totalPrice=(Number(cart.itemsprice)+Number(cart.shippingPrice)+Number(cart.taxPrice)).toFixed(2)
    function placeOrderHandler(event){
        event.preventDefault()
        dispatch(createOrderAction({
            shippingPrice:cart.shippingPrice,
            orderItems:cart.cartItems,
            paymentMethod:cart.paymentMethod,
            shippingAddress:cart.shippingAddress,
            totalPrice:cart.totalPrice,
            taxPrice:cart.taxPrice,
            itemsPrice:cart.itemsprice
        }))
    }
    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4/>
            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Address:</strong>
                                {shippingAddress.address},{shippingAddress.city}{" "},{shippingAddress.postalcode}{" "},{shippingAddress.country}
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payment</h2>
                            <p>
                                <strong>Payment Method:</strong>
                                {paymentMethod}
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Cart</h2>
                            <ListGroup variant="flush">
                                {cart.cartItems.map((item,index)=>(
                                <ListGroup.Item key={index}>
                                    <Row>
                                    <Col md={2}>    
                                        <Image src={item.image} fluid rounded/>
                                    </Col>
                                    <Col >
                                        <Link to={`product/${item.product}`}>
                                            {item.name}
                                        </Link>
                                    </Col>
                                    <Col md={6}>
                                        {item.qty} x ${item.price}= ${item.qty*item.price}   
                                    </Col>
                                    </Row>
                                </ListGroup.Item>))}
                            </ListGroup>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <ListGroup>
                        <ListGroup.Item>
                            <h2>Order summary</h2>
                        </ListGroup.Item>
                        <ListGroup.Item>
                        <Row>
                            <Col >Items:</Col>
                            <Col>${cart.itemsprice}</Col>
                        </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                        <Row>
                            <Col >Shipping:</Col>
                            <Col>${cart.shippingPrice}</Col>
                        </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                        <Row>
                            <Col >Tax:</Col>
                            <Col>${cart.taxPrice}</Col>
                        </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                        <Row>
                            <Col >Total:</Col>
                            <Col>${cart.totalPrice}</Col>
                        </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            {error && <Message variant="danger">{error}</Message>}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button className="btn btn-block" disabled={cart.cartItems.length===0} onClick={placeOrderHandler} >Place Order</Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
        </div>
    )
}

export default PlaceOrderScreen
