import React, { useContext } from 'react';
import App from '../../App';
import Sidebar from "../Sidebar";
import { MainNavigation } from "./MainNavigation";
import { AuthContext } from '../store/auth-context';

function Layout(props) {
    const authCtx = useContext(AuthContext);
    return (
        <div>
            <div>
                <MainNavigation />
                {authCtx.isLoggedIn && <Sidebar history={props.history} />}
                <div className="admin_main_panel">
                    {props.children}
                </div>
            </div>
        </div>
    );
}

export default Layout;
