import React, { useState, useEffect, useContext } from 'react';
import { Box, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableRow, CircularProgress, styled } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import EditProfilePage from './EditProfilePage';
import { update } from '../../store/employeeDetails';
import { AuthContext } from '../../store/auth-context';
import Image from '../../Layout/Image';
import { useParams } from 'react-router-dom';
import useHttps from '../../hooks/use-https';
import Moment from 'react-moment';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(0),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const ProfilePage = (props) => {
    const [isEdited, setEdited] = useState(false);
    const authCtx = useContext(AuthContext);
    const dispatch = useDispatch();
    const { isLoading, error, SendingRequest: fetchUser } = useHttps(); 
    const userId = useParams().id;
    const employeeID = userId || authCtx.employeeID;
   
    useEffect(async () => {
        const response = await fetchUser('get', `employee/${employeeID}`);
        response.data.primaryKeySkill = response.data.primaryKeySkill.toString().replace(',', ', ');
        response.data.secondaryKeySkill = response.data.secondaryKeySkill.toString().replace(',', ', ');
        dispatch(update(response.data));
        setEdited(false);
    }, [fetchUser, isEdited]);

    const userDetails = useSelector((state) => state.employeeReducer);

    const editHandler = (flag) => {
        setEdited(flag);
    }

    const {
        id, fullName, mailId, mobileNumber, employeeNumber, buHead, reportingManager, dateOfJoining, dateOfBirth,
        overallExperience, successiveExperience, currentDesignation, previousDesignation, earlierProject,
        currentProject, projectType, primaryKeySkill, secondaryKeySkill
    } = userDetails;

    return (

        <Box sx={{ flexGrow: 1, width: "80%", float: "right", marginTop: "1%", marginRight: "2%" }}>
            {!!isLoading && <div style ={{ display:"flex", justifyContent:"center", alignItems:"center", minHeight:"600px"}} ><CircularProgress /></div>}
           {!isLoading && ([<EditProfilePage editHandler={editHandler} employeeID = {employeeID} />,
            <Grid container spacing={2}>
                <Grid item xs={6}>
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
                                    <TableRow
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row" sx={{ padding: "5px", paddingLeft: "25px", width: "25%" }}>
                                            <p style={{ fontWeight: "bold", fontSize: "16px" }}> Date of Joining</p>
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            <Moment  format="DD/MM/YYYY">{dateOfJoining}</Moment>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Item>
                </Grid>
                <Grid item xs={6}>
                    <Item>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableBody>
                                <TableRow
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row" sx={{ padding: "5px", paddingLeft: "25px", width: "25%" }}>
                                            <p style={{ fontWeight: "bold", fontSize: "16px" }}> Date Of Birth</p>
                                        </TableCell>
                                        <TableCell component="th" scope="row">     
                                            <Moment  format="DD/MM/YYYY">{dateOfBirth}</Moment>
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
                                            <p style={{ fontWeight: "bold", fontSize: "16px" }}> Project Type</p>
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {projectType}
                                        </TableCell>
                                    </TableRow>

                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Item>
                </Grid>
                <Grid item xs={12}>
                    <Item>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableBody>

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
            </Grid>])}
        </Box>
    )
}

export default ProfilePage;
