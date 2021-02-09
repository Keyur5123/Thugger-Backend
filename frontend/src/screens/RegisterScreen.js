import React,{useState,useEffect} from 'react'
import {Link} from "react-router-dom"
import Message from "../Components/Message"
import Loader from "../Components/Loader"
import { Form,Row,Col,Button } from "react-bootstrap";
import {useDispatch,useSelector} from "react-redux"
import FormContainer from '../Components/FormContainer';
import { register } from '../actions/userAction';

function RegisterScreen({location,history}) {
    const [name, setname] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [confirmPassword, setconfirmPassword] = useState("")
    const [message, setmessage] = useState(null)
    const redirect=location.search?location.search.split("=")[1]:"/"
    console.log(redirect)
    const dispatch = useDispatch()
    const userRegister = useSelector(state => state.userRegister)
    const {loading,error,userInfo}=userRegister
    useEffect(() => {
        if(userInfo){
            history.push(redirect)
        }
    }, [redirect,userInfo,history])
    const submitHandler=(event)=>{
        event.preventDefault()
        if(password!==confirmPassword){
            setmessage("Password match ni thata")
        } 
        else{
            dispatch(register(name,email,password))
        } 
    }
    return (
            <FormContainer>
                <h1>Sign in karje</h1>
                {message && <Message variant="danger">{message}</Message>}
                {error && <Message variant="danger">{error}</Message>}
                {loading && <Loader/>}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId="name">
                        <Form.Label>
                            Name
                        </Form.Label>
                        <Form.Control type="name" placeholder="Enter Name" value={name} onChange={(e)=> setname(e.target.value)} />

                    </Form.Group>
                
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
                        <Form.Control type="password" placeholder="Enter Password" value={password} onChange={(e)=> setpassword(e.target.value)} />

                    </Form.Group>
                    <Form.Group controlId="password">
                        <Form.Label>
                            Password
                        </Form.Label>
                        <Form.Control type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e)=> setconfirmPassword(e.target.value)} />

                    </Form.Group>
                    <Button type="submit" variant="primary">Register</Button>
                </Form>
                <Row className="py-3">
                    <Col>
                    Have an account?{" "}
                    <Link to={redirect?`/login/redirect=${redirect}`:`/login`}>
                        Login
                    </Link>
                    </Col>
                </Row>
            </FormContainer>
    )
}

export default RegisterScreen
