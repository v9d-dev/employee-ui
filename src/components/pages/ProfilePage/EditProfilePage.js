import React, { useState, useEffect, useContext } from 'react';
import Box from '@mui/material/Box';
import classes from './ProfilePage.module.css';
import { useSelector } from 'react-redux';
import Modal from '@mui/material/Modal';
import { Grid, TextField, Button, Card, CardContent, Typography } from '@material-ui/core';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import axios from 'axios';
import { AuthContext } from '../../store/auth-context';
import useHttps from '../../hooks/use-https';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    padding: 0,
};

const EditProfilePage = (props) => {
    const authCtx = useContext(AuthContext);
    const userDetails = useSelector((state) => state.employeeReducer);
    const [user, setUser] = useState(userDetails);
    const { isLoading, error, SendingRequest: updateUser } = useHttps();

    useEffect(() => {
        setUser(userDetails);
    }, [userDetails]);

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const { id, fullName, mailId, mobileNumber, employeeNumber, buHead, reportingManager, dateOfJoining, dateOfBirth,
        overallExperience, successiveExperience, currentDesignation, previousDesignation, earlierProject,
        currentProject, projectType, primaryKeySkill, secondaryKeySkill } = user;

    const onInputChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value })
    };

    const handleChange = (date, dateType) => {
        setUser({
          ...user,
          [dateType]: date
        })
      }
    const onSubmit = e => {
        e.preventDefault();
        updateHandler();
        handleClose();
        props.editHandler(true);
    };

    const updateHandler = async () => {
        await updateUser('patch', `employee/${props.employeeID}`, user);
    }

return (
    <>
        <Button variant="contained" className={classes.Button} color="primary" onClick={handleOpen} ><small>Edit Profile</small></Button>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Grid>
                    <Card style={{ maxWidth: 600, padding: "20px 5px", margin: "0 auto" }}>
                        <Typography gutterBottom variant="h5" align="center" style={{ margin: "12 23 55 66 " }}>
                            Edit Profile
                        </Typography>
                        <CardContent>
                            <form onSubmit={onSubmit} >
                                <Grid container spacing={1}>
                                    <Grid xs={5} item>
                                        <TextField placeholder="Name" label="Name" name="fullName" value={fullName} onChange={e => onInputChange(e)} fullWidth required />
                                    </Grid>
                                    <Grid xs={7} item>
                                        <TextField label="Email" name="mailId" value={mailId} onChange={e => onInputChange(e)} fullWidth required />
                                    </Grid>
                                    <Grid xs={5} item>
                                        <TextField label="Employee ID" name="employeeNumber" value={employeeNumber} onChange={e => onInputChange(e)} fullWidth required />
                                    </Grid>
                                    <Grid xs={7} item>
                                        <LocalizationProvider dateAdapter={AdapterDateFns} fullWidth>
                                            <DatePicker
                                                label="Date of Joining"
                                                openTo="year"
                                                name="dateOfJoining"
                                                views={['year', 'month', 'day']}
                                                value={dateOfJoining}
                                                onChange={e => handleChange(e, 'dateOfJoining')}
                                                renderInput={(params) => <TextField {...params} name='joiningDate' onChange={e => onInputChange(e)} {...params} style={{ width: "100%" }} />}
                                                fullWidth
                                            />
                                        </LocalizationProvider>
                                    </Grid>

                                    <Grid xs={5} item>
                                        <TextField label="BU Head" name='buHead' value={buHead} onChange={e => onInputChange(e)} fullWidth required />
                                    </Grid>
                                    <Grid xs={7} item>
                                        <TextField label="Reporting Manager" name='reportingManager' value={reportingManager} onChange={e => onInputChange(e)} fullWidth required />
                                    </Grid>
                                    <Grid xs={5} item>
                                        <TextField label="Phone Number" name='mobileNumber' value={mobileNumber} onChange={e => onInputChange(e)} fullWidth required />
                                    </Grid>
                                    <Grid xs={7} item>
                                        <TextField label="Successive experience" name='successiveExperience' value={successiveExperience} onChange={e => onInputChange(e)} fullWidth required />
                                    </Grid>
                                    <Grid xs={5} item>
                                        <TextField label="Over All Experience" name='overallExperience' value={overallExperience} onChange={e => onInputChange(e)} fullWidth required />
                                    </Grid>

                                    <Grid xs={7} item>
                                        <TextField label="Current Designation" name='currentDesignation' value={currentDesignation} onChange={e => onInputChange(e)} fullWidth required />
                                    </Grid>
                                    <Grid xs={5} item>
                                        <TextField label="Previous Designation" name='previousDesignation' value={previousDesignation} onChange={e => onInputChange(e)} fullWidth required />
                                    </Grid>
                                    <Grid xs={7} item>
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <DatePicker
                                                disableFuture
                                                label="Date of Birth"
                                                openTo="year"
                                                name="dateOfBirth"
                                                views={['year', 'month', 'day']}
                                                value={dateOfBirth}
                                                onChange={e => handleChange(e, 'dateOfBirth')}
                                                renderInput={(params) => <TextField {...params} name='dob' onChange={e => onInputChange(e)} style={{ width: "100%" }} />}
                                            />
                                        </LocalizationProvider>
                                    </Grid>

                                    <Grid xs={12} item>
                                        <TextField label="Project Type" name='projectType' value={projectType} onChange={e => onInputChange(e)} fullWidth required />
                                    </Grid>

                                    <Grid xs={12} item>
                                        <TextField label="Primary skills" name='primaryKeySkill' value={primaryKeySkill} onChange={e => onInputChange(e)} fullWidth required />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField label="Secondary skills" name='secondaryKeySkill' value={secondaryKeySkill} onChange={e => onInputChange(e)} fullWidth required />
                                    </Grid>

                                    <Grid xs={12} item>
                                        <TextField label="Earlier Project" name='earlierProject' value={earlierProject} onChange={e => onInputChange(e)} fullWidth required />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField label="Current Project" name='currentProject' value={currentProject} onChange={e => onInputChange(e)} fullWidth required />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button type="submit" variant="contained" color="primary" fullWidth>Submit</Button>
                                    </Grid>

                                </Grid>
                            </form>
                        </CardContent>
                    </Card>
                </Grid>
            </Box>
        </Modal>
    </>
)
}

export default EditProfilePage;