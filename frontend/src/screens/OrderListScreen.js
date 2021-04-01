import React,{useEffect} from 'react'
import {LinkContainer} from "react-router-bootstrap"
import Message from "../Components/Message"
import Loader from "../Components/Loader"
import { Table,Button,Row,Col } from "react-bootstrap";
import {useDispatch,useSelector} from "react-redux"
import { deleteUserAction, listUser } from '../actions/userAction';
import { listProducts, productCreateAction, productDeleteAction } from '../actions/productAcions';
import { PRODUCT_CREATE_RESET } from '../constants/productConstants';
import { detailOrderAction, OrderListAction } from '../actions/orderActions';

function OrderListScreen({history}) {
    const dispatch = useDispatch()
    const orderList = useSelector(state => state.orderList)
    const {error,loading,orders}=orderList
  
    const userLogin = useSelector(state => state.userLogin)
    // const productCreate = useSelector(state => state.productCreate)
    // const {loading:load,error:err,success,product}=productCreate
    const {userInfo}=userLogin
    console.log(orders)
    useEffect(() => {
        // dispatch({type:PRODUCT_CREATE_RESET})
        
        if(!userInfo.isAdmin){
            history.push("/")
        }
        // if(success){
        //     history.push(`/admin/order/${order._id}/edit`)
        // }
        else{
            dispatch(OrderListAction())
        }
        
    }, [dispatch,history,userInfo])
    const OrdersReset=(id)=>{
        dispatch(detailOrderAction(id))
        console.log("yes");
        console.log(orders);
    }
    // const deleteHandler=(id)=>{
    //     if(window.confirm("Sure delete kari devanu"))
    //     {
    //         dispatch(productDeleteAction(id))
    //     }
    //     console.log("product delete karvanu che");
    // }
    // const createProduct=()=>{
    //     dispatch(productCreateAction())
    //     console.log("product banavyo che");
    // }
    return (
        <div>
            <Row className="align-items-center">
                <Col >
                    <h1>Orders</h1>
                </Col>
                {/* <Col className="text-right">
                    <Button className="my-3" onClick={()=>createProduct()} ><i className="fas fa-plus"></i> Create Product</Button>
                </Col> */}
            </Row>
            {loading? <Loader/>:error?<Message variant="danger">{error}</Message>:(
                <Table striped bordered responsive hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>user</th>
                            <th>total</th>
                            <th>date</th>
                            <th>Delivered</th>
                            <th>Paid</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order=>(
                            <tr key={`${order._id}`}>
                                <td>{order._id}</td>
                                <td>{order.user.name}</td>
                                <td>${order.totalPrice}</td>
                                <td>{order.createdAt.substring(0,10)}</td>  
                                <td>{order.isDelivered ? 
                                <i className="fas fa-check" style={{color:'green'}}></i> 
                                : <i className="fas fa-times" style={{color:"red"}}></i>}</td>
                                <td>{order.isPaid ? order.paidAt.substring(0,10):
                                <i className="fas fa-times" style={{color:'red'}}></i> 

                                 } </td>

                                <td>
                                    <LinkContainer to={`/order/${order._id}`}><Button onClick={()=>OrdersReset(order._id)} variant="light" className="btn-sm">
                                     Details</Button>
                                    </LinkContainer>
                                    {/* <Button variant="light" className="btn-sm" onClick={()=>deleteHandler(product._id)}><i className="fas fa-trash" style={{color:"red"}}></i></Button> */}
                                    </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    )
}

export default OrderListScreen
