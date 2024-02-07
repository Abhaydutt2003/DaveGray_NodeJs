import { useEffect } from "react";
import { axiosPrivate } from "../api/axios";
import useRefreshToken from "./UseRefreshToken";
import useAuth from "./useAuth";

const useAxiosPrivate = ()=>{
    const refresh = useRefreshToken();
    const {auth} = useAuth();

    useEffect(()=>{
        //this interceptor will be used when making requests, that means when in 
        //the start we recieve the access token.
        const requestIntercept = axiosPrivate.interceptors.request.use((config)=>{
            if(!config.headers['Authorization']){
                config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
            }
            return config;
        },(error)=>{
            return Promise.reject(error);
        })


        const responseIntercept = axiosPrivate.interceptors.response.use((response)=>response,async (error)=>{
            //get the prev request using error.config
            const prevRequest = error?.config;
            //prevRequest?.sent will be set by us, we want this because we do not
            //want to be in a endless loops of 403 , we only want to retry once.
            if(error?.response?.status == 403 && !prevRequest?.sent){
                prevRequest.sent = true;
                const newAccessToken = await refresh();
                console.log('error did happen now the new AccessToken is ', newAccessToken);
                prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                return axiosPrivate(prevRequest);
            }  
            return Promise.reject(error);
        });

        //cleanup function, need to use this as by time there can be a huge mess 
        //when the refresh token expires a lot of times,therefore attaching a lot of 
        //interceptors
        return ()=>{
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }
    },[auth,refresh]);//pass whatever you want to use in the useEffect in the dependency array

    return axiosPrivate;
}

export default useAxiosPrivate;



