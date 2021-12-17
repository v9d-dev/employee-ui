import React, { useState } from 'react';
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



const ProfilePage = () => {
    const {
        id, name, emailId, phoneNumber, employeeId, buHead, reportingManagaer, dateOfJoining, dateOfBirth,
        overAllExperience, successiveExperience, currentDesignation, previousDesignation, earlierProject,
        currentProject, projectType, primarySkills, secondraySkills
    } = useSelector((state) => state.employeeReducer);

    return (
        <Card sx={{ maxWidth: '80%', minHeight: 500, marginTop: '5%', marginLeft: '18%' }}>
            <div className={classes.divContainer1}>
                <div>
                    <div>
                        <img src='https://lh3.googleusercontent.com/a/AATXAJwnjk6v2CYKJbfLddFJIBrup4JZD7PPizV0FKAG=s96-c' />
                    </div>
                    <div >
                        <p>{name}</p>
                        <p>Phone Number:- {phoneNumber}</p>
                        <p>Email Id:- {emailId}</p>
                        <p>Employee ID:- {employeeId}</p>
                    </div>

                    <div>
                        <p>Date of Joinning: {dateOfJoining}</p>
                        <p>Current Designation: {currentDesignation} </p>
                        <p>Previous Designation: {previousDesignation}</p>
                        <p>Date Of Birth: {dateOfBirth}</p>
                    </div>
                    <div>
                        <p>Reporting Manager: {reportingManagaer} </p>
                        <p>BU HEAD:{buHead}</p>
                        <p>Over All Experience:{overAllExperience}</p>
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
                        {
                            earlierProject.map(value => <Typography color="text.secondary" className={classes.typography} variant="p" component="p" gutterBottom> {value}</Typography>)
                        }

                    </div>
                </div>
                <div>
                    <Typography sx={{ fontSize: 22 }} color="text.secondary">
                        Current Project
                    </Typography>
                    <div>
                        {currentProject.map(value => <Typography color="text.secondary" className={classes.typography} variant="p" component="p" gutterBottom> {value}</Typography>)}
                    </div>
                </div>
                <div>
                    <Typography sx={{ fontSize: 22 }} color="text.secondary">
                        Project Type
                    </Typography>
                    <div>
                        {projectType.map(value => <Typography color="text.secondary" className={classes.typography} variant="p" component="p" gutterBottom> {value}</Typography>)}
                    </div>
                </div>
                <div>
                    <Typography sx={{ fontSize: 22 }} color="text.secondary">
                        Primary Key Skills
                    </Typography>
                    <div>
                        {primarySkills.map(value => <Typography color="text.secondary" className={classes.typography} variant="p" component="p" gutterBottom> {value}</Typography>)}
                    </div>
                </div>
                <div>
                    <Typography sx={{ fontSize: 22 }} color="text.secondary">
                        Secondray Key Skills
                    </Typography>
                    <div>
                        {secondraySkills.map(value => <Typography color="text.secondary" className={classes.typography} variant="p" component="p" gutterBottom> {value}</Typography>)}
                    </div>
                </div>
            </div>
        </Card>
    )
}

export default ProfilePage;