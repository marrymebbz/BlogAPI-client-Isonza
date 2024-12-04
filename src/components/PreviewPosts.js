import { Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function PreviewPosts({ breakPoint, data }) {
  const { _id, title, content, author, creationdate} = data;

  return (
    <Col xs={12} md={breakPoint}>
      {/* Adding the class cardHighlight for min-height */}
      <Card className="cardHighlight mx-2 mb-2">
        <Card.Body>
          <Card.Title className="text-center">
          <Card.Title className="text-center">
            <Link to={`/posts/getBlog/${_id}`} className="text-decoration-none text-black">
              {title}
            </Link>
          </Card.Title>
          </Card.Title>
          <Card.Text>
            <p className="text-center pb-0 mb-1">{content}</p>
            <hr className="m-1" />
            <p className="text-center pb-0 mb-1">{author}</p>
            <hr className="m-1" />
            <p className="text-center pb-0 mb-1">{creationdate}</p>
          </Card.Text>
        </Card.Body>
        <Card.Footer className="p-0 m-0 bg-warning">
        <Link className="btn btn-warning d-block border-0 fw-semibold" to={`/posts/getBlog/${_id}`}>Quick View</Link>
        </Card.Footer>
      </Card>
    </Col>
  );
}

// Define prop types for validation
PreviewPosts.propTypes = {
  breakPoint: PropTypes.number.isRequired,
  data: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    creationdate: PropTypes.string.isRequired,
  }).isRequired,
};