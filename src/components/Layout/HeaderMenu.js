import React, {useContext} from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { NavLink } from "react-router-dom";

import jwt_decode from "jwt-decode";
import { AuthContext } from "../store/auth-context";
import classes from './HeaderMenu.module.css';

export default function HeaderMenu() {

  const authCtx = useContext(AuthContext);

  let userData = jwt_decode(authCtx.token);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutHandler = () => {
    setAnchorEl(null);
      authCtx.logout();
  }

  return (
    <>
      <button
        id="basic-button"
        onClick={handleClick}
        className={classes.button}
      >
         <p>{userData.name}</p><img src={userData.picture} width="25%"/>
      </button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }} 
      >
        <MenuItem onClick={handleClose}><NavLink to="/ProfilePage" className={classes.link}>My Profile</NavLink></MenuItem>
        <MenuItem onClick={logoutHandler}> <NavLink to="/" className={classes.link}>Logout</NavLink></MenuItem>
      </Menu>
    </>
  );
}
