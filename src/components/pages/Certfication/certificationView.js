import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../../pages/Certfication/certification.css';

const CertificationView = (props) => {
    const [details, setDetails] = useState([])
    const { id } = useParams();

    useEffect(() => {
        async function getResults() {
            const results = await axios.get(`http://localhost:4000/certification/${id}`, {
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
        const res = await axios.get(`http://localhost:4000/certification${id}`);
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
                            <p>Name: {details.name}</p>
                            <p>Tech Stack:-{details.techStack}</p>
                            <p>Price:- {details.price}</p>
                            <p>Complition Date:-{details.name}</p>
                            <p> Expire Date : {details.complitionDate}</p>
                            <p>Employee Id: {details.employee_Id}</p>
                        </div>
                            <div>
                            </div>
                            <div>
                            </div>
                    </div>
                </div>
            </Card>
        </Box>
    )
}

export default CertificationView;