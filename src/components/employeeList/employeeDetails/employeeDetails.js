import React, { useState } from "react";
import { Container, Paper, Box, Typography, TableContainer, Table, TableBody, TableHead, TableRow, TableCell, TablePagination, TableFooter } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import data from '../data/data.json';
import SearchBar from "material-ui-search-bar";
import Stack from '@mui/material/Stack';
import { useButton } from '@mui/base/ButtonUnstyled';
import { styled } from '@mui/system';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Button from '@mui/material/Button';
import '../../../global.css';


const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: "81vw",
    minHeight: "100vh",
    backgroundColor: theme.palette.grey[300],
    paddingTop: '5px',
    padding: '0px 21px 66px 287px'
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

const StyledTableCell = withStyles((theme) => ({
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
}))(TableCell);

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

  &.active {
    background-color: #004386;
  }

  &.focusVisible {
    box-shadow: 0 4px 20px 0 rgba(61, 71, 82, 0.1), 0 0 0 5px rgba(0, 127, 255, 0.5);
    outline: none;
  }

  &.disabled {
    opacity: 0.5;
    cursor: not-allowed;
    box-shadow: 0 0 0 0 rgba(0, 127, 255, 0);
  }
`;

const CustomButton = React.forwardRef(function CustomButton(props, ref) {
  const { children } = props;
  const { active, disabled, focusVisible, getRootProps } = useButton({
    ...props,
    ref,
    component: CustomButtonRoot,
  });

  const classes = {
    active,
    disabled,
    focusVisible,
  };

  return (
    <CustomButtonRoot {...getRootProps()} className={clsx(classes)}>
      {children}
    </CustomButtonRoot>
  );
});

CustomButton.propTypes = {
  children: PropTypes.node,
};

const EmployeeDeatils = () => {
  const [page, setPage] = useState(0);
  const [rowPerPage, setRowPerPage] = useState(15);
  const classes = useStyles();
  const [rows, setRows] = useState(data);
  const [searched, setSearched] = useState("");
  // const[csvFile, setCsvFile] = ("");
  // const[csvArray, setCsvArray]= ("");

  const onChangePage = (event, newPage) => {
    setPage(newPage)

  }

  // const processCsv = (str, delim=',')=>{
  //   const headers = str.slice(0, str.indexOf('\n')).split(delim);
  //   const rows = str.slice(str.indexOf('\n')+1).split('\n');

  //   const newArray = rows.map(row=>{
  //     const values= row.split(delim);
  //     const eachObject = headers.reduce((obj, header, i )=>{
  //       obj[header] = values[i];
  //       return obj
  //     },{})
  //     return eachObject;
  //   }) 
  //    setCsvArray(newArray);

  // }
  // const uploadCsv = ()=>{

  //   const file = csvFile;

  //   const reader = new FileReader();

  //   reader.onload = function(e){
  //     const text = e.target.result;
  //     processCsv(text);
  //     console.log(text);
  //   }
  //   reader.readAsText(file);
 
  // }
  const onChangeRowsPerPage = (event) => {
    setRowPerPage(event.target.value);
  }

  const requestSearch = (searchedVal) => {
    const filteredRows = data.filter((row) => {
      return row.name.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setRows(filteredRows);
  };

  // const cancelSearch = () => {
  //   setSearched("");
  //   requestSearch(searched);
  // };

  const getCsvReport = function () {

    const resData = rows.map(row => ({
      id: row.id,
      email: row.email,
      location: row.location

    }));

    const download = function (resData) {
      const blob = new Blob([resData], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.setAttribute('hidden', '');
      a.setAttribute('href', url);
      a.setAttribute('download', 'download.csv');
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    };

    const objectToCsv = function (resData) {
      const csvRows = []
      const headers = Object.keys(resData[0]);
      csvRows.push(headers.join(','));

      for (const row of resData) {
        const values = headers.map(header => {
          return row[header];

        });
        csvRows.push(values.join(','));
      };
      return csvRows.join('\n');
    }
    const csvData = objectToCsv(resData)
    download(csvData);
  }


  return (
    <>
      <paper >
        <Container className={classes.root} >
          <Stack spacing={2} direction="row">
            <Typography variant="h4" align="center" style={{ marginRight: "68rem", color: "#5B5d5F" }}>
             Employee List Table
            </Typography>
            <CustomButton onClick={getCsvReport}>Export</CustomButton>
          </Stack>
          <div className="searchbar">
            <SearchBar
               align="end"
              value={searched}
              onChange={(searchVal) => requestSearch(searchVal)}
              // onCancelSearch={() => cancelSearch()}
            />
          </div>
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