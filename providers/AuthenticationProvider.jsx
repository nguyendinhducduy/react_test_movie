'use client'

import { createContext, useState, useContext, useEffect } from 'react';


const AuthenticationContext = createContext({
    username: null,
    isAuthenticate: false,
    saveUsername: (name) => { },
    logoutContext: () => { },
});

export const useAuthentication = () => {
    return useContext(AuthenticationContext)
}

export const AuthenticationProvider = ({ children }) => {
    const [username, setUsername] = useState('');
    const [isAuthenticate, setIsAuthenticate] = useState(false);

     useEffect(() => {
        setIsAuthenticate(localStorage.getItem('isLogin') === 'true');
        setUsername(localStorage.getItem('isUser') || '');
    }, []);
 

    const saveUsername = (name) => {
        setUsername(name.username);
        setIsAuthenticate(true);
        localStorage.setItem("isLogin",true) ;
        localStorage.setItem("isUser",name.username) ;
    }
    const logoutContext = () => {
        setUsername("");
        setIsAuthenticate(false);
        localStorage.setItem("isLogin",false) ;
        localStorage.setItem("isUser",null) ;
    }
    return <AuthenticationContext.Provider value={{ username, saveUsername, isAuthenticate , logoutContext }}>{children}</AuthenticationContext.Provider>
}