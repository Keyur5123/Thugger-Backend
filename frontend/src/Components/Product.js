import React from 'react'
import {Card} from "react-bootstrap"
import products from "../products"
import Ratings from './Ratings'
function Products({product}) {
    return (
        <div >
            <Card className="mb-4 p-3 rounded" >
                
                <Card.Header>
                <a href={`product/${product._id}`}>
                        <Card.Img src={`${product.image}`} alt="image ni avti" />
                    </a>
                </Card.Header>
                <Card.Body>
                    <Card.Title as="div">
                    <a href={`product/${product._id}`}>
                        <strong>{product.name}</strong>
                    </a>
                    </Card.Title>
                    <Card.Text>
                        <Ratings rating={product.rating} reviews={`${product.numReviews} reviews`}/>
                    </Card.Text>
                </Card.Body>
                
            </Card>
        </div>
    )
}

export default Products
