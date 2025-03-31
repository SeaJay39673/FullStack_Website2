import React, { useEffect, useState } from "react"
import { Alert, Button, Form, Row, Col, Card } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import "../styles/mocha-theme.css"
import axios from "axios"
import ApiRoute from "../ApiRoute"
import Post from "./Post"

const Home = () => {
    const token = localStorage.getItem("token")
    const [togglePost, setTogglePost] = useState(false)
    const [posts, setPosts] = useState("")
    const [showForm, setForm] = useState(false)
    const toggleForm = () => {
        setForm(!showForm)
    }

    const [formData, setFormData] = useState({ title: "", content: "" });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const createPost = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(`${ApiRoute}/posts/post`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setFormData({ title: "", content: "" })
            setForm(false)
            setTogglePost(!togglePost)
        } catch (err) {
            console.log(err)
        }

    }

    useEffect(() => {
        const getPosts = async () => {
            try {
                const res = await axios.get(`${ApiRoute}/posts/`)
                setPosts(res.data.posts)
            } catch (err) {
                console.log(err)
            }
        }
        getPosts()
    }, [togglePost])

    return (
        <Row className="justify-content-center">
            <Col className="text-center"> {/* Center content */}
                <h1>Posts</h1>
                {showForm && (
                    <Card className="mocha-card w-25 mx-auto mt-3"> {/* Center the card */}
                        <Card.Body>
                            <Form onSubmit={createPost}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="mocha-label">Title</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="title"
                                        className="mocha-input"
                                        placeholder="Enter post title"
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label className="mocha-label">Post Body</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        name="content"
                                        className="mocha-input"
                                        placeholder="Enter post content"
                                        rows={3}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                                <Button type="submit" className="mocha-btn w-100">
                                    Submit
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                )}
                {token &&
                    <Button className="mocha-btn w-25 m-3" onClick={toggleForm}>
                        {showForm ? "Hide" : "Create Post"}
                    </Button>
                }
                {posts.length === 0 ? (
                    <Alert className="mocha-alert w-25 mx-auto">No Posts Available...</Alert>
                ) : (
                    posts.map((post, index) => (
                        <Post key={index} post={post} togglePost={togglePost} setTogglePost={setTogglePost} />
                    ))
                )}
            </Col>
        </Row>
    );
}

export default Home;