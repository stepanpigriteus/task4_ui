import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { handleLogout } from '../../server/scripts';

export default function HelloUser() {
    let x = localStorage.getItem('username');
    return ( 
        <Container className='logout_container'>
            <p className='headerP'>Hello, {x}</p>
            <Button variant="link" id = "logout"  onClick={handleLogout}>Logout</Button>
        </Container>
    );
}