import customFetch from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = ()=>{
    const {setAuth} = useAuth();
    const refresh = async ()=>{
        try{
            const response = await customFetch.get('/refresh',{
                withCredentials:true//very important line as this is waht will send the httpOnly Cookie to the server
            });
            //the updated function in the useState also accepts a callback function
            setAuth((prev)=>{
                console.log(JSON.stringify(prev));
                console.log(response.data.accessToken);
                console.log(response.data.roles);
                return {...prev,
                    roles:response.data.roles,
                    accessToken:response.data.accessToken};
            });
            return response.data.accessToken;
        }catch(error){
            console.log('bIG error happen');
            console.log(error);
        }
    }
    return refresh;
}


export default useRefreshToken;