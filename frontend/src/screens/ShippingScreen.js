import React,{useState} from 'react'
import { Form,Button } from "react-bootstrap";
import {useDispatch,useSelector} from "react-redux"

import { saveShippingAddress } from '../actions/cartActions';
import CheckoutSteps from '../Components/CheckoutSteps';
import FormContainer from '../Components/FormContainer';
function ShippingScreen({history}) {
    const cart = useSelector(state => state.cart)
    const {shippingAddress}=cart
    const dispatch = useDispatch()
    const [address, setaddress] = useState(shippingAddress.address)
    const [city, setcity] = useState(shippingAddress.city)
    const [postalCode, setpostalcode] = useState(shippingAddress.postalCode)
    const [country, setcountry] = useState(shippingAddress.country)
    function submitHandler(event){
        event.preventDefault()
        dispatch(saveShippingAddress({address,city,postalCode,country}))
        history.push("/payment")
    }
    return (
        <FormContainer>
            <CheckoutSteps step1 step2 />
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="Address">
                    <Form.Label>
                        Address
                    </Form.Label>
                    <Form.Control type="text" placeholder="Enter address" value={address} required onChange={(e)=>setaddress(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="city">
                    <Form.Label>
                        City
                    </Form.Label>
                    <Form.Control type="text" placeholder="City" value={city} required onChange={(e)=>setcity(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="postalCode">
                    <Form.Label>
                        Postal Code
                    </Form.Label>
                    <Form.Control type="text" value={postalCode} placeholder="Postal Code" required onChange={(e)=>setpostalcode(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="country">
                    <Form.Label>
                        Country
                    </Form.Label>
                    <Form.Control type="text" value={country} placeholder="Country" required onChange={(e)=>setcountry(e.target.value)} />
                </Form.Group>
                <Button type="submit" variant="primary">Submit</Button>
            </Form>
        </FormContainer>
    )
}

export default ShippingScreen
