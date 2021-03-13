import React,{useState} from 'react'
import { Button, Form,Col } from 'react-bootstrap';
import {useDispatch,useSelector} from "react-redux"
import { savePaymentMethod } from '../actions/cartActions';

import CheckoutSteps from '../Components/CheckoutSteps';
import FormContainer from '../Components/FormContainer';
function PaymentScreen({history}) {
    const cart = useSelector(state => state.cart)
    const {shippingAddress}=cart
    const dispatch = useDispatch()
    if(!shippingAddress){
        history.push("/shipping")
    }
    const [paymentMethod, setpaymentMethod] = useState("PayPal")
    function submitHandler(event){
        event.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push("/placeorder")
    }
    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as="legend">Select method</Form.Label>
                     <Col>
                        <Form.Check type="radio" label="Paypal or Credit Card" name="paymentMethod" id="PayPal"  value="PayPal" checked onChange={(e)=>setpaymentMethod(e.target.value)}></Form.Check>
                        <Form.Check type="radio" label="Stripe or Credit Card" name="paymentMethod" id="Stripe" value="Stripe"  onChange={(e)=>setpaymentMethod(e.target.value)}></Form.Check>
                    </Col>
                </Form.Group>
                <Button type="submit" variant="primary">Submit</Button>
            </Form>
        </FormContainer>
    )
}

export default PaymentScreen
