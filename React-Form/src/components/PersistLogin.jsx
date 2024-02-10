import { Outlet } from "react-router-dom";
import useRefreshToken from "../hooks/UseRefreshToken";
import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth, persist } = useAuth();

  //check if there is persist login or not, which will further tell to make the api
  //call or not
  useEffect(() => {
    if (persist) console.log("persist useEffect");
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
  }, [persist]);

  useEffect(() => {
    console.log(`isLoading:${isLoading}`);
    console.log(`accessToken:${auth?.accessToken}`);
  }, [isLoading]);

  return (
    <>{!persist ? <Outlet /> : isLoading ? <p>Loading...</p> : <Outlet />}</>
  );
};

export default PersistLogin;

//logic behind -> the persist login component will send the refreshToken request through the
//useRefrehToken component, since the refresh token will persist in the browser, we will set the
//new accessToken in the auth state.
