import { useContext,useDebugValue } from "react";

import AuthContext from "../Context/AuthProvider";


const useAuth = ()=>{
    const {auth} = useContext(AuthContext);
    //useDebugValue is is only useful when we want to diplay some information in the react dev tools
    useDebugValue(auth?.user?'Logged In':'Logged Out');
    return useContext(AuthContext);
}


export default useAuth;

