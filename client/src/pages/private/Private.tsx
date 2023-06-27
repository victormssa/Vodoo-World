import jwt_decode from "jwt-decode";
import { Navigate, Outlet } from "react-router-dom";

interface DecodedToken {
  exp: number;
}

const PrivateRoute = () => {
  const token = localStorage.getItem("_Usr_Tk_");
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
