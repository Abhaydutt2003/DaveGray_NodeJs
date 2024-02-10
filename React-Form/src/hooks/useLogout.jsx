import customFetch from "../api/axios";
import useAuth from './useAuth';


const useLogout = ()=>{
    const {setAuth} = useAuth();
    //this will make sure that whenver the user clicks on the signOut button , the refresh token
    //is removed from the browser
    const logout = async()=>{
        setAuth({});
        //remove the presist state from the localStorage
        localStorage.removeItem('persist');
        try{
            await customFetch.get('/logout',{
                withCredentials:true
            });
        }catch(error){
            console.log(error);
        }
    }
    return logout;
}

export default useLogout;
