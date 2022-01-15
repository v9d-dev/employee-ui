import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Stack from '@mui/material/Stack';
import axios from "axios";
import { Container, Typography, Table, TableBody,TableRow,TablePagination } from "@material-ui/core";
import "../../../../src/global.css";
import { Link } from "react-router-dom";
import Moment from 'react-moment';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PreviewIcon from '@mui/icons-material/Preview';
import Filter from '../../Layout/FilterSearchBar/Filter';
import { useSelector, useDispatch } from 'react-redux';
import { updateName, updateTechStack } from '../../store/certificationFilter';
import CustomButton from "../../common/customButton";
import { useStyles, StyledTableHead, StyledTableContainer, StyledTableCell } from "../../common/tableStyle";

export default function Certification(props) {
    const [page, setPage] = useState(0);
    const [rowPerPage, setRowPerPage] = useState(15);
    const [rows, setRows] = useState([]);
    const [flag, setFlag] = useState(false);
    const classes = useStyles();
    const dispatch = useDispatch();
    const filterData = useSelector((state) => state.certificationFilterReducer);
    const employeeDetail = useSelector((state) => state.employeeReducer);

    const onChangePage = (event, newPage) => {
        setPage(newPage)

    }

    useEffect(() => {
        loadUsers();
    }, [filterData, props.authCtx]);

    const loadUsers = async () => {
        const url = employeeDetail.roles === 'EMPLOYEE' ? `certification/employee/${props.authCtx.employeeID}` : 'certification';
        const result = await axios.get(`http://localhost:4000/${url}`, {
            params: {
                username: props.authCtx.employeeID,
                password: props.authCtx.token,
                filters: {
                    ...filterData
                }
            }
        });
        setRows(result.data);
    };


    const deleteUser = async id => {
        await axios.delete(`http://localhost:4000/certification/${id}`, {
            params: {
                username: props.authCtx.employeeID,
                password: props.authCtx.token
            }
        });
        loadUsers();
        window.location.reload(true);
    };


    const onChangeRowsPerPage = (event) => {
        setRowPerPage(event.target.value);
    }

    const history = useHistory();
    const navigateTo = () => history.push('/Certification/Add');


    const getCsvReport = function () {

        const resData = rows.map(row => ({
            name: row.name,
            techStack: row.techStack,
            price: row.price,
            complitionDate: row.complitionDate,
            expireDate: row.expireDate,
            employee_id: row.employee_id
        }));

        const download = function (resData) {
            const blob = new Blob([resData], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.setAttribute('hidden', '');
            a.setAttribute('href', url);
            a.setAttribute('download', 'certification.csv');
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        };

        const objectToCsv = function (resData) {
            console.log("ssssssssssssssssss resData", resData)
            const csvRows = []
            const headers = Object.keys(resData[0]);
            csvRows.push(headers.join(','));

            for (const row of resData) {
                const values = headers.map(header => {
                    //Dont remove this commented line----  
                    // const escaped= (''+row[header]).replace(/"/g,'\\"');
                    // return `"${escaped}"`;
                    return row[header];

                });
                csvRows.push(values.join(','));
            };
            return csvRows.join('\n');
        }
        const csvData = objectToCsv(resData)
        download(csvData);
    }

    const filterHandler = (type, filterValue) => {
        if (type === 'name') {
            dispatch(updateName({ "name": filterValue }));
            setFlag(!flag);
        }
        if (type === 'techStack') {
            dispatch(updateTechStack({ 'techStack': filterValue }));
            setFlag(!flag);
        }
    }

    return (
        <>
            <Stack spacing={2} direction="row">
                <Typography variant="h4" align="center" style={{ marginRight: "55rem", color: "#5B5d5F" }}>
                    Certification List Table
                </Typography>
                <CustomButton onClick={navigateTo}>ADD CERTIFICATION</CustomButton>
                <CustomButton onClick={getCsvReport}>EXPORT</CustomButton>
            </Stack>
            <paper>
                <Container className={classes.root}>
                    {employeeDetail.roles !== 'EMPLOYEE' && <Typography style={{ display: "flex" }}>
                        <Filter filterName="Name" type="name" filterData={filterHandler} />
                        <Filter filterName="TechStack" type="techStack" filterData={filterHandler} />
                    </Typography>}
                    <StyledTableContainer>
                        <div className="main_table">
                            <Table>
                                <StyledTableHead>
                                    <TableRow>
                                        <StyledTableCell >
                                            Name
                                        </StyledTableCell >
                                        <StyledTableCell >
                                            Tech Stack
                                        </StyledTableCell >
                                        <StyledTableCell >
                                            Price
                                        </StyledTableCell >
                                        <StyledTableCell >
                                            Completion Date
                                        </StyledTableCell >
                                        <StyledTableCell >
                                            Expire Date
                                        </StyledTableCell >
                                        <StyledTableCell >
                                            Employee Id
                                        </StyledTableCell >
                                        <StyledTableCell >
                                            Actions
                                        </StyledTableCell >
                                    </TableRow>

                                </StyledTableHead>
                                <TableBody>
                                    {rows.slice(page * rowPerPage, page * rowPerPage + rowPerPage).map((user) => (
                                        <TableRow key={rows.name}>
                                            <StyledTableCell >
                                                {user.name}
                                            </StyledTableCell >
                                            <StyledTableCell >
                                                {user.techStack.toString().replace(',', ', ')}
                                            </StyledTableCell >
                                            <StyledTableCell >
                                                {user.price}
                                            </StyledTableCell >
                                            <StyledTableCell >
                                                <Moment format="DD/MM/YYYY">{user.complitionDate}</Moment>
                                            </StyledTableCell >
                                            <StyledTableCell >
                                                <Moment format="DD/MM/YYYY">{user.expireDate}</Moment>
                                            </StyledTableCell >
                                            <StyledTableCell >
                                                {user.employee_id}
                                            </StyledTableCell >
                                            <StyledTableCell>
                                                <Link class="btn btn-primary mr-2" to={`/certification/view/${user.id}`}>
                                                    <PreviewIcon color="action" />
                                                </Link>
                                                <Link
                                                    to={`/certification/edit/${user.id}`}
                                                >
                                                    <EditIcon color="action" />
                                                </Link>
                                                <Link
                                                    onClick={() => deleteUser(user.id)}
                                                    to="#"
                                                >
                                                    <DeleteIcon color="action" />
                                                </Link>
                                            </StyledTableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 15, 20, 25]}
                                count={rows.length}
                                rowsPerPage={rowPerPage}
                                page={page}
                                onChangePage={onChangePage}
                                onChangeRowsPerPage={onChangeRowsPerPage}
                            />
                        </TableRow>
                    </StyledTableContainer>
                </Container>
            </paper>
        </>
    );
}
