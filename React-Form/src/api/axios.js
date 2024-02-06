import axios from 'axios';
const BASE_URL = "http://localhost:3500";


const customFetch = axios.create({
    baseURL:BASE_URL
});

//this axios private instance will be used to get the new access token from
// the refresh token that will be present in the cookies,
//also there will be a requestInterceptor that will attach the access token when fetching something
//will attach interceptors in a custom hook that does the work
export const axiosPrivate = axios.create({
    baseURL:BASE_URL,
    headers:{'Content-Type':'application/json'},
    withCredentials:true
});


export default customFetch;