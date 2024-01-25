/* eslint-disable react/prop-types */
import { Navigate, useLocation, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();

  return auth?.roles?.find((role) => allowedRoles?.includes(role)) ? (
    <Outlet></Outlet>
  ) : auth?.user ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;

//state={{ from: location }}, the new location where we are going , we are 
//passing additional state data to that location
//by the above code we can pass information about the current location to next location


//the repalce is used to manage the browser history, 
//it can repalce the current entry in the history 
//stack with a new one, what this does is that the
//user cannot navigate to the previous page

