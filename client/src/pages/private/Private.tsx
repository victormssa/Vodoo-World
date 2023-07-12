import jwt_decode from "jwt-decode";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from 'js-cookie';

interface DecodedToken {
  exp: number;
}

const PrivateRoute = () => {
  const hasCC = localStorage.getItem('CC');
      const ccValue = hasCC === 'true';
      let token: any;
      if (ccValue) {
        token = Cookies.get('_Usr_tk_');
      } else {
        token = localStorage.getItem('_Usr_tk_');
      }
  const isAuthenticated: DecodedToken | null = token
    ? jwt_decode(token)
    : null;
  const isTokenExpired = isAuthenticated
    ? isAuthenticated.exp < Date.now() / 1000
    : true;

  const handleAlert = () => {
    localStorage.setItem("checkError", "true");
  };

  return isAuthenticated && !isTokenExpired ? (
    <Outlet />
  ) : (
    <>
      <Navigate to="/" />
      {handleAlert()}
    </>
  );
};

export default PrivateRoute;
