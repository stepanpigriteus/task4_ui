import { Navigate, Outlet } from "react-router-dom";
import { useState } from "react";

const PrivateRoute = () => {
    const isValidToken = (token) => {
        return true; 
    };
    const isAuthenticated = () => {
        const token = localStorage.getItem("jwt_token");
        return token !== null && isValidToken(token);
    };
    const [auth, setAuth] = useState(isAuthenticated());

    return (
        auth ? <Outlet/> : <Navigate to= "login"/>
    );
};

export default PrivateRoute;