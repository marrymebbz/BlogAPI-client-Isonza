import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import LogoutButton from '../pages/LogoutButton';

export default function AppNavbar() {
    const { user } = useContext(AuthContext);  // Access user from context

    return (
        <Navbar expand="lg" className="navbar bg-primary bg-gradient text-black fw-semibold">
            <Container>
                <Navbar.Brand as={NavLink} to="/" className="fw-semibold text-white">LoveStories: Your Path to Heartfelt Connections</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto navbar">
                        <Nav.Link as={NavLink} to="/" className="text-white">Home</Nav.Link>
                            <Nav.Link as={NavLink} to="/posts" className="text-white">Posts</Nav.Link>
                        { user ? (
                            <>
                                <LogoutButton />
                            </>
                        ) : (
                            <>
                                <Nav.Link as={NavLink} to="/login" className="bg-info bg-gradient text-white fw-bold rounded px-4 me-2">Login</Nav.Link>
                                <Nav.Link as={NavLink} to="/register" className="bg-primary bg-gradient text-white fw-bold bg-danger bg-gradient rounded px-4">Register</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
