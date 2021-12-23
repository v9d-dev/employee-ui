import React, { useState, useEffect, moment } from 'react';
import axios from 'axios';
import { Grid, TextField, Button, Card, CardContent, Typography } from '@material-ui/core';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import "../../../../src/global.css";
import { useParams, useHistory } from 'react-router-dom';

export default function EditPoc(props) {
  const [user, setUser] = useState({
    name: "",
    description: "",
    startDate:"",
    finishDate: "",
    techStack: "",
    githubUrl: "",
    demoUrl: ""
  });

  let history = useHistory();
  const { id } = useParams();

  const  handleChange=(date, dateType)=> {
    setUser({ ...user,
      [dateType]: date
    })
  }


  const { name, techStack, description, finishDate, startDate, githubUrl, demoUrl } = user;


  const onInputChange = e => {
    console.log('------------------e', e);
    setUser({ ...user, [e.target.name]: e.target.value })
  };



  useEffect(() => {
    loadUser();
  }, []);


  const onSubmit = async e => {
    e.preventDefault();
    await axios.patch(`http://localhost:4000/poc/${id}`, user, {
      params: {
        username: props.authCtx.employeeID,
        password: props.authCtx.token
      }
    });
    history.push("/POC")
  };

  const loadUser = async () => {
    const result = await axios.get(`http://localhost:4000/poc/${id}`, {
      params: {
        username: props.authCtx.employeeID,
        password: props.authCtx.token
      }
    });
    setUser(result.data);
  };


  return (
    <div>
      <Grid>
        <Card className='add_dtails'>
          <Typography gutterBottom variant="h5" align="center" style={{ margin: "12 23 55 66 " }}>
            Update your poc details
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
                  <TextField placeholder="Enter Descrption" label="Description" multiline rows={4} variant="outlined" fullWidth required name="description" value={description} onChange={e => onInputChange(e)} />
                </Grid>
                <Grid item xs={12}>
                  <TextField type="url" placeholder="Enter Github Url" label="Github Url" variant="outlined" fullWidth required name="githubUrl" value={githubUrl} onChange={e => onInputChange(e)} />
                </Grid>
                <Grid item xs={12}>
                  <TextField type="Url" placeholder="Enter Demo Url" label="Demo Url" variant="outlined" fullWidth required name="demoUrl" value={demoUrl} onChange={e => onInputChange(e)} />
                </Grid>
                <Grid item xs={6} className="cstm_date">
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      disableFuture
                      variant="outlined"
                      label="Start Date"
                      openTo="year"
                      views={['year', 'month', 'day']}
                      name="startDate"
                      value={startDate}
                      onChange={e => handleChange(e, 'startDate')}
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
                      name="finishDate"
                      value={finishDate}
                      onChange={e => handleChange(e, 'finishDate')}
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
