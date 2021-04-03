import React,{useState,useEffect} from 'react'
import {Row,Col} from "react-bootstrap"
import {useDispatch,useSelector} from "react-redux"
import Product from "../Components/Product"
import {listProducts, listTopProducts} from "../actions/productAcions"
import Loader from "../Components/Loader"
import Message from "../Components/Message"
import Paginate from '../Components/Paginate'
import ProductCarousel from '../Components/ProductCarousel'
import Meta from '../Components/Meta'
import { Link } from 'react-router-dom'

function HomeScreen({match}) {
    const keyword=match.params.keyword
    const pageNumber=match.params.pageNumber
    // const [products,setProducts]=useState([]);
    const dispatch=useDispatch();
    const productTop = useSelector(state => state.productTop)
    const {products:productsTop}=productTop
    const productList = useSelector(state => state.productList);
    const {loading,error,products,page,pages }=productList
    console.log(`page=${page} pages=${pages}`);
    useEffect(() => {
        dispatch(listTopProducts())
        dispatch(listProducts(keyword,pageNumber))
        //  const fetchproducts=async()=>{
        //     const response=await axios.get("http://localhost:5000/products");
        //     setProducts(response.data);
        // }
        // fetchproducts();
    }, [dispatch,keyword,pageNumber])
    return (
        <div>
            <Meta/>
            {!keyword ? <ProductCarousel/>: <Link to="/" className="btn btn-light">Go Back</Link>}
            <h1>Latest Products</h1>
            {loading?<Loader/>:error?<Message variant="danger">{error}</Message>:
            <>
            <Row>
                {products.map((product)=>(
                    <Col lg={3} md={4} sm={6} xs={12}>
                        <Product id={product._id} product={product}/>
                    </Col>
                )
                )}
            </Row>
            <Paginate pages={pages} page={page} keyword={keyword && keyword} />
            </>
            }
        </div>
    )
}

export default HomeScreen
