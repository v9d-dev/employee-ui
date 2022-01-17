import React, { useState, useEffect } from 'react';
import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableRow, CircularProgress, styled, TableHead } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../../pages/Certfication/certification.css';
import Moment from 'react-moment';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(0),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


const CertificationView = (props) => {
    const [details, setDetails] = useState([])
    const { id } = useParams();
    const ID = !!id ? id : props.id;

    useEffect(() => {
        async function getResults() {
            const results = await axios.get(`http://localhost:4000/certification/${ID}`, {
                params: {
                    username: props.authCtx.employeeID,
                    password: props.authCtx.token
                }
            });
            setDetails(results.data)
        }
        getResults()
    }, [])

    return (

        <Grid xs={12} sx={{ display:"flex", flexDirection:"column",justifyContent:"center", alignItems: "center", minHeight:"700px", width:"86%", float:"right"}}>
            <h1 style={{ textAlign: "center" }} >Certification Details</h1>
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
                                    <p style={{ fontWeight: "bold", fontSize: "16px" }}>Price :</p>
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {details.price}
                                </TableCell>
                            </TableRow>


                            <TableRow
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" sx={{ padding: "5px", paddingLeft: "25px" }}>
                                    <p style={{ fontWeight: "bold", fontSize: "16px" }}> Complition Date :</p>
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    <Moment  format="DD/MM/YYYY">{details.complitionDate}</Moment>
                                </TableCell>
                            </TableRow>

                            <TableRow
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" sx={{ padding: "5px", paddingLeft: "25px" }}>
                                    <p style={{ fontWeight: "bold", fontSize: "16px" }}> Expire Date :</p>
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    <Moment  format="DD/MM/YYYY">{details.expireDate}</Moment>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>

            </Item>
        </Grid>
    )
}

export default CertificationView;