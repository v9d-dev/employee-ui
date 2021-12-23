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
            <Card sx={{ maxWidth: '80%', minHeight: 500, marginTop: '5%', marginLeft: '18%' }} className="certification_view">
                <div className="divContainer1">
                    <div className="certification_details">
                        <div>
                            <img src='https://lh3.googleusercontent.com/a/AATXAJwehSK25ZijXShwp799RRb_WTIwN97Oyze3AoDAsA=s96-c' />
                        </div>
                        <div className="content" >
                            <p>Name :- <span style={{marginLeft:"127px"}}>{details.name}</span></p>
                            <p>Tech Stack :- <span style={{marginLeft:"78px"}}>{details.techStack}</span></p>
                            <p>Price :- <span style={{marginLeft:"136px"}}>{details.price}</span></p>
                            <p>Complition Date :- <span style={{marginLeft:"14px"}}>{details.name}</span></p>
                            <p> Expire Date :- <span style={{marginLeft:"61px"}}>{details.complitionDate}</span></p>
                            <p>Employee Id :- <span style={{marginLeft:"20px"}}>{details.employee_Id}</span></p>
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