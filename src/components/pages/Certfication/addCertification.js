import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Grid, TextField, Button, Card, CardContent, Typography } from '@material-ui/core';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import "../../../../src/global.css";
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../store/auth-context';

export default function AddCertification(props) {
    const [name, setName] = useState('');
    const [techStack, setTechStack] = useState('');
    const [complitionDate, setComplitionDate] = useState('');
    const [expireDate, setExpireDate] = useState('');
    const [price, setPrice] = useState('');
    const [isError, setIsError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    let history = useHistory();

    const authCtx = useContext(AuthContext);

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true);
        setIsError(false);
        const data = {
            name: name,
            techStack: techStack,
            complitionDate: complitionDate,
            expireDate: expireDate,
            price: price,
            employeeId : authCtx.employeeID
        }

        axios.post('http://localhost:4000/certification', data, {
            params: {
                username: props.authCtx.employeeID,
                password: props.authCtx.token
            }
        }).then(res => {
            setData(res.data);
            setName('');
            setTechStack('');
            setComplitionDate('');
            setExpireDate('');
            setPrice('');
            setLoading(false);
        }).catch(err => {
            setLoading(false);
            setIsError(true);
        });
        history.push("/Certification");
    }

    return (
        <div>
            <Grid>
                <Card className='add_dtails'>
                    <Typography gutterBottom variant="h5" align="center" style={{ margin: "12 23 55 66 " }}>
                        Add Your Certification Details here
                    </Typography>
                    <CardContent>
                        <form>
                            <Grid container spacing={4}>
                                <Grid xs={12} item>
                                    <TextField placeholder="Enter name of your POC" label="Name" variant="outlined" fullWidth required value={name} onChange={e => setName(e.target.value)} />
                                </Grid>
                                <Grid xs={12} item>
                                    <TextField placeholder="Enter tech  stack" label="Tech Stack" variant="outlined" fullWidth required value={techStack} onChange={e => setTechStack(e.target.value)} />
                                </Grid>
                                <Grid xs={12} item>
                                    <TextField placeholder="Enter Price Of Certification" label="Price" variant="outlined" fullWidth required value={price} onChange={e => setPrice(e.target.value)} />
                                </Grid>
                                <Grid item xs={6} className="cstm_date">
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DatePicker
                                            disableFuture
                                            variant="outlined"
                                            label="Complition Date"
                                            openTo="year"
                                            views={['year', 'month', 'day']}
                                            value={complitionDate}
                                            onChange={(value) => {
                                                setComplitionDate(value)
                                            }}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item xs={6} className="cstm_date">
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DatePicker
                                            disableFuture
                                            variant="outlined"
                                            label="Expire Date"
                                            openTo="year"
                                            views={['year', 'month', 'day']}
                                            value={expireDate}
                                            onChange={(value) => {
                                                setExpireDate(value)
                                            }}
                                            renderInput={(params) => <TextField
                                                {...params} />}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item xs={6}>
                                    {isError && <small className="mt-3 d-inline-block text-danger">Something went wrong. Please try again later.</small>}
                                    <Button type="submit" variant="contained" color="primary" fullWidth onClick={handleSubmit} disabled={loading}>{loading ? 'Loading...' : 'Submit'}</Button>
                                </Grid>
                            </Grid>
                        </form>
                    </CardContent>
                </Card>
            </Grid>
        </div>
    );
}
