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
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { fontWeight } from '@mui/system';

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

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(0),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


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
        id, fullName, mailId, mobileNumber, employeeNumber, buHead, reportingManager, dateOfJoining, dateOfBirth,
        overallExperience, successiveExperience, currentDesignation, previousDesignation, earlierProject,
        currentProject, projectType, primaryKeySkill, secondaryKeySkill
    } = user;

    return (

        <Box sx={{ flexGrow: 1, width: "80%", float: "right", marginTop: "2%", marginRight: "2%" }}>
            <EditProfilePage />
            <Grid container spacing={0}>
                <Grid container xs={12} sx={{height:"100%"}}>
                <Grid item xs={4} >
                    <Item sx={{ minHeight: "100%",  }}>
                        <Image style={{ borderRadius: "20px", marginTop:"15%", width: "30%", alignCenter:"center" }} />
                    </Item>
                </Grid>
                <Grid item xs={8}>
                    <Item>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableBody>
                                    <TableRow
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row" sx={{ padding: "5px", paddingLeft: "25px" }}>
                                            <p style={{ fontWeight: "bold", fontSize: "16px" }}> Full Name</p>
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {fullName}
                                        </TableCell>
                                    </TableRow>

                                    <TableRow
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row" sx={{ padding: "5px", paddingLeft: "25px" }}>
                                            <p style={{ fontWeight: "bold", fontSize: "16px" }}> Email</p>
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {mailId}
                                        </TableCell>
                                    </TableRow>

                                    <TableRow
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row" sx={{ padding: "5px", paddingLeft: "25px" }}>
                                            <p style={{ fontWeight: "bold", fontSize: "16px" }}> Contact Number</p>
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {mobileNumber}
                                        </TableCell>
                                    </TableRow>

                                    <TableRow
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row" sx={{ padding: "5px", paddingLeft: "25px" }}>
                                            <p style={{ fontWeight: "bold", fontSize: "16px" }}> Employee ID</p>
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {employeeNumber}
                                        </TableCell>
                                    </TableRow>

                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Item>
                </Grid>
                </Grid>


                <Grid item xs={12}>
                    <Item>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableBody>
                                    <TableRow
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row" sx={{ padding: "5px", paddingLeft: "25px", width:"25%" }}>
                                            <p style={{ fontWeight: "bold", fontSize: "16px" }}> Date of Joining</p>
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {dateOfJoining}
                                        </TableCell>
                                    </TableRow>

                                    <TableRow
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row" sx={{ padding: "5px", paddingLeft: "25px", width:"25%" }}>
                                            <p style={{ fontWeight: "bold", fontSize: "16px" }}> date Of Birth</p>
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {dateOfBirth}
                                        </TableCell>
                                    </TableRow>

                                    <TableRow
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row" sx={{ padding: "5px", paddingLeft: "25px" }}>
                                            <p style={{ fontWeight: "bold", fontSize: "16px" }}> Over All Experience</p>
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {overallExperience}
                                        </TableCell>
                                    </TableRow>

                                    <TableRow
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row" sx={{ padding: "5px", paddingLeft: "25px" }}>
                                            <p style={{ fontWeight: "bold", fontSize: "16px" }}> Successive Experience</p>
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {successiveExperience}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row" sx={{ padding: "5px", paddingLeft: "25px" }}>
                                            <p style={{ fontWeight: "bold", fontSize: "16px" }}> BU Head</p>
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {buHead}
                                        </TableCell>
                                    </TableRow>

                                    <TableRow
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row" sx={{ padding: "5px", paddingLeft: "25px" }}>
                                            <p style={{ fontWeight: "bold", fontSize: "16px" }}> Reporting Manager</p>
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {reportingManager}
                                        </TableCell>
                                    </TableRow>

                                    <TableRow
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row" sx={{ padding: "5px", paddingLeft: "25px" }}>
                                            <p style={{ fontWeight: "bold", fontSize: "16px" }}> Current Designation</p>
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {currentDesignation}
                                        </TableCell>
                                    </TableRow>

                                    <TableRow
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row" sx={{ padding: "5px", paddingLeft: "25px" }}>
                                            <p style={{ fontWeight: "bold", fontSize: "16px" }}>Previous Designation</p>
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {previousDesignation}
                                        </TableCell>
                                    </TableRow>


                                    <TableRow
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row" sx={{ padding: "5px", paddingLeft: "25px" }}>
                                            <p style={{ fontWeight: "bold", fontSize: "16px" }}> Earlier Project</p>
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {earlierProject}
                                        </TableCell>
                                    </TableRow>

                                    <TableRow
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row" sx={{ padding: "5px", paddingLeft: "25px" }}>
                                            <p style={{ fontWeight: "bold", fontSize: "16px" }}>Current Project</p>
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {currentProject}
                                        </TableCell>
                                    </TableRow>

                                    <TableRow
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row" sx={{ padding: "5px", paddingLeft: "25px" }}>
                                            <p style={{ fontWeight: "bold", fontSize: "16px" }}> Project Type</p>
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {projectType}
                                        </TableCell>
                                    </TableRow>

                                    <TableRow
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row" sx={{ padding: "5px", paddingLeft: "25px" }}>
                                            <p style={{ fontWeight: "bold", fontSize: "16px" }}>Primary Key Skill</p>
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {primaryKeySkill}
                                        </TableCell>
                                    </TableRow>

                                    <TableRow
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row" sx={{ padding: "5px", paddingLeft: "25px" }}>
                                            <p style={{ fontWeight: "bold", fontSize: "16px" }}>Secondary Key Skill</p>
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {secondaryKeySkill}
                                        </TableCell>
                                    </TableRow>

                                </TableBody>
                            </Table>
                        </TableContainer>

                    </Item>
                </Grid>
            </Grid>
        </Box>
    )
}

export default ProfilePage;
