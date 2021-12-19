import React, { useContext } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Certification from "./components/pages/Certfication/Certification";
import POC from "./components/pages/Poc/poc";
import NotFound from "./components/pages/NotFound";
import Layout from "./components/Layout/Layout";
import EmployeeDeatils from "./components/employeeList/employeeDetails/employeeDetails";
import AddDetails from "./components/pages/Poc/addDetails";
import { AuthContext } from './components/store/auth-context';
import LoginPage from './components/pages/LoginPage';
import HomePage from './components/pages/HomePage';
import EditPoc from "./components/pages/Poc/editPoc";
import EditCertification from "./components/pages/Certfication/editCertification";
import AddCertification from "./components/pages/Certfication/addCertification";
import ProfilePage from "./components/pages/ProfilePage/ProfilePage";
import EmployeeView from "./components/employeeList/employeeDetails/employeeView";
import "../src/global.css";

function App() {
  const authCtx = useContext(AuthContext);

  const AuthRoute = props => {
    const { isLoggedIn, type } = props;
    if (type !== "private" && !isLoggedIn) {
      return <Route path='/' exact><LoginPage /></Route>;
    }
    else if (type === "private" && !isLoggedIn) {
      return <Redirect to="/" />;
    }
    return <Route {...props} > {props.children}</Route>;
  };

  return (
    <div className="App">
      <>
        <Route render={(props) => (
          <Layout {...props}>
            <Switch>
              <AuthRoute path='/' isLoggedIn={authCtx.isLoggedIn} exact />
              <AuthRoute path='/' type="private" isLoggedIn={authCtx.isLoggedIn} authCtx={authCtx} exact><HomePage /></AuthRoute>
              <AuthRoute path='/EmployeeDetails' type="private" isLoggedIn={authCtx.isLoggedIn} exact><EmployeeDeatils /></AuthRoute>
              <AuthRoute path='/POC' type="private" isLoggedIn={authCtx.isLoggedIn} exact><POC /></AuthRoute>
              <AuthRoute path='/Certification' type="private" isLoggedIn={authCtx.isLoggedIn} exact><Certification /></AuthRoute>
              <AuthRoute path='/AddDetails' type="private" isLoggedIn={authCtx.isLoggedIn} exact><AddDetails /></AuthRoute>
              <AuthRoute path='/AddCertification' isLoggedIn={authCtx.isLoggedIn} exact><AddCertification /></AuthRoute>,
              <AuthRoute path="/poc/edit/:id" isLoggedIn={authCtx.isLoggedIn} exact><EditPoc /></AuthRoute>,
              <AuthRoute path='/certification/edit/:id' isLoggedIn={authCtx.isLoggedIn} exact><EditCertification /></AuthRoute>
              <AuthRoute path='/employee/view/:id' isLoggedIn={authCtx.isLoggedIn} exact><EmployeeView /></AuthRoute>
              <AuthRoute path='/ProfilePage' type="private" isLoggedIn={authCtx.isLoggedIn} exact><ProfilePage /></AuthRoute>
              <AuthRoute type="private" isLoggedIn={authCtx.isLoggedIn} ><NotFound /></AuthRoute>
            </Switch>
          </Layout>
        )} />
      </>
    </div >
  )
}

export default App;