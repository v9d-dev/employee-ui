import React, { useState, useRef, useEffect } from 'react';
import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';
import classes from './ProfilePage.module.css';
import { useSelector, useDispatch } from 'react-redux';
import Modal from '@mui/material/Modal';
import { update, increment } from '../../store/employeeDetails';
import { Grid, TextField, Button, Card, CardContent, Typography } from '@material-ui/core';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { makeStyles, withStyles } from "@material-ui/core/styles";
import axios from 'axios';

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

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%"
    },
}));

const EditProfilePage = () => {
    const dispatch = useDispatch();
    const useStyle = useStyles();

    const userDetails = useSelector((state) => state.employeeReducer);

    const [user, setUser] = useState(userDetails);
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const { id, name, emailId, phoneNumber, employeeId, buHead, reportingManagaer, dateOfJoining, dateOfBirth,
        overAllExperience, successiveExperience, currentDesignation, previousDesignation, earlierProject,
        currentProject, projectType, primarySkills, secondraySkills } = user;

    const onInputChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value })
    };

    // useEffect(() => {
    //     // loadUser();
    // }, []);


    const onSubmit = async e => {
        e.preventDefault();
        console.log('ssssssssssssssssss', user);
        updateHandler();
        // await axios.patch(`http://localhost:4000/poc/${id}`, user);
        // history.push("/POC")
        handleClose();
    };

    const [emailId1, setEmailId] = useState(emailId);

    const [joiningDate, setJoiningDate] = useState(dateOfJoining);
    const [dob, setDob] = useState(dateOfBirth);


    const updateHandler = () => {
       dispatch(update(user));
    }


    return (
        <>
            <Button variant="contained" className={classes.Button} onClick={handleOpen} ><small>Edit Profile</small></Button>
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
                                            <TextField placeholder="Name" label="Name" name="name" value={name}  onChange ={e => onInputChange(e)} fullWidth required />
                                        </Grid>
                                         <Grid xs={7} item>
                                            <TextField label="Email" name="emailId" value={emailId} onChange ={e => onInputChange(e)} fullWidth required />
                                        </Grid>
                                       <Grid xs={5} item>
                                            <TextField label="Employee ID" name="employeeId" value={employeeId} disabled onChange ={e => onInputChange(e)} fullWidth required />
                                        </Grid>
                                        <Grid xs={7} item>
                                            <LocalizationProvider dateAdapter={AdapterDateFns} fullWidth>
                                                <DatePicker

                                                    label="Date of Joining"
                                                    openTo="year"
                                                    views={['year', 'month', 'day']}
                                                    value={joiningDate}
                                                    onChange={(newValue) => {
                                                        setJoiningDate(newValue);
                                                    }}
                                                    renderInput={(params) => <TextField {...params} name='joiningDate' onChange ={e => onInputChange(e)} {...params} style={{ width: "100%" }} />}
                                                    fullWidth
                                                />
                                            </LocalizationProvider>
                                        </Grid>

                                        <Grid xs={5} item>
                                            <TextField label="BU Head" name='buHead' value={buHead} onChange ={e => onInputChange(e)} fullWidth required />
                                        </Grid>
                                        <Grid xs={7} item>
                                            <TextField label="Reporting Manager" name='reportingManagaer' value={reportingManagaer} onChange ={e => onInputChange(e)} fullWidth required />
                                        </Grid>
                                        <Grid xs={5} item>
                                            <TextField label="Phone Number" name='phoneNumber' value={phoneNumber} onChange ={e => onInputChange(e)} fullWidth required />
                                        </Grid>
                                        <Grid xs={7} item>
                                            <TextField label="Successive experience"  name='successiveExperience'value={successiveExperience} onChange ={e => onInputChange(e)} fullWidth required />
                                        </Grid>
                                        <Grid xs={5} item>
                                            <TextField label="Over All Experience" name='overAllExperience' value={overAllExperience} onChange ={e => onInputChange(e)} fullWidth required />
                                        </Grid>

                                        <Grid xs={7} item>
                                            <TextField label="Current Designation"  name='currentDesignation' value={currentDesignation} onChange ={e => onInputChange(e)} fullWidth required />
                                        </Grid>
                                        <Grid xs={5} item>
                                            <TextField label="Previous Designation"  name='previousDesignation' value={previousDesignation} onChange ={e => onInputChange(e)} fullWidth required />
                                        </Grid>
                                        <Grid xs={7} item>
                                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                <DatePicker
                                                    disableFuture
                                                    label="Date of Birth"
                                                    openTo="year"
                                                    views={['year', 'month', 'day']}
                                                    value={dob}
                                                    onChange={(newValue) => {
                                                        setDob(newValue);
                                                    }}
                                                    renderInput={(params) => <TextField {...params} name='dob' onChange ={e => onInputChange(e)} style={{ width: "100%" }} />}
                                                />
                                            </LocalizationProvider>
                                        </Grid>

                                        <Grid xs={5} item>
                                            <TextField label="Project Type" name='projectType' value={projectType} onChange ={e => onInputChange(e)} fullWidth required />
                                        </Grid>

                                        <Grid xs={7} item>
                                            <TextField label="Current Designation" name='currentDesignation' value={currentDesignation} onChange ={e => onInputChange(e)} fullWidth required />
                                        </Grid>

                                        <Grid xs={12} item>
                                            <TextField label="Primary skills" name='primarySkills' value={primarySkills} onChange ={e => onInputChange(e)} fullWidth required />
                                        </Grid>

                                        <Grid item xs={12}>
                                            <TextField label="Secondary skills" name='secondraySkills' value={secondraySkills} onChange ={e => onInputChange(e)} fullWidth required />
                                        </Grid>

                                        <Grid xs={12} item>
                                            <TextField label="Earlier Project" name='earlierProject' value={earlierProject} onChange ={e => onInputChange(e)} fullWidth required />
                                        </Grid>

                                        <Grid item xs={12}>
                                            <TextField label="Current Project" name='currentProject' value={currentProject} onChange ={e => onInputChange(e)} fullWidth required />
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