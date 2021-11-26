import React, {useEffect, useState} from "react";
import SidebarItems from "./SidebarItems";
import {Link} from "react-router-dom";
import '../../src/global.css';

function Sidebar(props, {defaultActive,}) {
    const location = props.history.location;
    const lastActiveIndexString = localStorage.getItem("lastActiveIndex");
    const lastActiveIndex = Number(lastActiveIndexString);
    const [activeIndex, setActiveIndex] = useState(lastActiveIndex || defaultActive);

    function changeActiveIndex(newIndex) {
        localStorage.setItem("lastActiveIndex", newIndex)
        setActiveIndex(newIndex)
    }

    function getPath(path) {
        if (path.charAt(0) !== "/") {
            return  "/" + path;
        }
        return path;
    }

    useEffect(()=> {
        const activeItem = SidebarItems.findIndex(item=> getPath(item.route) === getPath(location.pathname))
        changeActiveIndex(activeItem);
    }, [location])

    return (
          <div className = "SideBar">
            <ul className = "SideBarList">
                  {
                      SidebarItems.map((item, index)=> {
                          return (
                              <Link to={item.route}>
                                  <li  key={item.name} className="row"
                                   active={index === activeIndex}
                                  >
                                      <div className = "icon">{item.icon}</div>
                                      <div>{item.name}</div>
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
