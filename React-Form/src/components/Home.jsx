import { useContext } from "react";
import AuthContext from "../Context/AuthProvider";
import { useNavigate,Link } from "react-router-dom";


const Home = ()=>{
    const {setAuth} = useContext(AuthContext);
    const navigate = useNavigate();

    const logout = async()=>{
        //if i want to logout from a lot of places, make a new component to do so
        //in this case ill just put the logic to logout here
        setAuth({});
        navigate('/linkpage');
    }
    
    return (
        <section>
            <h1>Home</h1>
            <br />
            <p>You are logged in!</p>
            <br />
            <Link to="/editor">Go to the Editor page</Link>
            <br />
            <Link to="/admin">Go to the Admin page</Link>
            <br />
            <Link to="/lounge">Go to the Lounge</Link>
            <br />
            <Link to="/linkpage">Go to the link page</Link>
            <div className="flexGrow">
                <button onClick={logout}>Sign Out</button>
            </div>
        </section>
    )

}


export default Home;