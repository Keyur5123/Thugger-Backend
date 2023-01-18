import React from 'react'
import {Row,Container,Col} from "react-bootstrap"
function FormContainer({children}) {
    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col xs={12} md={6}>
                    {children}
                </Col>
            </Row>
        </Container>
    )
}

export default FormContainer

//sb-94743bl4126115@personal.example.com