import React from "react";
import { Button, Card, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/mocha-theme.css";
import axios from "axios";
import ApiRoute from "../ApiRoute";

const Post = ({ post, togglePost, setTogglePost }) => {
    const username = localStorage.getItem("username")
    const token = localStorage.getItem("token")

    const deletePost = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.delete(`${ApiRoute}/posts/post/${post._id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            setTogglePost(!togglePost)
            console.log(res)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <Card className="mocha-card w-50 mx-auto mt-4 shadow-lg">
            <Card.Header className="mocha-header">
                <Card.Title className="mocha-label display-6">{post.title}</Card.Title>
                <Card.Subtitle className="mocha-label lead">By {post.author}</Card.Subtitle>
            </Card.Header>
            <Card.Body>
                <Card.Text className="mocha-label text-justify">{post.content}</Card.Text>
            </Card.Body>
            <Card.Footer className="mocha-card-footer text-muted">
                Posted on {new Date(post.createdAt).toLocaleDateString()}
                {username === post.author &&
                    <Form className="mt-2" onSubmit={deletePost}>
                        <Button type="submit" className="mocha-btn">Delete Post</Button>
                    </Form>
                }
            </Card.Footer>
        </Card>
    );
};

export default Post;
