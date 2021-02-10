import React,{useState,useEffect} from 'react'
import Message from "../Components/Message"
import Loader from "../Components/Loader"
import { Form,Row,Col,Button } from "react-bootstrap";
import {useDispatch,useSelector} from "react-redux"
import { getUserDetail,updateUserProfile } from '../actions/userAction';

function ProfileScreen({location,history}) {
    const [name, setname] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [confirmPassword, setconfirmPassword] = useState("")
    const [message, setmessage] = useState(null)
    const redirect=location.search?location.search.split("=")[1]:"/"
    console.log(redirect)
    const dispatch = useDispatch()
    const userDetails = useSelector(state => state.userDetails)
    const {loading,error,user}=userDetails

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo}=userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const {success}=userUpdateProfile
    useEffect(() => {
        if(!userInfo){
            history.push("/login")
        }
        else{
            if(user.name){
            setname(user.name)
            setemail(user.email)
        }
        else{
            dispatch(getUserDetail("profile"))
        }
    }
    }, [dispatch,userInfo,history,user])
    const submitHandler=(event)=>{
        event.preventDefault()
        if(password!==confirmPassword){
            setmessage("Password match ni thata")
        } 
        else{
            dispatch(updateUserProfile({id:user._id,name,email,password}))
        } 
    }
    return (
            <Row>
                <Col md={3}>
                <h2>User Profile</h2>
                {message && <Message variant="danger">{message}</Message>}
                {success && <Message variant="success">Profile Updated</Message>}
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
                    <Button type="submit" variant="primary">Update</Button>
                </Form>
                </Col>
                <Col md={9}>
                </Col>
            </Row>
    )
}

export default ProfileScreen
