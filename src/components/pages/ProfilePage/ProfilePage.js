import React, { useState, useEffect, useContext } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import classes from './ProfilePage.module.css';
import { useSelector, useDispatch } from 'react-redux';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import EditProfilePage from './EditProfilePage';
import { update, increment } from '../../store/employeeDetails';
import axios from 'axios';
import { AuthContext } from '../../store/auth-context';
import Image from '../../Layout/Image';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};



const ProfilePage = (props) => {

    const authCtx = useContext(AuthContext);
    const dispatch = useDispatch();


    const fetchUsers = () => {
        axios.get(`http://localhost:4000/employee/${authCtx.employeeID}`,
        {
            params: {
              username: props.authCtx.employeeID,
              password: props.authCtx.token
            }
        }).then(res => {
            dispatch(update(res.data));
        })
    }

    const userDetails = useSelector((state) => state.employeeReducer);
    const [user, setUser] = useState(userDetails);

    useEffect(() => {
        fetchUsers();
    });

    useEffect(() => {
        setUser(userDetails);
    })

    const {
        id, fullName, mailId, mobileNumber, employeeId, buHead, reportingManager, dateOfJoining, dateOfBirth,
        overallExperience, successiveExperience, currentDesignation, previousDesignation, earlierProject,
        currentProject, projectType, primaryKeySkill, secondaryKeySkill
    } = user;

    return (
        <Card sx={{ maxWidth: '80%', minHeight: 500, marginTop: '5%', marginLeft: '18%' }}>
            <div className={classes.divContainer1}>
                <div>
                    <div>
                        <Image />
                    </div>
                    <div >
                        <p>{fullName}</p>
                        <p>Phone Number:- {mobileNumber}</p>
                        <p>Email Id:- {mailId}</p>
                        <p>Employee ID:- {employeeId}</p>
                    </div>

                    <div>
                        <p>Date of Joinning: {dateOfJoining}</p>
                        <p>Current Designation: {currentDesignation} </p>
                        <p>Previous Designation: {previousDesignation}</p>
                        <p>Date Of Birth: {dateOfBirth}</p>
                    </div>
                    <div>
                        <p>Reporting Manager: {reportingManager} </p>
                        <p>BU HEAD:{buHead}</p>
                        <p>Over All Experience:{overallExperience}</p>
                        <p>Successive Experience:{successiveExperience}</p>
                    </div>
                </div>
                {/* <Button variant="contained" className={classes.Button} onClick={handleOpen} ><small>Edit Profile</small></Button> */}
                <EditProfilePage />
            </div>
            <div className={classes.divContainer2}>
                <div>
                    <Typography sx={{ fontSize: 22 }} color="text.secondary"  >
                        Earlier Project
                    </Typography>
                    <div>
                        <Typography color="text.secondary" className={classes.typography} variant="p" component="p" gutterBottom> {earlierProject}</Typography>
                    </div>
                </div>
                <div>
                    <Typography sx={{ fontSize: 22 }} color="text.secondary">
                        Current Project
                    </Typography>
                    <div>
                        <Typography color="text.secondary" className={classes.typography} variant="p" component="p" gutterBottom> {currentProject}</Typography>
                    </div>
                </div>
                <div>
                    <Typography sx={{ fontSize: 22 }} color="text.secondary">
                        Project Type
                    </Typography>
                    <div>
                        <Typography color="text.secondary" className={classes.typography} variant="p" component="p" gutterBottom> {projectType}</Typography>
                    </div>
                </div>
                <div>
                    <Typography sx={{ fontSize: 22 }} color="text.secondary">
                        Primary Key Skills
                    </Typography>
                    <div>
                        <Typography color="text.secondary" className={classes.typography} variant="p" component="p" gutterBottom> {primaryKeySkill}</Typography>
                    </div>
                </div>
                <div>
                    <Typography sx={{ fontSize: 22 }} color="text.secondary">
                        Secondray Key Skills
                    </Typography>
                    <div>
                        <Typography color="text.secondary" className={classes.typography} variant="p" component="p" gutterBottom> {secondaryKeySkill}</Typography>
                    </div>
                </div>
            </div>
        </Card>
    )
}

export default ProfilePage;