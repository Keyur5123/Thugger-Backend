import React, { useEffect } from 'react'
import { Carousel, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { listTopProducts } from '../actions/productAcions'
import Loader from './Loader'
import Message from './Message'

function ProductCarousel() {
    const dispatch = useDispatch()
    const productTop = useSelector(state => state.productTop)
    const {loading,error,products}=productTop
    useEffect(() => {
        dispatch(listTopProducts())
    }, [])
    return loading ? <Loader/> :error ? <Message variant="danger">{error}</Message>:(
        <Carousel className="bg-dark" pause="hover">
            {products.map(product=>(
                <Carousel.Item key={product._id}>
                        <Link to={`/product/${product._id}`}>
                            <Image className="" src={product.image} fluid/>
                            <Carousel.Caption className="carousel-caption">
                                <h2>{product.name} (${product.price})</h2>
                            </Carousel.Caption>
                        </Link>
                    </Carousel.Item>
            ))}
        </Carousel>
    )
}

export default ProductCarousel
