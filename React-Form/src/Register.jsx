import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfo } from "@fortawesome/free-solid-svg-icons";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {
  const userRef = useRef();
  const errRef = useRef();

  //user
  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  //password
  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState("");
  const [pwdFocus, setPwdFocus] = useState("");

  //match pwd
  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(user);
    console.log(result);
    console.log(user);
    setValidName(result);
  }, [user]);

  //can be reduced a lot , if we were not to log the result
  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    console.log(result);
    console.log(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  return (
    <section>
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <h1>Register</h1>
      <form>
        <label htmlFor="username">
            Username:
        </label>
        <input
        type="text"
        id = "username"
        ref={userRef}
        autoComplete="off"
        onChange={(event)=>setUser(event.target.value)}
        required
        onFocus={()=>setUserFocus(true)}
        onBlur={()=>setUserFocus(false)}
        aria-invalid = {validName?'false':'true'}
        aria-describedby="uidnote"
        ></input>
      </form>
    </section>
  );
};

export default Register;
