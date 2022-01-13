import React, { useState, useEffect } from 'react';
import { Box, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableRow, CircularProgress, styled, TableHead } from '@mui/material';
import Card from '@mui/material/Card';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../../pages/Poc/poc.css';
import Image from '../../Layout/Image';


const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(0),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const PocView = (props) => {

    const [details, setDetails] = useState([])
    const { id } = useParams();
    const ID = !!id ? id : props.id;

    useEffect(() => {
        async function getResults() {
            const results = await axios.get(`http://localhost:4000/poc/${ID}`, {
                params: {
                    username: props.authCtx.employeeID,
                    password: props.authCtx.token
                }
            });
            setDetails(results.data)
        }
        getResults()
    }, [])

    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        const res = await axios.get(`http://localhost:4000/poc${ID}`);
        console.log("result is----------------", res);
        setDetails(res.data);
    };

    return (
        <Grid xs={12} sx={{ display:"flex", flexDirection:"column",justifyContent:"center", alignItems: "center", minHeight:"700px", width:"86%", float:"right"}}>
            <h1 style={{ textAlign: "center" }} >POC Details</h1>
            <Item>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 1250, minHeight:"500px" }} aria-label="simple table">
                        <TableBody>

                            <TableRow
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" sx={{ padding: "5px", paddingLeft: "25px" }}>
                                    <p style={{ fontWeight: "bold", fontSize: "16px" }}> Name :</p>
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {details.name}
                                </TableCell>
                            </TableRow>
                            <TableRow
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" sx={{ padding: "5px", paddingLeft: "25px" }}>
                                    <p style={{ fontWeight: "bold", fontSize: "16px" }}>Employee Id :</p>
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {details.employee_Id}
                                </TableCell>
                            </TableRow>

                            <TableRow
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" sx={{ padding: "5px", paddingLeft: "25px" }}>
                                    <p style={{ fontWeight: "bold", fontSize: "16px" }}>Description :</p>
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {details.description}
                                </TableCell>
                            </TableRow>

                            <TableRow
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" sx={{ padding: "5px", paddingLeft: "25px" }}>
                                    <p style={{ fontWeight: "bold", fontSize: "16px" }}> Tech Stack :</p>
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {details.techStack}
                                </TableCell>
                            </TableRow>

                            <TableRow
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" sx={{ padding: "5px", paddingLeft: "25px" }}>
                                    <p style={{ fontWeight: "bold", fontSize: "16px" }}>Start Date :</p>
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {details.startDate}
                                </TableCell>
                            </TableRow>


                            <TableRow
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" sx={{ padding: "5px", paddingLeft: "25px" }}>
                                    <p style={{ fontWeight: "bold", fontSize: "16px" }}>Finish Date :</p>
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {details.finishDate}
                                </TableCell>
                            </TableRow>

                            <TableRow
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" sx={{ padding: "5px", paddingLeft: "25px" }}>
                                    <p style={{ fontWeight: "bold", fontSize: "16px" }}>Github Url :</p>
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {details.githubUrl}
                                </TableCell>
                            </TableRow>

                            <TableRow
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" sx={{ padding: "5px", paddingLeft: "25px" }}>
                                    <p style={{ fontWeight: "bold", fontSize: "16px" }}>Demo Url :</p>
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {details.demoUrl}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>

            </Item>
        </Grid>
    )
}

export default PocView;