import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../../employeeList/employeeDetails/employee.css'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
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



const EmployeeView = (props) => {
    const [employee, setEmployee] = useState([])
    const { id } = useParams();


    useEffect(() => {
        async function getResults() {
            const results = await axios.get(`http://localhost:4000/employee/${id}`, {
                params: {
                    username: props.authCtx.employeeID,
                    password: props.authCtx.token
                }
            });
            setEmployee(results.data)
        }
        getResults()
    }, [])

    useEffect(() => {
        loadUser();
    }, []);


    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(0),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));



    const loadUser = async () => {
        const res = await axios.get(`http://localhost:4000/employee${id}`);
        console.log("result is----------------", res);
        setEmployee(res.data);
    };

    return (

        <Box sx={{ flexGrow: 1, width: "80%", float: "right", marginTop: "2%", marginRight: "2%" }}>
            <Grid container spacing={0}>
                <Grid container xs={12} sx={{ height: "100%" }}>
                    <Grid item xs={4} >
                        <Item sx={{ minHeight: "100%" }}>
                            <Image style={{ borderRadius: "20px", width: "30%", alignCenter: "center" }} />
                            <h3>{employee.fullName}</h3>
                            <h3>{employee.currentDesignation}</h3>
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
                                                {employee.fullName}
                                            </TableCell>
                                        </TableRow>

                                        <TableRow
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row" sx={{ padding: "5px", paddingLeft: "25px" }}>
                                                <p style={{ fontWeight: "bold", fontSize: "16px" }}> Email</p>
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {employee.mailId}
                                            </TableCell>
                                        </TableRow>

                                        <TableRow
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row" sx={{ padding: "5px", paddingLeft: "25px" }}>
                                                <p style={{ fontWeight: "bold", fontSize: "16px" }}> Contact Number</p>
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {employee.mobileNumber}
                                            </TableCell>
                                        </TableRow>

                                        <TableRow
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row" sx={{ padding: "5px", paddingLeft: "25px" }}>
                                                <p style={{ fontWeight: "bold", fontSize: "16px" }}> Employee ID</p>
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {employee.employeeId}
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
                                        <TableCell component="th" scope="row" sx={{ padding: "5px", paddingLeft: "25px", width: "25%" }}>
                                            <p style={{ fontWeight: "bold", fontSize: "16px" }}> Date of Joining</p>
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {employee.dateOfJoining}
                                        </TableCell>
                                    </TableRow>

                                    <TableRow
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row" sx={{ padding: "5px", paddingLeft: "25px", width: "25%" }}>
                                            <p style={{ fontWeight: "bold", fontSize: "16px" }}> date Of Birth</p>
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {employee.dateOfBirth}
                                        </TableCell>
                                    </TableRow>

                                    <TableRow
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row" sx={{ padding: "5px", paddingLeft: "25px" }}>
                                            <p style={{ fontWeight: "bold", fontSize: "16px" }}> Over All Experience</p>
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {employee.overallExperience}
                                        </TableCell>
                                    </TableRow>

                                    <TableRow
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row" sx={{ padding: "5px", paddingLeft: "25px" }}>
                                            <p style={{ fontWeight: "bold", fontSize: "16px" }}> Successive Experience</p>
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {employee.successiveExperience}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row" sx={{ padding: "5px", paddingLeft: "25px" }}>
                                            <p style={{ fontWeight: "bold", fontSize: "16px" }}> BU Head</p>
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {employee.buHead}
                                        </TableCell>
                                    </TableRow>

                                    <TableRow
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row" sx={{ padding: "5px", paddingLeft: "25px" }}>
                                            <p style={{ fontWeight: "bold", fontSize: "16px" }}> Reporting Manager</p>
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {employee.reportingManager}
                                        </TableCell>
                                    </TableRow>

                                    <TableRow
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row" sx={{ padding: "5px", paddingLeft: "25px" }}>
                                            <p style={{ fontWeight: "bold", fontSize: "16px" }}> Current Designation</p>
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {employee.currentDesignation}
                                        </TableCell>
                                    </TableRow>

                                    <TableRow
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row" sx={{ padding: "5px", paddingLeft: "25px" }}>
                                            <p style={{ fontWeight: "bold", fontSize: "16px" }}>Previous Designation</p>
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {employee.previousDesignation}
                                        </TableCell>
                                    </TableRow>


                                    <TableRow
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row" sx={{ padding: "5px", paddingLeft: "25px" }}>
                                            <p style={{ fontWeight: "bold", fontSize: "16px" }}> Earlier Project</p>
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {employee.earlierProject}
                                        </TableCell>
                                    </TableRow>

                                    <TableRow
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row" sx={{ padding: "5px", paddingLeft: "25px" }}>
                                            <p style={{ fontWeight: "bold", fontSize: "16px" }}>Current Project</p>
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {employee.currentProject}
                                        </TableCell>
                                    </TableRow>

                                    <TableRow
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row" sx={{ padding: "5px", paddingLeft: "25px" }}>
                                            <p style={{ fontWeight: "bold", fontSize: "16px" }}> Project Type</p>
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {employee.projectType}
                                        </TableCell>
                                    </TableRow>

                                    <TableRow
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row" sx={{ padding: "5px", paddingLeft: "25px" }}>
                                            <p style={{ fontWeight: "bold", fontSize: "16px" }}>Primary Key Skill</p>
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {employee.primaryKeySkill}
                                        </TableCell>
                                    </TableRow>

                                    <TableRow
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row" sx={{ padding: "5px", paddingLeft: "25px" }}>
                                            <p style={{ fontWeight: "bold", fontSize: "16px" }}>Secondary Key Skill</p>
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {employee.secondaryKeySkill}
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

export default EmployeeView;