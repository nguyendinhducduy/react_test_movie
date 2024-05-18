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
    const saveUsername = (name) => {
        setUsername(name.username);
        setIsAuthenticate(true);
    }
    const logoutContext = () => {
        setUsername("");
        setIsAuthenticate(false);
    }
    return <AuthenticationContext.Provider value={{ username, saveUsername, isAuthenticate , logoutContext }}>{children}</AuthenticationContext.Provider>
}