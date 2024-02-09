/* eslint-disable react/prop-types */

//the above bull***  i s necesssary,else eslint go brrr



import {useState,createContext} from 'react';

const AuthContext = createContext({});


export const AuthProvider = ({children})=>{
    const [auth, setAuth] = useState({});
    
    return(
        <AuthContext.Provider value={{auth,setAuth}}>
            {children}
        </AuthContext.Provider>
    );
}


export default AuthContext;

