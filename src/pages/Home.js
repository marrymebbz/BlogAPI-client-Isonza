import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

export default function Home() {

    return (
        <>
            <Row
                className="text-white py-5 text-center main-banner d-flex justify-content-center align-items-center mx-auto"
                style={{ backgroundImage: 'url(/images/cinema_bg.jpg)', backgroundBlendMode: 'multiply' }}
            >
                <Col className="container">  
                    <p className="text-uppercase fw-bold mb-2 text-warning">Best BLOGS App</p>
                    <h1 className="fs-2 mb-0">Welcome to LoveStories, your guide to beautiful tales and cherished moments.</h1>
                    <p className="fs-4 mb-3">Discover inspiring love tales or rekindle passion with LoveStories by your side.</p>
                    <Link 
                        to="/posts" 
                        className="m-0 py-2 px-5 w-100 border fw-semibold text-decoration-none rounded text-black text-uppercase bg-warning bg-gradient border-0"
                        >Check now!
                    </Link>
                </Col>
            </Row>
            <Row className="py-5 text-center mx-auto d-flex justify-content-center align-items-center container">
                <Col>  
                    <h2 className="text-uppercase fw-bold text-primary">--- About our App ---</h2>
                    <p>At LoveStories, we celebrate love in all its forms with heartfelt articles, curated collections, and expert advice. From finding romance to nurturing relationships, LoveStories is your ultimate platform for meaningful connections and inspiration. Start your journey today and experience the magic of love in every story!</p>
                </Col>
            </Row>
            <Footer />
        </>
    )
}