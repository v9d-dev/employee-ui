import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import classes from './ProfilePage.module.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';

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
          const results = await axios.get(`http://localhost:4000/employee/${id}`,{
            params: {
                username: props.authCtx.employeeID,
                password: props.authCtx.token
              }
          });
          setEmployee(results.data)
        }
        getResults()
      },[])

    useEffect(() => {
        loadUser();
    }, []);



    const loadUser = async () => {
        const res = await axios.get(`http://localhost:4000/employee${id}`);
        console.log("result is----------------", res);
        setEmployee(res.data);
    };

    return (
        <Box>
             
            <Card sx={{ maxWidth: '80%', minHeight: 500, marginTop: '5%', marginLeft: '18%' }}>
            {/* { employee.map((user)=>( */}
                <div className={classes.divContainer1}>
                    <div>
                        <div>
                            <img src='https://lh3.googleusercontent.com/a/AATXAJwnjk6v2CYKJbfLddFJIBrup4JZD7PPizV0FKAG=s96-c' />
                        </div>
                        <div >
                            {/* <p>{name}</p> */}
                            <p>Name: {employee.fullName}</p>
                            <p>Phone Number:- {employee.mobileNumber}</p>
                            <p>Email Id:- {employee.mailId}</p>
                            <p>Employee ID:- {employee.employeeNumber}</p>
                            <p> Roll ID : {employee.roleId}</p>  
                            <p>Project Type:  {employee.projectType}</p>          
                        </div>
                        <div>
                            <p>Date of Joinning: {employee.dateOfJoining}</p>
                            <p>Current Designation: {employee.currentDesignation} </p>
                            <p>Previous Designation: {employee.previousDesignation}</p>
                            <p>Date Of Birth: {employee.dateOfBirth}</p>
                            <p>Primary Key Skills: {employee.primaryKeySkill}</p>
                            <p> Current Project: {employee.currentProject}</p>
                        </div>
                        <div>
                            <p>Reporting Manager: {employee.reportingManager} </p>
                            <p>BU HEAD:{employee.buHead}</p>
                            <p>Over All Experience:{employee.overallExperience}</p>
                            <p>Successive Experience:{employee.successiveExperience}</p>
                            <p> Secondary Key Skills: {employee.secondaryKeySkill}</p>
                            <p> Earlier Project: {employee.earlierProject}</p>
                           
                        </div>
                    </div>
                    {/* <Button variant="contained" className={classes.Button} onClick={handleOpen} ><small>Edit Profile</small></Button> */}
                </div>
                  {/* ))}  */}
            </Card>
           </Box>
    )
}

export default EmployeeView;