import React, { useState } from "react"
import { Form, Button } from "react-bootstrap"

const RegisterLoginForm = ({ handleSubmit }) => {
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

    const submit = (e) => {
        e.preventDefault()
        handleSubmit(formData)
    }


    return (
        <Form onSubmit={submit}>
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
                Submit
            </Button>
        </Form>
    )
}

export default RegisterLoginForm