import { useState, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Notyf } from 'notyf';

export default function AddPost({ closeModal, addPost }) {
  const notyf = new Notyf();
  const { user } = useContext(AuthContext);

  // Input states
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [creationdate, setCreationdate] = useState("");

  // Async function to create the post
  async function createPost(e) {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!token) {
      notyf.error("You need to be logged in to add a post.");
      return;
    }

    const postData = { title, content, author, creationdate };

    try {
      const response = await fetch('https://blogapi-isonza.onrender.com/posts/addBlog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Error: ${response.status} - ${errorText}`);
        notyf.error(`Failed to add post: ${errorText}`);
        return;
      }

      const newPost = await response.json(); // Parse the response for the newly added post

      addPost(newPost); // Update the post list dynamically
      setTitle("");
      setContent("");
      setAuthor("");
      setCreationdate("");
      notyf.success("Post added successfully.");
      closeModal();
    } catch (error) {
      console.error('Error:', error);
      notyf.error("Something went wrong. Please try again.");
    }
  }

  return user ? (
    <Form onSubmit={createPost}>
      <Form.Group className="mb-3">
        <Form.Label className="fw-semibold">Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Name"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label className="fw-semibold">Content</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter content."
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label className="fw-semibold">Author</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter author."
          required
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label className="fw-semibold">Creation Date</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter creation date."
          required
          value={creationdate}
          onChange={(e) => setCreationdate(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit" className="mt-3 w-100">
        Submit
      </Button>
    </Form>
  ) : (
    <Navigate to="/posts" />
  );
}
