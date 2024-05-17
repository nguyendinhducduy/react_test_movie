'use client'

import { createContext, useState, useContext, useEffect } from 'react';


const AuthenticationContext = createContext({
    username: null,
    isAuthenticate: false,
    saveUsername: (name) => { },
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

    return <AuthenticationContext.Provider value={{ username, saveUsername, isAuthenticate }}>{children}</AuthenticationContext.Provider>
}