import { Outlet } from "react-router-dom";
import useRefreshToken from "../hooks/UseRefreshToken";
import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);
  }, []);

  useEffect(() => {
    console.log(`isLoading:${isLoading}`);
    console.log(`accessToken:${auth?.accessToken}`);
  }, [isLoading]);

  return <>{isLoading ? <p>Loading</p> : <Outlet></Outlet>}</>;
};

export default PersistLogin;

//logic behind -> the persist login component will send the refreshToken request through the
//useRefrehToken component, since the refresh token will persist in the browser, we will set the 
//new accessToken in the auth state.