import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate.jsx";
import {useNavigate,useLocation} from 'react-router-dom';



const User = ()=>{
    const [users,setUsers] = useState();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();
    //TODO change the logic to get emplyees in the useEffect, using useRef might make the code better
    //the code below works perfectly when we do not use the REACT.strictMode
    // useEffect to get the users during the initial render
    useEffect(()=>{
        console.log('In use Effect');
        let isMounted = true;
        //use the AbortController to abort any request
        const controller = new AbortController();
        const getUsers = async()=>{
            try{
                //axios now accepts signal , which can be used to abort the request
                const response = await axiosPrivate.get('/employees',{
                    signal:controller.signal
                });
                //axios has response data in the data field
                console.log(response.data);
                isMounted && setUsers(response.data);
            }catch(error){
                console.log(error);
                //this is the condition when even the refresh token is expired, and we need to create a new refreshToken 
                navigate('/login',{state:{from:location},replace:true});
            }
        }
        getUsers();
        //cleanup function , the above code causes side effects, while this code
        //works when the items in the dependency array change, in this case, 
        //whenever the components unmounts
        //the cleanup function also works with each re-render, that is why there is a issue when using with strictMode
        return ()=>{
            console.log('unmouintin');
            isMounted = false;
            controller.abort();
        }
    },[]);

    return(
        <article>
            <h2>Users List</h2>
            {users?.length ? (
                <ul>
                    {users.map((user,index)=>{
                        return <li key = {index}>{user?.firstname} {user?.lastname}</li>
                    })}
                </ul>
            ):(
                <p>No users to display</p>
            )}
            <br></br>
        </article>
    );
}

export default User;