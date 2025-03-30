import React, { useState } from "react"
import { Container, Row, Col, Card, Alert } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import "../styles/mocha-theme.css"
import RegisterLoginForm from "./Register-Login-Form"
import axios from "axios"

const Login = () => {

    const [message, setMessage] = useState("")

    const handleSubmit = async (formData) => {
        setMessage("Logging In. . .")
        try {
            const res = await axios.post("http://localhost:7000/api/account/login", formData)
            setMessage(res.data.message)
            sessionStorage.setItem("token", res.data.token)
        } catch (err) {
            setMessage(err.response.data.message)
        }
    }

    return (
        <Container fluid className="d-flex justify-content-center align-items-center mocha-container">
            <Row className="w-100">
                <Col md={6} lg={4} className="mx-auto">
                    <Card className="mocha-card shadow-lg">
                        <Card.Header className="mocha-card-header text-center">
                            Login
                        </Card.Header>
                        <Card.Body>
                            <RegisterLoginForm handleSubmit={handleSubmit} />
                            {message && (
                                <Alert className="mt-3 mocha-alert">
                                    {message}
                                </Alert>
                            )}
                        </Card.Body>
                        <Card.Footer className="mocha-card-footer">
                            Don't have an account? Register <a href="/Register">Here</a>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Login