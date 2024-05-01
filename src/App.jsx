import React, {useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './pages/custom.css'
import Home from './pages/home';
import Login from './pages/login';
import './App.css'
import Register from './pages/register';
import PrivateRoute from './utils/router/privateRoute.jsx';

export default  function App()  {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
    useEffect(() => {
        const token = localStorage.getItem('jwt_token');
        const tokenId = localStorage.getItem('id');
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);
  return (
    <>
    <BrowserRouter basename="/">
      <Routes>
          <Route element = { <PrivateRoute/>}>
              <Route path="/home" element={<Home/> } />
          </Route>
          <Route path="/" element={<Login/> } /> 
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="*" element={
          <div>
            <h1> Ошибка 404 </h1>
          </div> } />
      </Routes>
    </BrowserRouter>
    </>
  )
}


