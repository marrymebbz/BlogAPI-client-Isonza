import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Banner({data}) {

    console.log(data);
    const {title, content, destination, buttonLabel} = data;

    return (
        <Row>
            <Col className="py-5 text-center">  
                <h1>{title}</h1>
                <p >{content}</p>
                <Link variant="primary"to={destination} className="bg-warning bg-gradient text-black py-2 px-5 rounded text-decoration-none text-uppercase fw-semibold">{buttonLabel}</Link>
            </Col>
        </Row>
    )
}