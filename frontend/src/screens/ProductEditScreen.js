import React,{useState,useEffect} from 'react'
import {Link} from "react-router-dom"
import Message from "../Components/Message"
import Loader from "../Components/Loader"
import { Form,Button } from "react-bootstrap";
import {useDispatch,useSelector} from "react-redux"
import FormContainer from '../Components/FormContainer';
import { listProductsDetail, productUpdateAction } from '../actions/productAcions';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';
import axios from 'axios';

function ProductEditScreen({match,history}) {
    const productId=match.params.id
    const [name, setname] = useState("")
    const [price, setprice] = useState(0)
    const [numReviews, setnumReviews] = useState(0)
    const [countInStock, setcountInStock] = useState(0)
    const [brand, setbrand] = useState("")
    const [image, setimage] = useState("")
    const [description, setdescription] = useState("")
    const [category, setcategory] = useState("")
    const [uploading, setuploading] = useState(false)
    const dispatch = useDispatch()
    const productListDetail = useSelector(state => state.productListDetail)
    const {loading,error,product}=productListDetail
    const productUpdate = useSelector(state => state.productUpdate)
    const {loading:loadingUpdate,error:errorUpdate,success:successUpdate}=productUpdate
    useEffect(() => {
        if(successUpdate){
            dispatch({type:PRODUCT_UPDATE_RESET})
            history.push("/admin/productlist")
        }else{
            if(!product.brand || product._id!==productId ){
                dispatch(listProductsDetail(productId))
            }else{
                setname(product.name)
                setbrand(product.brand)
                setcategory(product.category)
                setcountInStock(product.countInStock)
                setprice(product.price)
                setdescription(product.description)
                setimage(product.image)
                setnumReviews(product.numReviews)
                }   
            }
        }, [dispatch,productId,history,product,successUpdate])
        const submitHandler=(event)=>{
            event.preventDefault()
            dispatch(productUpdateAction({
                _id:productId,
                name,
                price,
                countInStock,
                category,
                image,
                description,
                brand,
                numReviews
            }))
            console.log("Update thai gayu")
        }
        const handleImage=async(event)=>{
            const file=event.target.files[0]
            const formData=new FormData()
            formData.append("image",file)
            setuploading(true)
            console.log(formData)

            try {
                const config={
                    headers:{
                        "Content-type":"multipart/form-data"
                    }
                }
                const {data}=await axios.post("/upload",formData,config)
                console.log("yes")
                setimage(data)
                setuploading(false)
            } catch (error) {
                console.log(error);
                setuploading(false)
            }
        }
        return (
            <>
        <Link to="/admin/productList">Go Back</Link>
        <FormContainer>
                <h1>Update User</h1>
                {loadingUpdate && <Loader/>}
                {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
                {loading?<Loader/>:error?<Message variant="danger">{error}</Message>:(
                    
                    <Form onSubmit={submitHandler}>
                    <Form.Group controlId="name">
                        <Form.Label>
                            Name
                        </Form.Label>
                        <Form.Control type="name" placeholder="Enter Name" value={name} onChange={(e)=> setname(e.target.value)} />

                    </Form.Group>
                    <Form.Group controlId="category">
                        <Form.Label>
                            Category  
                        </Form.Label>
                        <Form.Control type="text" placeholder="Category" value={category} onChange={(e)=> setcategory(e.target.value)} />

                    </Form.Group>
                
                    <Form.Group controlId="description">
                        <Form.Label>
                            Description  
                        </Form.Label>
                        <Form.Control type="text" placeholder="description" value={description} onChange={(e)=> setdescription(e.target.value)} />

                    </Form.Group>
                    <Form.Group controlId="brand">
                        <Form.Label>
                            Brand  
                        </Form.Label>
                        <Form.Control type="text" placeholder="brand" value={brand} onChange={(e)=> setbrand(e.target.value)} />

                    </Form.Group>
                    <Form.Group controlId="countInStock">
                        <Form.Label>
                           Count In Stock
                        </Form.Label>
                        <Form.Control type="text" placeholder="countInStock" value={countInStock} onChange={(e)=> setcountInStock(e.target.value)} />

                    </Form.Group>
                    {/* <Form.Group controlId="numReviews">
                        <Form.Label>
                           Count In Stock
                        </Form.Label>
                        <Form.Control type="text" placeholder="numReviews" value={numReviews} onChange={(e)=> setnumReviews(e.target.value)} />

                    </Form.Group> */}
                    <Form.Group controlId="price">
                        <Form.Label>
                            Price  
                        </Form.Label>
                        <Form.Control type="text" placeholder="price" value={price} onChange={(e)=> setprice(e.target.value)} />

                    </Form.Group>
                    <Form.Group controlId="image">
                        <Form.Label>
                            Image  
                        </Form.Label>
                        <Form.Control type="text" placeholder="image" value={image} onChange={(e)=> setimage(e.target.value)} />
                        <Form.File id="image-file" custom label="Choose File" onChange={handleImage}></Form.File>
                        
                    </Form.Group>
                    {uploading && <Loader/>}
                    
                    <Button type="submit" variant="primary">Update</Button>
                </Form>
               
               )}
            </FormContainer>
        </>
    )
}

export default ProductEditScreen
