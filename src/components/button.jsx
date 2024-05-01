import Button from 'react-bootstrap/Button'; 
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';


export default function ButtonType() {
  

    return (
        <>
        <Container className='container button_container'>
        <Link to = "/login">
          <Button className='header_button'  variant="primary" id="login_button" > Login </Button>{' '}
        </Link>
        <Link to = "/register">
          <Button  className='header_button' variant="primary" to = '/register' id="register_button"> Register </Button>{' '}
        </Link>
        </Container>
      </>
    );
}