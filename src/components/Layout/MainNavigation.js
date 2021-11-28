import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import classes from './MainNavigation.module.css';
import { AuthContext } from '../store/auth-context';
import logo from '../../assests/successive_tech.png';
import HeaderMenu from './HeaderMenu';


export const MainNavigation = () => {

    const authCtx = useContext(AuthContext);
    const isLoggedIn = authCtx.isLoggedIn;

    const logoutHandler = () => {
        authCtx.logout();
    }
    return (
        <header className={classes.header}>
            <Link to='/'>
                <img src={logo} alt="logo" />
            </Link>
            <div >
                {isLoggedIn && <HeaderMenu />}
            </div>
        </header>
    )
}