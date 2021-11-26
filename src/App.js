import React, {useContext} from "react";
import {  Route, Switch } from "react-router-dom";
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
        <div className="emp_admin ">
            <Route render={(props) => (
              <Layout {...props}>
                <Switch>
                  <Route component = {LoginPage} />
                  <Route path="/Home" component={HomePage} />
                  <Route path="/EmployeeDetails" component={EmployeeDeatils} />
                  <Route path="/POC" component={POC} />
                  <Route path="/Certification" component={Certification} />
                  <Route path="/AddDetails" component={AddDetails} />
                  <Route component={NotFound} />
                </Switch>
              </Layout>
            )} />
        </div>
      </>
    </div>
  )
}

export default App;
