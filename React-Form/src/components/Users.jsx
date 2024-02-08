import { useEffect, useState,useRef } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate.jsx";
import {useNavigate,useLocation} from 'react-router-dom';



const User = ()=>{
    const [users,setUsers] = useState();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();
    const isMounted = useRef(true);
    //the intial render , fetch the employees from the backend
    useEffect(()=>{
        console.log('component is mounting');
        isMounted.current = true;
        //use the abort controller to abort any request
        const controller = new AbortController();
        const getUsers = async()=>{
            try{
                //axios now accepts signal , which can be used to abort the request
                const response = await axiosPrivate.get('/employees',{signal:controller.signal});
                console.log(response.data);
                isMounted.current && setUsers(response.data);
            }catch(error){
                console.log(error);
                //we might get canceled error because apparantly react uses useEffect two times 
                //that is why there is a canceled error exception,we can get rid of it by removing the 
                //React.StrictMode, or simply checking if we have got the 403 error
                if(error.response?.status == '403'){
                    //will enter here when the refresh token has expired too
                    navigate('/login',{state:{from:location},replace:true});
                }
            }
        }
        getUsers();
        //write the cleanup function for when the component unmounts
        return()=>{
            console.log('component is unmounting');
            isMounted.current = false;
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