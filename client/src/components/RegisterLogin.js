import React, { useState } from "react"
import { Container, Row, Col, Card, Alert, Form, Button } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import "../styles/mocha-theme.css"
import axios from "axios"

const RegisterLogin = ({ isLogin = false }) => {
    const [message, setMessage] = useState("")

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setMessage(isLogin ? "Logging in. . ." : "Registering. . .")
        try {
            const res = await axios.post(`http://localhost:7000/api/account/${isLogin ? "login" : "register"}`, formData)
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
                            {isLogin ? "Login" : "Register"}
                        </Card.Header>
                        <Card.Body>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="username">
                                    <Form.Label className="mocha-label">Username</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        required
                                        className="mocha-input"
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="email">
                                    <Form.Label className="mocha-label">Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="mocha-input"
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="password">
                                    <Form.Label className="mocha-label">Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        className="mocha-input"
                                    />
                                </Form.Group>
                                <Button
                                    type="submit"
                                    className="mocha-btn w-100"
                                >
                                    {isLogin ? "Login" : "Register"}
                                </Button>
                            </Form>
                            {message && (
                                <Alert className="mt-3 mocha-alert">
                                    {message}
                                </Alert>
                            )}
                        </Card.Body>
                        <Card.Footer className="mocha-card-footer">
                            {isLogin ?
                                (
                                    <p>Don't have an account? Register <a href="/Register">Here</a></p>
                                ) :
                                (
                                    <p>Already have an account? Login <a href="/Login">Here</a></p>
                                )
                            }
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </Container >
    )
}

export default RegisterLogin