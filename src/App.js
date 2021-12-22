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
import EditPoc from "./components/pages/Poc/editPoc";
import EditCertification from "./components/pages/Certfication/editCertification";
import AddCertification from "./components/pages/Certfication/addCertification";
import ProfilePage from "./components/pages/ProfilePage/ProfilePage";
import EmployeeView from "./components/employeeList/employeeDetails/employeeView";
import PocView from "./components/pages/Poc/pocView";
import CertificationView from "./components/pages/Certfication/certificationView";
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
              <AuthRoute path='/Home' type="private" isLoggedIn={authCtx.isLoggedIn} exact><ProfilePage  authCtx={authCtx} /></AuthRoute>
              <AuthRoute path='/EmployeeDetails' type="private" isLoggedIn={authCtx.isLoggedIn} exact><EmployeeDeatils authCtx={authCtx} /></AuthRoute>
              <AuthRoute path='/POC' type="private" isLoggedIn={authCtx.isLoggedIn} exact><POC authCtx={authCtx} /></AuthRoute>
              <AuthRoute path='/Certification' type="private" isLoggedIn={authCtx.isLoggedIn} exact><Certification authCtx={authCtx} /></AuthRoute>
              <AuthRoute path='/AddDetails' type="private" isLoggedIn={authCtx.isLoggedIn} exact><AddDetails  authCtx={authCtx}/></AuthRoute>
              <AuthRoute path='/AddCertification' isLoggedIn={authCtx.isLoggedIn} exact><AddCertification  authCtx={authCtx}/></AuthRoute>,
              <AuthRoute path="/poc/edit/:id" isLoggedIn={authCtx.isLoggedIn} exact><EditPoc  authCtx={authCtx}/></AuthRoute>,
              <AuthRoute path='/certification/edit/:id' isLoggedIn={authCtx.isLoggedIn} exact><EditCertification authCtx={authCtx} /></AuthRoute>
              <AuthRoute path='/employee/view/:id' isLoggedIn={authCtx.isLoggedIn} exact><EmployeeView authCtx={authCtx} /></AuthRoute>
              <AuthRoute path='/certification/view/:id' isLoggedIn={authCtx.isLoggedIn} exact><CertificationView authCtx={authCtx} /></AuthRoute>
              <AuthRoute path='/poc/view/:id' isLoggedIn={authCtx.isLoggedIn} exact><PocView authCtx={authCtx} /></AuthRoute>
              <AuthRoute path='/ProfilePage' type="private" isLoggedIn={authCtx.isLoggedIn} exact><ProfilePage authCtx={authCtx} /></AuthRoute>
              <AuthRoute type="private" isLoggedIn={authCtx.isLoggedIn} ><NotFound /></AuthRoute>
            </Switch>
          </Layout>
        )} />
      </>
    </div >
  )
}

export default App;