/* eslint-disable react/prop-types */

//the above bull***  i s necesssary,else eslint go brrr



import {useState,createContext} from 'react';

const AuthContext = createContext({});


export const AuthProvider = ({children})=>{
    const [auth, setAuth] = useState({});
    //we will define persist state in the localStorage because of the security issue explained in 
    //detail in the dave gray persist login video
    const [persist,setPersist] = useState(JSON.parse(localStorage.getItem('persist')) || false);
    return(
        <AuthContext.Provider value={{auth,setAuth,persist,setPersist}}>
            {children}
        </AuthContext.Provider>
    );
}


export default AuthContext;

