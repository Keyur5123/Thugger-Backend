import React,{useState,useEffect} from 'react'
import {Link} from "react-router-dom"
import Message from "../Components/Message"
import Loader from "../Components/Loader"
import { Form,Row,Col,Button } from "react-bootstrap";
import {useDispatch,useSelector} from "react-redux"
import FormContainer from '../Components/FormContainer';
import { login } from '../actions/userAction';
import axios from 'axios';

function LoginScreen({location,history}) {
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const redirect=location.search?location.search.split("=")[1]:"/"
    console.log(redirect)
    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const {loading,error,userInfo}=userLogin
    useEffect(() => {
        if(userInfo){
            history.push(redirect)
        }
    }, [redirect,userInfo,history])
    const submitHandler=(e)=>{
        e.preventDefault()  
        dispatch(login(email,password))
    }
    return (
            <FormContainer>
                <h1>Sign in karje</h1>
                {error && <Message variant="danger">{error}</Message>}
                {loading && <Loader/>}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId="email">
                        <Form.Label>
                            Email Address
                        </Form.Label>
                        <Form.Control type="email" placeholder="Enter Email" value={email} onChange={(e)=> setemail(e.target.value)} />

                    </Form.Group>
                    <Form.Group controlId="password">
                        <Form.Label>
                            Password
                        </Form.Label>
                        <Form.Control type="password" placeholder="Enter Email" value={password} onChange={(e)=> setpassword(e.target.value)} />

                    </Form.Group>
                    <Button type="submit" variant="primary">Submit</Button>
                </Form>
                <Row className="py-3">
                    <Col>
                    New Customer?
                    <Link to={redirect?`/register/redirect=${redirect}`:`/register`}>
                        Register
                    </Link>
                    </Col>
                </Row>
            </FormContainer>
    )
}

export default LoginScreen
