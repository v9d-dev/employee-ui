import React, { useState, useEffect } from "react";
import { Container,  Typography, TableContainer, Table, TableBody, TableHead, TableRow, TableCell, TablePagination, TableFooter } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import data from '../data/data.json';
import SearchBar from "material-ui-search-bar";
import Stack from '@mui/material/Stack';
import { useButton } from '@mui/base/ButtonUnstyled';
import { styled } from '@mui/system';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import '../../../../src/global.css';
import '../../../global.css';
import axios from "axios";
import { Link } from "react-router-dom";
import PreviewIcon from '@mui/icons-material/Preview';


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
  const [rows, setRows] = useState([]);
  const [searched, setSearched] = useState("");
  // const[csvFile, setCsvFile] = ("");
  // const[csvArray, setCsvArray]= ("");
 console.log("tows", rows);
  const onChangePage = (event, newPage) => {
    setPage(newPage)

  }

  useEffect(() => {
    axios.get(`http://localhost:4000/employee`)
      .then(res => {
        setRows(res.data)
      })

  }, []);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get("http://localhost:4000/employee");
    setRows(result.data);
  };

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

  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };

  const getCsvReport = function () {

    const resData = rows.map(row => ({
      employeeNumber:row.employeeNumber,
      fullName:row.fullName,
      previousDesignation:row.previousDesignation,
      currentDesignation:row.currentDesignation,
      dateOfJoining:row.dateOfJoining,
      dateOfBirth:row.dateOfBirth,
      mailId:row.mailId,
      mobileNumber:row.mobileNumber,
      reportingManager:row.reportingManager,
      buHead:row.buHead,
      overallExperience:row.overallExperience,
      successiveExperience:row.successiveExperience,
      earlierProject:row.earlierProject,
      currentProject:row.currentProject,
      projectType:row.projectType,
      primaryKeySkill:row.primaryKeySkill,
      secondaryKeySkill:row.secondaryKeySkill,
      roleId:row.roleId
    }));

    const download = function (resData) {
      const blob = new Blob([resData], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.setAttribute('hidden', '');
      a.setAttribute('href', url);
      a.setAttribute('download', 'employee_list.csv');
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


  return (
    <>
      <paper sx={{ width: '100%', overflow: 'hidden' }}>
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
              onCancelSearch={() => cancelSearch()}
            />
          </div>
          <StyledTableContainer sx={{ maxHeight: 440 }} >
          <div className ="main_table">
            <Table>
              <StyledTableHead>
                <TableRow>
                  <StyledTableCell >
                  Employee Number
                  </StyledTableCell >
                  <StyledTableCell >
                  Full Name
                  </StyledTableCell >
                  <StyledTableCell >
                  Previous Designation
                  </StyledTableCell >
                  <StyledTableCell >
                  Current Designation
                  </StyledTableCell >
                  <StyledTableCell >
                  Date OfJoining
                  </StyledTableCell >
                  <StyledTableCell >
                  Date Of Birth
                  </StyledTableCell >
                  <StyledTableCell >
                  Email Id
                  </StyledTableCell >
                  <StyledTableCell >
                  Mobile Number
                  </StyledTableCell >
                  <StyledTableCell >
                  Reporting Manager
                  </StyledTableCell >
                  <StyledTableCell >
                  BU Head
                  </StyledTableCell >
                  <StyledTableCell >
                  Overall Experience
                  </StyledTableCell >
                  <StyledTableCell >
                  Successive Experience
                  </StyledTableCell >
                  <StyledTableCell >
                  Earlier Project
                  </StyledTableCell >
                  <StyledTableCell >
                  Current Project
                  </StyledTableCell >
                  <StyledTableCell >
                  Project Type
                  </StyledTableCell >
                  <StyledTableCell >
                  PrimaryKey Skill
                  </StyledTableCell >
                  <StyledTableCell >
                  SecondaryKey Skill
                  </StyledTableCell >
                  <StyledTableCell >
                  roleId
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
                      {user.employeeNumber}
                    </StyledTableCell >
                    <StyledTableCell >
                      {user.fullName}
                    </StyledTableCell >
                    <StyledTableCell >
                      {user.previousDesignation}
                    </StyledTableCell >
                    <StyledTableCell >
                      {user.currentDesignation}
                    </StyledTableCell >
                    <StyledTableCell >
                      {user.dateOfJoining}
                    </StyledTableCell >
                    <StyledTableCell >
                      {user.dateOfBirth}
                    </StyledTableCell >
                    <StyledTableCell >
                      {user.mailId}
                    </StyledTableCell >
                    <StyledTableCell >
                      {user.mobileNumber}
                    </StyledTableCell >
                    <StyledTableCell >
                      {user.reportingManager}
                    </StyledTableCell >
                    <StyledTableCell >
                      {user.buHead}
                    </StyledTableCell >
                    <StyledTableCell >
                      {user.overallExperience}
                    </StyledTableCell >
                    <StyledTableCell >
                      {user.successiveExperience}
                    </StyledTableCell >
                    <StyledTableCell >
                      {user.earlierProject}
                    </StyledTableCell >
                    <StyledTableCell >
                      {user.currentProject}
                    </StyledTableCell >
                    <StyledTableCell >
                      {user.projectType}
                    </StyledTableCell >
                    <StyledTableCell >
                      {user.primaryKeySkill}
                    </StyledTableCell >
                    <StyledTableCell >
                      {user.secondaryKeySkill}
                    </StyledTableCell >
                    <StyledTableCell >
                      {user.roleId}
                    </StyledTableCell >
                    <StyledTableCell>
                    <Link
                    to={`/employee/view/${user.id}`}
                    >
                    <PreviewIcon/>
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
                    count={data.length}
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

export default EmployeeDeatils;