import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, TextField, Button, Card, CardContent, Typography } from '@material-ui/core';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import "../../../../src/global.css";
import { useParams, useHistory } from 'react-router-dom';

export default function EditCertification() {
    const [user, setUser] = useState({
        name: "",
        techStack: "",
        price: "",
        complitionDate: "",
        expireDate: "",
    });

    let history = useHistory();
    const { id } = useParams();
    const { name, techStack, price, complitionDate, expireDate } = user;

    const onInputChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value })
    };

    useEffect(() => {
        loadUser();
    }, []);


    const onSubmit = async e => {
        e.preventDefault();
        await axios.patch(`http://localhost:4000/certification/${id}`, user);
        history.push("/AddCertification")
    };

    const loadUser = async () => {
        const result = await axios.get(`http://localhost:4000/certification/${id}`);
        setUser(result.data);
    };


    return (
        <div>
            <Grid>
                <Card className='add_dtails'>
                    <Typography gutterBottom variant="h5" align="center" style={{ margin: "12 23 55 66 " }}>
                        Update your Certification Details
                    </Typography>
                    <CardContent>
                        <form>
                            <Grid container spacing={4}>
                                <Grid xs={12} item>
                                    <TextField placeholder="Enter name of your POC" label="Name" variant="outlined" fullWidth required name="name" value={name} onChange={e => onInputChange(e)} />
                                </Grid>
                                <Grid xs={12} item>
                                    <TextField placeholder="Enter tech  stack" label="Tech Stack" variant="outlined" fullWidth required name="techStack" value={techStack} onChange={e => onInputChange(e)} />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField placeholder="Enter Your Price" label="Price" variant="outlined" fullWidth required name="price" value={price} onChange={e => onInputChange(e)} />
                                </Grid>
                                <Grid item xs={6} className="cstm_date">
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DatePicker
                                            disableFuture
                                            variant="outlined"
                                            label="Start Date"
                                            openTo="year"
                                            views={['year', 'month', 'day']}
                                            name="complitionDate"
                                            value={complitionDate}
                                            onChange={e => onInputChange(e)}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item xs={6} className="cstm_date">
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DatePicker
                                            disableFuture
                                            variant="outlined"
                                            label="End Date"
                                            openTo="year"
                                            views={['year', 'month', 'day']}
                                            name="expireDate"
                                            value={expireDate}
                                            onChange={e => onInputChange(e)}
                                            renderInput={(params) => <TextField
                                                {...params} />}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item xs={6}>
                                    {/* {isError && <small className="mt-3 d-inline-block text-danger">Something went wrong. Please try again later.</small>} */}
                                    <Button type="submit" variant="contained" color="primary" fullWidth onClick={onSubmit}>update</Button>
                                </Grid>
                            </Grid>
                        </form>
                    </CardContent>
                </Card>
            </Grid>
        </div>
    );
}

