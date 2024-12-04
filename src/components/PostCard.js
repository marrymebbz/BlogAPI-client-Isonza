import React from 'react';
import PropTypes from 'prop-types';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function PostCard({ postProp }) {
  const { _id, title, content, author, creationdate} = postProp;

  return (
    <Card className="h-100">
      <Card.Body className="border border-primary">
        <Card.Title className="text-primary">{title}</Card.Title>
        <Card.Text className="mb-0"><strong>Content:</strong> {content}</Card.Text>
        <Card.Text className="mb-0"><strong>Author:</strong> {author}</Card.Text>
        <Card.Text className="mb-0"><strong>Creation Date:</strong> {creationdate}</Card.Text>
        <Link className="btn btn-warning w-100 my-2" to={`/posts/getBlog/${_id}`}>
          Details
        </Link>
        <Link className="btn btn-success w-100" to={`/posts/addComment/${_id}`}>
          Add Comment
        </Link>
      </Card.Body>
    </Card>
  );
}

PostCard.propTypes = {
  postProp: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    creationdate: PropTypes.string.isRequired
  }).isRequired,
};

export function PostList({ posts }) {
  return (
    <Container className="mt-5 mb-4">
      <div className="text-center mb-0">
        <h2>Our Posts</h2>
      </div>
      <Row className="g-4">
        {posts.map((post) => (
          <Col key={post._id} xs={12} sm={6} md={4}>
            <PostCard postProp={post} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

PostList.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      creationdate: PropTypes.string.isRequired
    })
  ).isRequired,
};
