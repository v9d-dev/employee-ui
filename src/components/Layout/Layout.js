import React from 'react';
import App from '../../App';
import Sidebar from "../Sidebar";
import { MainNavigation } from "./MainNavigation";
// import Nav from "./Nav";

function Layout(props) {
    return (
        <div>
            <div>
                 <MainNavigation/>
                {/* <Sidebar history={props.history}/> */}
                <div className = "admin_main_panel">
                    {props.children}
                </div>
            </div>
        </div>
    );
}

export default Layout;



// import React, { Fragment } from "react";
// import { MainNavigation } from "./MainNavigation";
// const Layout = (props) => {
//     return (
//         <Fragment>
//          <MainNavigation/>
//          {props.children}
//         </Fragment>
//     )
// }
// export default Layout;