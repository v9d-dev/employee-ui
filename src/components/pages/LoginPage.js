import React, { Fragment, useContext } from 'react';
import { useGoogleLogin } from 'react-google-login';
import { AuthContext } from '../store/auth-context';
import googleLogin from '../../assests/google-sign-in.png';
import classes from './LoginPage.module.css';


const LoginPage = () => {

  const authCtx = useContext(AuthContext);

  const responseGoogle = (response) => {
      console.log('.............response',response);

      if (!!response.tokenId) {
        authCtx.login(response.tokenId);
      } else if(!!response.message) {
      }
  }

  const { signIn } = useGoogleLogin({
    clientId: process.env.REACT_APP_CLIENTID,
    onSuccess: responseGoogle,
    onFailure: responseGoogle,
    cookiePolicy: 'single_host_origin'
  });

  return (
    <Fragment >
      <div className={classes.container}>
        <div className={classes.card}>
          <h2>Employee Management System</h2>
          <div className={classes.subCard}>
            <h4> Sign in to start your session</h4>
            {<button onClick = {signIn}></button>}
            {/* <button className={classes.button} ><img src={googleLogin} className={classes.buttonImg} alt="google login" onClick={signIn} /></button> */}
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default LoginPage;