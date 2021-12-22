import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Stack from '@mui/material/Stack';
import axios from "axios";
import ButtonUnstyled, { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';
import { styled } from '@mui/system';
import { Container, Typography, TableContainer, Table, TableBody, TableHead, TableRow, TableCell, TablePagination } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import SearchBar from "material-ui-search-bar";
import { Link } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import "../../../../src/global.css";
import PreviewIcon from '@mui/icons-material/Preview';

const CustomButtonRoot = styled('button')`
  background-color: #007fff;
  padding: 15px 20px;
  border-radius: 10px;
  margin-bottom:0px;
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

function CustomButton(props) {
  return <ButtonUnstyled {...props} component={CustomButtonRoot} />;
}

export default function POC(props) {
  const [page, setPage] = useState(0);
  const [rowPerPage, setRowPerPage] = useState(15);
  const [rows, setRows] = useState([]);
  const [searched, setSearched] = useState("");
  const classes = useStyles();

 console.log("rows ==========================", rows);

  useEffect(() => {
    axios.get(`http://localhost:4000/poc`, {
      params: {
        username: props.authCtx.employeeID,
        password: props.authCtx.token
      }
    })
      .then(res => {
        setRows(res.data)
      })

  }, []);
  const onChangePage = (event, newPage) => {
    setPage(newPage)

  }

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get("http://localhost:4000/poc", {
      params: {
        username: props.authCtx.employeeID,
        password: props.authCtx.token
      }
    });
    setRows(result.data);
  };


  const requestSearch = (searchedVal) => {
    const filteredRows = rows.filter((row) => {
      return row.name.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setRows(filteredRows);
  };

  const deleteUser = async id => {
    await axios.delete(`http://localhost:4000/poc/${id}`,{
      params: {
        username: props.authCtx.employeeID,
        password: props.authCtx.token
      }
    });
    loadUsers();
    // window.location.reload();
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


  const getCsvReport = function () {
    const resData = rows.map(row => ({
      name:row.name,
      techStack: row.techStack,
      description:row.description,
      startDate:row.startDate,
      finishDate:row.finishDate,
      githubUrl:row.githubUrl,
      demoUrl:row.demoUrl,
      employee_id:row.employee_id
    }));

    const download = function (resData) {
      const blob = new Blob([resData], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.setAttribute('hidden', '');
      a.setAttribute('href', url);
      a.setAttribute('download', 'poc.csv');
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


  return (
    <>
      <Stack spacing={2} direction="row">
        <Typography variant="h4" style={{ marginRight: "66rem", color: "#5B5d5F" }}>
          POC List Table
        </Typography>
        <CustomButton onClick={navigateTo}>ADD POC</CustomButton>
        <CustomButton onClick={getCsvReport}>EXPORT</CustomButton>
      </Stack>
      <paper>
        <Container className={classes.root}>
          <div className="searchBarPoc">
            <SearchBar
              value={searched}
              onChange={(searchVal) => requestSearch(searchVal)}
              onCancelSearch={() => cancelSearch()}
            />
          </div>
          <StyledTableContainer>
          <div className ="main_table">
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
                      {user.techStack}
                    </StyledTableCell >
                    <StyledTableCell >
                      {user.description}
                    </StyledTableCell >
                    <StyledTableCell >
                      {user.startDate}
                    </StyledTableCell >
                    <StyledTableCell >
                      {user.finishDate}
                    </StyledTableCell >
                    <StyledTableCell >
                      {user.githubUrl}
                    </StyledTableCell >
                    <StyledTableCell >
                      {user.demoUrl}
                    </StyledTableCell >
                    <StyledTableCell >
                      {user.employee_id}
                    </StyledTableCell >
                    <StyledTableCell>
                  <Link class="btn btn-primary mr-2" to={`/poc/view/${user.id}`}>
                 <PreviewIcon/>
                  </Link>
                  <Link
                    class="btn btn-outline-primary mr-2"
                    to={`/poc/edit/${user.id}`}
                  >
                    <EditIcon/>
                  </Link>
                  
                  <Link
                    onClick={() => deleteUser(user.id)}
                     to="#"
                  >
                    <DeleteIcon/>
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
