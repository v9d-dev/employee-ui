
import React, { useState } from "react";
import { Container, Paper, Box, Typography, TableContainer, Table, TableBody, TableHead, TableRow, TableCell, TablePagination, TableFooter } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import data from '../data/data.json';
import SearchBar from "material-ui-search-bar";

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: "81vw",
        minHeight: "100vh",
        backgroundColor: theme.palette.grey[300],
        paddingTop: theme.spacing(10),
        padding: '20px'
    },
}));
const StyledTableHead = withStyles({
    root: {
      border: '1px solid gray',
      background: '#6f59f6',
    },
  })(TableHead);
  const StyledTableContainer = withStyles({
    root: {
      border: '1px solid gray',
      '&::-webkit-scrollbar': {
        display: 'none',
      },
    },
  })(TableContainer);

  const StyledTableCell  = withStyles((theme) => ({
    root: {
      borderBottom: 'none',
      borderRight: '1px solid gray',
      svg: {
        cursor: 'pointer',
      },
      '& > button': {
        margin: 'auto',
      },
      '& > div': {
        margin: 'auto',
      },
    },
    head: {
      backgroundColor: '#007fff',
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))( TableCell);
  
  
const EmployeeDeatils = ()=> {
    const [page, setPage] = useState(0);
    const [rowPerPage, setRowPerPage] = useState(15);
    const classes = useStyles();
    const [rows, setRows] = useState(data);
    const [searched, setSearched] = useState("");

    const onChangePage = (event, newPage) => {
        setPage(newPage)

    }

    const onChangeRowsPerPage = (event) => {
        setRowPerPage(event.target.value);
    }

    const requestSearch = (searchedVal) => {
        const filteredRows = data.filter((row) => {
          return row.name.toLowerCase().includes(searchedVal.toLowerCase());
        });
        setRows(filteredRows);
      };

    const cancelSearch = () => {
        setSearched("");
        requestSearch(searched);
      };

    return (
        <>
        <paper>
        <Container className={classes.root}>
             <SearchBar
          value={searched}
          onChange={(searchVal) => requestSearch(searchVal)}
          onCancelSearch={() => cancelSearch()}
        />
            <StyledTableContainer>
                <Table>
                    <StyledTableHead>
                        <TableRow>
                            <StyledTableCell >
                                ID
                            </StyledTableCell >
                            <StyledTableCell >
                                Name
                            </StyledTableCell >
                            <StyledTableCell >
                                Email
                            </StyledTableCell >
                            <StyledTableCell >
                                Location
                            </StyledTableCell >
                            <StyledTableCell >
                                JoiningDate
                            </StyledTableCell >
                            <StyledTableCell >
                                EmoloyeeID
                            </StyledTableCell >
                        </TableRow>

                    </StyledTableHead>
                    <TableBody>
                        {rows.slice(page * rowPerPage, page * rowPerPage + rowPerPage).map((user) => (
                            <TableRow key={rows.name}>
                                <StyledTableCell >
                                    {user.id}
                                </StyledTableCell >
                                <StyledTableCell >
                                    {user.name}
                                </StyledTableCell >
                                <StyledTableCell >
                                    {user.email}
                                </StyledTableCell >
                                <StyledTableCell >
                                    {user.location}
                                </StyledTableCell >
                                <StyledTableCell >
                                    {user.phone}
                                </StyledTableCell >
                                <StyledTableCell >
                                    {user.total_orders}
                                </StyledTableCell >
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                    <TableRow>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 15, 20, 25]}
                    count={data.length}
                    rowsPerPage={rowPerPage}
                    page={page}
                    onChangePage={onChangePage}
                    onChangeRowsPerPage={onChangeRowsPerPage}
                />
                </TableRow>
                </TableFooter>
                </Table>
            </StyledTableContainer>
        </Container>
        </paper>
        </>
    );
}

export default EmployeeDeatils;