import React,{useEffect} from 'react'
import {LinkContainer} from "react-router-bootstrap"
import Message from "../Components/Message"
import Loader from "../Components/Loader"
import { Table,Button,Row,Col } from "react-bootstrap";
import {useDispatch,useSelector} from "react-redux"
import { deleteUserAction, listUser } from '../actions/userAction';
import { listProducts, productCreateAction, productDeleteAction } from '../actions/productAcions';
import { PRODUCT_CREATE_RESET } from '../constants/productConstants';

function ProductListScreen({history}) {
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const {error,loading,products}=productList
    const productDelete = useSelector(state => state.productDelete)
    const {error:errorDelete,loading:loadingDelete,success:successDelete}=productDelete
    const userLogin = useSelector(state => state.userLogin)
    const productCreate = useSelector(state => state.productCreate)
    const {loading:load,error:err,success,product}=productCreate
    const {userInfo}=userLogin
    console.log(products)
    useEffect(() => {
        dispatch({type:PRODUCT_CREATE_RESET})
        if(!userInfo.isAdmin){
            history.push("/")
        }
        if(success){
            history.push(`/admin/product/${product._id}/edit`)
        }
        else{
            dispatch(listProducts())
        }
        
    }, [dispatch,history,userInfo,successDelete,success,product])
    const deleteHandler=(id)=>{
        if(window.confirm("Sure delete kari devanu"))
        {
            dispatch(productDeleteAction(id))
        }
        console.log("product delete karvanu che");
    }
    const createProduct=()=>{
        dispatch(productCreateAction())
        console.log("product banavyo che");
    }
    return (
        <div>
            <Row className="align-items-center">
                <Col >
                    <h1>Products</h1>
                </Col>
                <Col className="text-right">
                    <Button className="my-3" onClick={()=>createProduct()} ><i className="fas fa-plus"></i> Create Product</Button>
                </Col>
            </Row>
            {loadingDelete && <Loader/>}
            {errorDelete && <Message variant="danger">{errorDelete}</Message>}
            {loading? <Loader/>:error?<Message variant="danger">{error}</Message>:(
                <Table striped bordered responsive hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>price</th>
                            <th>Category</th>
                            <th>Brand</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product=>(
                            <tr key={`${product._id}`}>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.category}</td>
                                <td>{product.brand} </td>
                                <td><LinkContainer to={`/admin/product/${product._id}/edit`}><Button variant="light" className="btn-sm">
                                    <i className="fas fa-edit"></i></Button>
                                    </LinkContainer>
                                    <Button variant="light" className="btn-sm" onClick={()=>deleteHandler(product._id)}><i className="fas fa-trash" style={{color:"red"}}></i></Button></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    )
}

export default ProductListScreen
