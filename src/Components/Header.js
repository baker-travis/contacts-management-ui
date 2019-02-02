import React from 'react';
import Navbar from 'react-bootstrap/Navbar';

export default function Header() {
    return (
        <Navbar bg="primary" variant="dark">
            <Navbar.Brand>Contacts Manager</Navbar.Brand>
        </Navbar>
    );
}