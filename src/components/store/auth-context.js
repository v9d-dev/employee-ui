import React from 'react';
import { useState} from 'react';

export const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    login: (token) => { },
    logout: () => { }
});

const retriveStoredToken = () => {
    const storeToken = localStorage.getItem('token');
    return storeToken;
}

export const AuthContextProvider = (props) => {
    const storeToken = retriveStoredToken();
    const [token, setToken] = useState(storeToken);

    const logoutHandler = () => {
        setToken(null);
        localStorage.removeItem('token');
    }

    const loginHandler = (token) => {
        setToken(token);
        localStorage.setItem('token', token);
    }

    const contextValue = {
        token: token,
        isLoggedIn: !!token,
        login: loginHandler,
        logout: logoutHandler
    }
    return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>

}