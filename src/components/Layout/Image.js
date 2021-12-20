import React, { useContext } from 'react';
import { AuthContext } from "../store/auth-context";
import jwt_decode from "jwt-decode";

const Image = (props) => {
    const authCtx = useContext(AuthContext);

    let img = jwt_decode(authCtx.token);

    return <img src={img.picture} {...props} />

}

export default Image;