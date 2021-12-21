import React, { Fragment, useContext } from 'react';
import { useHistory } from "react-router-dom";
import { useGoogleLogin } from 'react-google-login';
import axios from 'axios';
import { AuthContext } from '../store/auth-context';
import googleLogin from '../../assests/google-sign-in.png';
import classes from './LoginPage.module.css';


const LoginPage = () => {

  const authCtx = useContext(AuthContext);

  const history = useHistory();
  let employeeID = null;

  const responseGoogle = async (response) => {
      try {
        const emailId = response.profileObj.email;
        const found = emailId.match(/successive.tech/g)[0];

        await axios.get(`http://localhost:4000/employee/auth/${response.googleId}`)
        .then(res => {
          employeeID = !!res.data && res.data
        }).catch( (err) => {
          console.log('employee/auth ERROR===========', err)
        })

        if(!employeeID) {
          await axios.post(`http://localhost:4000/employee`, 
          // {
            // params: 
            {
              "fullName": response.profileObj.name,
              "mailId": emailId,
              "authID": response.profileObj.googleId,
              "roles": "EMPLOYEE",
            // }
          },
          // {
          //   headers: {
          //     'Authorization': response.tokenId
          //   }
          // }
          )
          .then(res => {
            employeeID = res.data.id
          }).catch( (err) => {
            console.log('employee ERROR', err)
          })
        }
  
        if (!!found && !!response.tokenId) {
          authCtx.login(response.tokenId, employeeID);
          history.push("/Home");
        }
      } catch (err) {
        throw 'PLease login with successive Mail Id'
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
            <button className={classes.button} ><img src={googleLogin} className={classes.buttonImg} alt="google login" onClick={signIn} /></button>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default LoginPage;