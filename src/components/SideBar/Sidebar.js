import React, { useEffect, useState, useContext } from "react";
import SidebarItems from "./SidebarItems";
import { Link, useLocation } from "react-router-dom";
import '../../../src/global.css';
import { AuthContext } from '../store/auth-context';

function Sidebar() {
    const authCtx = useContext(AuthContext);
    let location = useLocation();
    // const location = props.history.location;
    // const lastActiveIndexString = localStorage.getItem("lastActiveIndex");
    // const lastActiveIndex = Number(lastActiveIndexString);
    // const [activeIndex, setActiveIndex] = useState(lastActiveIndex || defaultActive);

    // function changeActiveIndex(newIndex) {
    //     localStorage.setItem("lastActiveIndex", newIndex)
    //     setActiveIndex(newIndex)
    // }

    // function getPath(path) {
    //     if (path.charAt(0) !== "/") {
    //         return  "/" + path;
    //     }
    //     return path;
    // }

    // useEffect(()=> {
    //     const activeItem = SidebarItems.findIndex(item=> getPath(item.route) === getPath(location.pathname))
    //     changeActiveIndex(activeItem);
    // }, [location])

    return (
        <div className="SideBar">
            <ul className="SideBarList">
                {
                    SidebarItems({ role: authCtx.role }).map((item, key) => {
                        const active = location.pathname.match(item.route)? true: false
                        return (
                            <Link to={item.route}>
                                <li index={key}
                                    className="row"
                                    id={ !!active ? "active" : ""}
                                >
                                    <div className="icon">{item.icon}</div>
                                    <div id="title">{item.name}</div>
                                </li>
                            </Link>
                        );
                    })
                }

            </ul>
        </div>
    );
}

export default Sidebar;
