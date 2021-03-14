import React,{useEffect} from 'react'
import {LinkContainer} from "react-router-bootstrap"
import Message from "../Components/Message"
import Loader from "../Components/Loader"
import { Table,Button } from "react-bootstrap";
import {useDispatch,useSelector} from "react-redux"
import { deleteUserAction, listUser } from '../actions/userAction';

function UserListScreen({history}) {
    const dispatch = useDispatch()
    const userList = useSelector(state => state.userList)
    const {error,loading,users}=userList
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo}=userLogin
    const deleteUser = useSelector(state => state.deleteUser)
    const {success:successDelete,error:errorDelete}=deleteUser
    useEffect(() => {
        if(userInfo.isAdmin){
            dispatch(listUser())
        }
        else{
            history.push("/")
        }
        
    }, [dispatch,history,successDelete,userInfo])
    const deleteHandler=(id)=>{
        if(window.confirm("Sure delete kari devanu"))
        {
            dispatch(deleteUserAction(id))
        }
    }
    return (
        <div>
            <h1>Users</h1>
            {errorDelete && <Message variant="danger">Ala Admin ne nai nikalai</Message>}
            {loading? <Loader/>:error?<Message variant="danger">{error}</Message>:(
                <Table striped bordered responsive hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Admin</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user=>(
                            <tr key={`${user._id}`}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td><a href={`mailto:${user.email}`}>
                                     {user.email}
                                    </a>
                                     </td>
                                <td>{user.isAdmin? <i className="fas fa-check" style={{color:"green"}}></i>:<i className="fas fa-times" style={{color:"red"}}></i>}</td>
                                <td><LinkContainer to={`/admin/user/${user._id}/edit`}><Button variant="light" className="btn-sm">
                                    <i className="fas fa-edit"></i></Button>
                                    </LinkContainer>
                                    <Button variant="light" className="btn-sm" onClick={()=>deleteHandler(user._id)}><i className="fas fa-trash" style={{color:"red"}}></i></Button></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    )
}

export default UserListScreen
