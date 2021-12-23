import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../../pages/Poc/poc.css';

const PocView = (props) => {

    const [details, setDetails] = useState([])
    const { id } = useParams();

    useEffect(() => {
        async function getResults() {
            const results = await axios.get(`http://localhost:4000/poc/${id}`, {
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
        const res = await axios.get(`http://localhost:4000/poc${id}`);
        console.log("result is----------------", res);
        setDetails(res.data);
    };

    return (
        <Box>
            <Card sx={{ maxWidth: '80%', minHeight: 500, marginTop: '5%', marginLeft: '18%' }} className="poc_view">
                <div className="divContainer1">
                    <div className="poc_details">
                        <div>
                            <img src='https://lh3.googleusercontent.com/a/AATXAJwehSK25ZijXShwp799RRb_WTIwN97Oyze3AoDAsA=s96-c' />
                        </div>
                        <div className="poc_content">
                            <p>Name: -<span style={{marginLeft:"9rem"}}>{details.name}</span> </p>
                            <p>Employee Id:- <span style={{marginLeft:"127px"}}>{details.employee_Id}</span> </p>
                            <p>Description:-<span style={{marginLeft:"5rem"}}>{details.description}</span> </p>
                            <p>Tech Stack:- <span style={{marginLeft:"5.3rem"}}>{details.techStack}</span> </p>
                            <p>Start Date:- <span style={{marginLeft:"5.2rem"}}>{details.startDate}</span> </p>
                            <p>Finish Date:- <span style={{marginLeft:"4.6rem"}}>{details.finishDate}</span>  </p>
                            <p>Github Url:- <span style={{marginLeft:"5rem"}}>{details.githubUrl} </span></p>
                            <p>Demo Url:- <span style={{marginLeft:"5rem"}}> {details.demoUrl}</span> </p>
                        </div>
                    </div>
                </div>
            </Card>
        </Box>
    )
}

export default PocView;