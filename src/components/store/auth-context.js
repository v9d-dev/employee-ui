import React from 'react';
import { useState} from 'react';

export const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    employeeID: '',
    role:'',
    login: (token) => { },
    logout: () => { }
});

const retriveStoredToken = () => {
    const storeToken = localStorage.getItem('token');
    return storeToken;
}

const retriveStoredAuth = () => {
    const storeemployeeID = localStorage.getItem('employeeID');
    return storeemployeeID;
}

export const AuthContextProvider = (props) => {
    const storeToken = retriveStoredToken();
    const storeemployeeID = retriveStoredAuth();
    const [token, setToken] = useState(storeToken);
    const [employeeID, setemployeeID] = useState(storeemployeeID);
    const [role, setRole] = useState('');

    const logoutHandler = () => {
        setToken(null);
        localStorage.removeItem('token');
    }

    const loginHandler = (token, employeeID, role) => {
        setToken(token);
        setemployeeID(employeeID);
        setRole(role)
        localStorage.setItem('token', token);
        localStorage.setItem('employeeID', employeeID);
    }

    const contextValue = {
        token: token,
        isLoggedIn: !!token,
        employeeID: employeeID,
        role:role,
        login: loginHandler,
        logout: logoutHandler
    }
    return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>

}