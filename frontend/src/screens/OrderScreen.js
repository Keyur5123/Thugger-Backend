import React,{useEffect, useState} from 'react'
import {PayPalButton} from "react-paypal-button-v2"
import {Link} from 'react-router-dom';
import {Col,Image,ListGroup, Row } from "react-bootstrap";
import {useDispatch,useSelector} from "react-redux"
import {  detailOrderAction, OrderPayAction } from '../actions/orderActions';
import Message from '../Components/Message'
import Loader from '../Components/Loader';
import axios from 'axios';
function OrderScreen({match,history}) {
    const cart = useSelector(state => state.cart)
    const detailsOrder = useSelector(state => state.detailsOrder)
    const {loading,order,error}=detailsOrder
    const orderPay = useSelector(state => state.orderPay)
    const {loading:loadingPay,success:successPay}=orderPay
    cart.itemsprice=cart.cartItems.reduce((acc,item)=>acc+item.price*item.qty,0).toFixed(2)
    const [sdkReady, setsdkReady] = useState(false)
    const dispatch = useDispatch()
    const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  //sb-6evwd4126098@personal.example.comDEFAULT
    useEffect(() => {
        
        console.log(order)
        const addPaypalScript=async()=>{
            const {data}=await axios.get("/config/paypal")
            console.log(data);
           const script=document.createElement('script');
           script.src=`https://www.paypal.com/sdk/js?client-id=${data}`
           script.type="text/javascript"
           script.async=true
           script.onload=()=>{
                setsdkReady(true)
           }
           document.body.appendChild(script);
        }
        
        if(!order || successPay ){
            dispatch({type:"ORDER_PAY_RESET"})
            dispatch(detailOrderAction(match.params.id))
        }
        else if(!order.isPaid){
            if(!window.paypal){ 
                addPaypalScript();
            }
            else{
                setsdkReady(true)
            }

        }
   }, [dispatch,match.params.id,successPay,order])
   const successHandler=(paymentResult)=>{
        dispatch(OrderPayAction(order._id,paymentResult))
        console.log(paymentResult)
   }
    
    return loading?<Loader/>:error?<Message variant="danger">{error}</Message>:
        <>
        <h1>Order</h1>
        <Row>
        <Col md={8}>
            <ListGroup variant="flush">
                <ListGroup.Item>
                    <h2>Shipping</h2>
                    <p><strong>Name:</strong>{order.user.name}</p>
                    <p><strong>Email:</strong>
                    <a href={`mailto:${order.user.email}`}> {order.user.email}</a></p>
                    <p>
                        <strong>Address:</strong>
                        {order.shippingAddress.address},{order.shippingAddress.city}{" "},{order.shippingAddress.postalCode}{" "},{order.shippingAddress.country}
                    </p>
                    {order.isDelivered ? <Message>Delivered on {order.deliveredAt}</Message> : <Message variant="danger">Not Delivered</Message>}
                </ListGroup.Item>
                <ListGroup.Item>
                    <h2>Payment</h2>
                    <p>
                        <strong>Payment Method:</strong>
                        {order.paymentMethod}
                    </p>
                    {order.isPaid? <Message variant="success">Paid on{order.paidAt}</Message>:<Message variant="warning">Not Paid</Message>}
                </ListGroup.Item>
                <ListGroup.Item>
                    <h2>Cart</h2>
                    <ListGroup variant="flush">
                        {order.orderItems.map((item,index)=>(
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
                    <Col>${order.shippingPrice}</Col>
                </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                <Row>
                    <Col >Tax:</Col>
                    <Col>${order.taxPrice}</Col>
                </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                <Row>
                    <Col >Total:</Col>
                    <Col>${order.totalPrice}</Col>
                </Row>
                </ListGroup.Item>
                {!order.isPaid && 
                <ListGroup.Item>
                    {loadingPay && <Loader/>}
                    {!sdkReady? " " :(
                        <PayPalButton amount={`${order.totalPrice}`}   onSuccess={successHandler} />
                    )}
                </ListGroup.Item>
                    }
                    {error && 
                        <ListGroup.Item>
                        <Message variant="danger">{error}</Message>
                        </ListGroup.Item>
                    }
                
            </ListGroup>
        </Col>
    </Row>
        </>
    
}

export default OrderScreen
