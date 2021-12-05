import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Stack from '@mui/material/Stack';
import ButtonUnstyled, { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';
import { styled } from '@mui/system';
import { Container, Paper, Box, Typography, TableContainer, Table, TableBody, TableHead, TableRow, TableCell, TablePagination, TableFooter } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import data from '../pages/data/data.json';
import SearchBar from "material-ui-search-bar";
import "../../../src/global.css";

const CustomButtonRoot = styled('button')`
  background-color: #007fff;
  padding: 15px 20px;
  border-radius: 10px;
  color: #fff;
  font-weight: 600;
  font-family: Helvetica, Arial, sans-serif;
  font-size: 14px;
  transition: all 200ms ease;
  cursor: pointer;
  box-shadow: 0 4px 20px 0 rgba(61, 71, 82, 0.1), 0 0 0 0 rgba(0, 127, 255, 0);
  border: none;

  &:hover {
    background-color: #0059b2;
  }

  &.${buttonUnstyledClasses.active} {
    background-color: #004386;
  }

  &.${buttonUnstyledClasses.focusVisible} {
    box-shadow: 0 4px 20px 0 rgba(61, 71, 82, 0.1), 0 0 0 5px rgba(0, 127, 255, 0.5);
    outline: none;
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
    box-shadow: 0 0 0 0 rgba(0, 127, 255, 0);
  }
`;
const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: "81vw",
        minHeight: "100vh",
        backgroundColor: theme.palette.grey[300],
        paddingTop: '20px',
        padding: '0px 21px 66px 287px'
    },
}));
const StyledTableHead = withStyles({
    root: {
      border: '1px solid gray',
      backgroundColor: '#6f59f6',
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

function CustomButton(props) {
  return <ButtonUnstyled {...props} component={CustomButtonRoot} />;
}

export default function POC() {
    const [page, setPage] = useState(0);
    const [rowPerPage, setRowPerPage] = useState(15);
    const [rows, setRows] = useState(data);
    const [searched, setSearched] = useState("");
    const classes = useStyles();

    const onChangePage = (event, newPage) => {
        setPage(newPage)

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

    const onChangeRowsPerPage = (event) => {
        setRowPerPage(event.target.value);
    }
        const history = useHistory();
        const navigateTo = () => history.push('/AddDetails');
  return (
      <>
    <Stack spacing={2} direction="row">
    <Typography variant="h4" align="center" style={{marginRight: "70rem" , color:"#5B5d5F"}}>
          POC List Table
     </Typography>
      <CustomButton  onClick ={navigateTo}>ADD POC DETAILS</CustomButton>
    </Stack>
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
                                Tech Stack
                            </StyledTableCell >
                            <StyledTableCell >
                                Description
                            </StyledTableCell >
                            <StyledTableCell >
                                Start Date
                            </StyledTableCell >
                            <StyledTableCell >
                                Finsih Date
                            </StyledTableCell >
                            <StyledTableCell >
                                Github URL
                            </StyledTableCell >
                            <StyledTableCell >
                                DEMO URL
                            </StyledTableCell >
                            <StyledTableCell >
                                Employee ID
                            </StyledTableCell >
                        </TableRow>

                    </StyledTableHead>
                    <TableBody>
                        {rows.slice(page * rowPerPage, page * rowPerPage + rowPerPage).map((user) => (
                            <TableRow key = {rows.name}>
                                <StyledTableCell >
                                    {user.id}
                                </StyledTableCell >
                                <StyledTableCell >
                                    {user.name}
                                </StyledTableCell >
                                <StyledTableCell >
                                    {user.teck_stack}
                                </StyledTableCell >
                                <StyledTableCell >
                                    {user.description}
                                </StyledTableCell >
                                <StyledTableCell >
                                    {user.start_date}
                                </StyledTableCell >
                                <StyledTableCell >
                                    {user.end_date}
                                </StyledTableCell >
                                <StyledTableCell >
                                    {user.github_url}
                                </StyledTableCell >
                                <StyledTableCell >
                                    {user.demo_url}
                                </StyledTableCell >
                                <StyledTableCell >
                                    {user.employee_id}
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
