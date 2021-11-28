import React, { useContext } from "react";
import { Route, Switch } from "react-router-dom";
import Certification from "./components/pages/Certification";
import POC from "./components/pages/poc";
import NotFound from "./components/pages/NotFound";
import Layout from "./components/Layout/Layout";
import EmployeeDeatils from "./components/employeeList/employeeDetails/employeeDetails";
import AddDetails from "./components/pages/addDetails";
import { AuthContext } from './components/store/auth-context';
import LoginPage from './components/pages/LoginPage';
import HomePage from './components/pages/HomePage';
import "../src/global.css";

function App() {
  const authCtx = useContext(AuthContext);
  return (
    <div className="App">
      <>
          <Route render={(props) => (
            <Layout {...props}>
              <Switch>
                {!authCtx.isLoggedIn && (
                  <Route path='/' exact><LoginPage /></Route>
                )}
                <Route path='/' exact><HomePage /></Route>
                <Route path='/EmployeeDetails' exact><EmployeeDeatils /></Route>
                <Route path='/POC' exact><POC /></Route>,
                <Route path='/Certification' exact><Certification /></Route>,
                <Route path='/AddDetails' exact><AddDetails /></Route>,
                <Route><NotFound/></Route>
              </Switch>
            </Layout>
          )} />
      </>
    </div>
  )
}

export default App;
