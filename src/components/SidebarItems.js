
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import RedeemIcon from '@mui/icons-material/Redeem';

const SidebarItems = [
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
        route: '/page-2',
        icon:<RedeemIcon/>
    },
];

export default SidebarItems;
