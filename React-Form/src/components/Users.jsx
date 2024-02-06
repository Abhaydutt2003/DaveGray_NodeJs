import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate.jsx";
//import {useNavigate,useLocation} from 'react-router-dom';



const User = ()=>{
    const [users,setUsers] = useState();
    const axiosPrivate = useAxiosPrivate();
    // const navigate = useNavigate();
    // const location = useLocation();
    //useEffect to get the users during the initial render
    useEffect(()=>{
        let isMounted = true;
        //use the AbortController to abort any request
        const controller = new AbortController();
        const getUsers = async()=>{
            try{
                //axios now accepts signal , which can be used to abort the request
                const response = await axiosPrivate.get('/users',{
                    signal:controller.signal
                });
                //axios has response data in the data field
                console.log(response.data);
                isMounted && setUsers(response.data);
            }catch(error){
                console.log(error);
                //navigate('/login',{state:{from:location},replace:true});
            }
        }
        getUsers();
        //cleanup function , the above code causes side effects, while this code
        //works when the items in the dependency array change, in this case, 
        //whenever the components unmounts
        return ()=>{
            isMounted = false;
            controller.abort();
        }
    },[axiosPrivate]);
    return(
        <article>
            <h2>Users List</h2>
            {users?.length ? (
                <ul>
                    {users.map((user,index)=>{
                        return <li key = {index}>{user?.username}</li>
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