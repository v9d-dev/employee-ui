import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import classes from './MainNavigation.module.css';
import { AuthContext } from '../store/auth-context';
import logo from '../../assets/successive_tech.png'


export const MainNavigation = () => {

    const authCtx = useContext(AuthContext);
    const isLoggedIn = authCtx.isLoggedIn;

    const logoutHandler = () => {
        authCtx.logout();
    }
    return (
        <header className={classes.header}>
            <Link to='/'>
                <div className={classes.logo}><img src={logo} alt="logo"/></div>
            </Link>
            <nav>
                <ul>
                    {isLoggedIn && <li><button onClick={logoutHandler}>Logout</button></li>}
                </ul>
            </nav>
        </header>
    )
}