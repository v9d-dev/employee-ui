
import { React } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import RedeemIcon from '@mui/icons-material/Redeem';

const Items = [
    {
        name: "Home",
        route: '/Home',
        icon: <HomeIcon />
    },
    {
        name: "Employee List",
        route: '/EmployeeDetails',
        icon: <PeopleIcon/>
    },
    {
        name: "POC",
        route: '/POC',
        icon:<PeopleIcon/>
    },
    {
        name: "Certification",
        route: '/Certification',
        icon:<RedeemIcon/>
    },
];

const SidebarItems = (props) => {
    let list = Items.filter((item) => {
        if(props.role === 'EMPLOYEE'){
            return props.role =='EMPLOYEE'&& item.route !== '/EmployeeDetails';
        } else {
          return item;
        }
      })

    return list;
}

export default SidebarItems;
