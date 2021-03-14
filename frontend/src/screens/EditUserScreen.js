import React,{useState,useEffect} from 'react'
import {Link} from "react-router-dom"
import Message from "../Components/Message"
import Loader from "../Components/Loader"
import { Form,Button } from "react-bootstrap";
import {useDispatch,useSelector} from "react-redux"
import FormContainer from '../Components/FormContainer';
import { getUserDetail, UserUpdateAction } from '../actions/userAction';
import { USER_UPDATE_RESET } from '../constants/userConstants';

function EditUserScreen({match,history}) {
    const userId=match.params.id
    const [name, setname] = useState("")
    const [email, setemail] = useState("")
    const [isAdmin, setisAdmin] = useState(false)
    const dispatch = useDispatch()
    const userDetails = useSelector(state => state.userDetails)
    const {loading,error,user}=userDetails
    const updateUser = useSelector(state => state.updateUser)
    const {loading:loadingUpdate,error:errorUpdate,success:successUpdate}=updateUser
    useEffect(() => {
        if(successUpdate){
            dispatch({type:USER_UPDATE_RESET})
            history.push("/admin/userlist")
        }else{
            if(!user.name || user._id!==userId ){
                dispatch(getUserDetail(userId))
            }else{
                setname(user.name)
                setemail(user.email)
                setisAdmin(user.isAdmin)

            }
        }
    }, [user,dispatch,userId,successUpdate,history])
    const submitHandler=(event)=>{
        event.preventDefault()
        dispatch(UserUpdateAction({_id:userId,name,email,isAdmin}))
    }
    return (
        <>
        <Link to="/admin/userList">Go Back</Link>
        <FormContainer>
                <h1>Update User</h1>
                {loading?<Loader/>:error?<Message variant="danger">{error}</Message>:(

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
                    <Form.Group controlId="isAdmin">
                        <Form.Check type="checkbox" label="isAdmin" checked={isAdmin} onChange={(e)=> setisAdmin(e.target.checked)}/>
                    </Form.Group>
                    
                    <Button type="submit" variant="primary">Update</Button>
                </Form>
               
               )}
            </FormContainer>
        </>
    )
}

export default EditUserScreen
