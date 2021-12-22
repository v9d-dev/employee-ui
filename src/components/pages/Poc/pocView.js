import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../../pages/Poc/poc.css';

const PocView=  (props)=> {

    const [details, setDetails] = useState([])
    const { id } = useParams();

    useEffect(() => {
        async function getResults() {
          const results = await axios.get(`http://localhost:4000/poc/${id}`,{
            params: {
                username: props.authCtx.employeeID,
                password: props.authCtx.token
              }
          });
          setDetails(results.data)
        }
        getResults()
      },[])

    useEffect(() => {
        loadUser();
    }, []);
  
    const loadUser = async () => {
        const res = await axios.get(`http://localhost:4000/poc${id}`);
        console.log("result is----------------", res);
        setDetails(res.data);
    };

    return (
        <Box>            
            <Card sx={{ maxWidth: '80%', minHeight: 500, marginTop: '5%', marginLeft: '18%' }}>
                <div className="divContainer1">
                    <div>
                        <div>
                            <img src='https://lh3.googleusercontent.com/a/AATXAJwnjk6v2CYKJbfLddFJIBrup4JZD7PPizV0FKAG=s96-c' />
                        </div>
                        <div >
                            <p>Name:{details.name} </p>
                            <p>Employee Id: {details.employee_Id} </p>
                            <p>Description:{details.description} </p>      
                        </div>
                        <div>
                            <p>Tech Stack:{details.techStack} </p>    
                            <p>StartD Date: {details.startDate} </p>
                            <p>Finish Date: {details.finishDate}  </p>
                        </div>
                        <div>
                            <p>Github Url: {details.githubUrl} </p>
                            <p>Demo Url:  {details.demoUrl} </p>
                        </div>
                    </div>
                </div>
            </Card>
           </Box>
    )
}

export default PocView;