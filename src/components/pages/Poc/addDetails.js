import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Grid, TextField, Button, Card, CardContent, Typography } from '@material-ui/core';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import "../../../../src/global.css";
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../store/auth-context';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';

export default function AddDetails(props) {
  const [startDate, setStartDate] = useState('');
  const [finishDate, setFinishDate] = useState('');
  const [name, setName] = useState('');
  const [description, setDescrption] = useState('');
  const [techStack, setTechStack] = useState('');
  const [githubUrl, setgithubUrl] = useState('');
  const [demoUrl, setdemoUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState(null);
  let history = useHistory();

  const authCtx = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true);
    setIsError(false);
    const data = {
      name: name,
      description: description,
      finishDate: finishDate,
      startDate: startDate,
      techStack: techStack,
      githubUrl: githubUrl,
      demoUrl: demoUrl,
      employeeId: authCtx.employeeID
    }

    axios.post('http://localhost:4000/poc', data, {
      params: {
        username: props.authCtx.employeeID,
        password: props.authCtx.token
      }
    }).then(res => {
      setData(res.data);
      setName('');
      setTechStack('');
      setDescrption('');
      setgithubUrl('');
      setdemoUrl('');
      setStartDate('');
      setFinishDate('');
      setLoading(false);
      history.push("/POC");
    }).catch(err => {
      setLoading(false);
      setIsError(true);
    });
  }

  return (
    <div>
      <Grid>
        <Card className='add_dtails'>
          <Typography gutterBottom variant="h5" align="center" style={{ margin: "12 23 55 66 " }}>
            Add Your POC Details here
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
                <Grid item xs={12}>
                  <TextField placeholder="Enter Descrption" label="Description" multiline rows={4} variant="outlined" fullWidth required value={description} onChange={e => setDescrption(e.target.value)} />
                </Grid>
                <Grid item xs={12}>
                  <TextField type="url" placeholder="Enter Github Url" label="Github Url" variant="outlined" fullWidth required value={githubUrl} onChange={e => setgithubUrl(e.target.value)} />
                </Grid>
                <Grid item xs={12}>
                  <TextField type="Url" placeholder="Enter Demo Url" label="Demo Url" variant="outlined" fullWidth required value={demoUrl} onChange={e => setdemoUrl(e.target.value)} />
                </Grid>
                <Grid item xs={6} className="cstm_date">
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      disableFuture
                      variant="outlined"
                      label="Start Date"
                      openTo="year"
                      views={['year', 'month', 'day']}
                      value={startDate}
                      onChange={(value) => {
                        setStartDate(value)
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
                      label="End Date"
                      openTo="year"
                      views={['year', 'month', 'day']}
                      value={finishDate}
                      onChange={(value) => {
                        setFinishDate(value)
                      }}
                      renderInput={(params) => <TextField
                        {...params} />}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={6}>
                  {isError &&  <Alert variant="outlined"  severity="error" align="top"  style={{marginBottom:"34px" ,width:"100%" }} >
                    Something went wrong try again later !
                  </Alert>}
                  <Button type="submit" variant="contained" color="primary" fullWidth onClick={handleSubmit} disabled={loading}>{loading ?   <CircularProgress /> : 'Submit'}</Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
}
