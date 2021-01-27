import React from 'react'
import {Row,Col} from "react-bootstrap"
import products from "../products"
import Product from "../Components/Product"
function HomeScreen() {
    return (
        <div>
            <Row>
                {products.map((product)=>(
                    <Col lg={3} md={4} sm={6} xs={12}>
                        <Product product={product}/>
                    </Col>
                )
                    )}
            </Row>
        </div>
    )
}

export default HomeScreen
