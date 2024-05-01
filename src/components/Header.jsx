import React, { useState, useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import ButtonType from '../components/button';
import HelloUser from './hello';
import { handleLogout } from '../../server/scripts';

export default function Header() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    useEffect(() => {
      const token = localStorage.getItem('jwt_token');
      if (token) {
          setIsAuthenticated(true);
      }
  }, []);
    return (
        <Navbar expand ="lg" fixed="top" className ="navbar header" bg="dark" data-bs-theme="dark">
        <Container className='element_container container-fluid'>
            <Navbar.Brand  className='navbar_brand' href ='/'> AutorizeR</Navbar.Brand>
          <Container className='container button_container'>
              {window.location.pathname.includes('home') ? <HelloUser onClick={handleLogout}/> : <ButtonType />}
          </Container>
        </Container>
        </Navbar>
    );
}