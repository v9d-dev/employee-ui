import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import classes from './ProfilePage.module.css';


const ProfilePage = () => {
    return (
        <Card sx={{ maxWidth: '80%', minHeight: 500, marginTop: '5%', marginLeft: '18%' }}>
            {/* <CardContent> */}
            <div className={classes.divContainer1}>
                <div>
                <img src='https://lh3.googleusercontent.com/a/AATXAJwnjk6v2CYKJbfLddFJIBrup4JZD7PPizV0FKAG=s96-c' />
                </div>
                <div >
                    <p>Pankaj sharma</p>
                    <p>Phone Number - 9149205263</p>
                    <p>Email Id</p>
                    <p>Employee ID</p>
                </div>
                <div>
                    <p>Date of Joinning</p>
                    <p>Current Designation</p>
                    <p>Previous Designation</p>
                    <p>Date Of Birth</p>
                </div>
            </div>
            <div>
                    <p>Reporting Manager</p>
                    <p>BU HEAD</p>
                    <p>Over All Experience</p>
                    <p>Successive Experience</p>
                </div>
                <div>
                    <p>Earlier Project</p>
                    <p>Current Project</p>
                    <p>Project Type</p>
                    <p>Primary Key Skills</p>
                    <p>Secondray Key Skills</p>
                </div>
            {/* </CardContent> */}
        </Card>
    )
}

export default ProfilePage;