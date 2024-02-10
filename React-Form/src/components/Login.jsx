import { useRef, useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import customFetch from "../api/axios";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Login = () => {
  const { setAuth,persist,setPersist } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  //the above stores from where the user has arrived to the login form (can be a redirect)

  const userRef = useRef();
  const errRef = useRef();

  //declare all the states
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  //function top handle form submit
  let handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await customFetch.post(
        "/auth",
        JSON.stringify({ user, pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      //for obvious reasons ,remove the line below
      console.log(JSON.stringify(response?.data));
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      setAuth({ user, pwd, roles, accessToken });
      setUser("");
      setPwd("");
      navigate(from, { replace: true }); //replace:true, because now the user will not naviagte back to the login page again
    } catch (error) {
      if (!error?.response) {
        setErrMsg("No Server Response");
      } else if (error?.response?.status == 400) {
        setErrMsg("Missing Username or password");
      } else if (error?.response?.status == 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };


  const togglePersist = ()=>{
    setPersist((prev)=>{
      return !prev;
    })
  }

  useEffect(()=>{
    localStorage.setItem('persist',persist);
  },[persist]);

  return (
    <section>
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <h1> Sign In</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          ref={userRef}
          autoComplete="off"
          onChange={(event) => setUser(event.target.value)}
          value={user}
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          onChange={(event) => setPwd(event.target.value)}
          value={pwd}
          required
        />
        <button>Sign In</button>
        <div className="persistCheck">
          <input type = "checkbox" id = "persist" onChange={togglePersist} checked = {persist}></input>
          <label htmlFor="persist">Trust This Device</label>
        </div>
      </form>
      <p>
        Do not have a account?
        <br />
        <span className="line">
          <Link to="/register">Sign Up</Link>
        </span>
      </p>
    </section>
  );
};

export default Login;
