import React from 'react'
import {Card} from "react-bootstrap"
import {Link} from "react-router-dom"
import Ratings from './Ratings'
function Products({product}) {
    return (
        <div >
            <Card className="mb-4 p-3 rounded" >
                
                <Card.Header>
                <Link to={`product/${product._id}`}>
                        <Card.Img src={`${product.image}`} alt="image ni avti" />
                    </Link>
                </Card.Header>
                <Card.Body>
                    <Card.Title as="div">
                    <Link to={`product/${product._id}`}>
                        <strong>{product.name}</strong>
                    </Link>
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
