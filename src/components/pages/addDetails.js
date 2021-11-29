import React from 'react';
import { Grid, TextField, Button, Card, CardContent, Typography } from '@material-ui/core';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { color, margin } from '@mui/system';


export default function AddDetails() {
  const [value, setValue] = React.useState(new Date());

  return (
    <div>
      <Grid>
        <Card style={{ maxWidth: 600, padding: "20px 5px", margin: "0 auto" }}>
        <Typography gutterBottom variant="h5" align="center" style = {{margin:"12 23 55 66 "}}>
              Add Your POC deatis here
            </Typography>
          <CardContent>
            <form>
              <Grid container spacing={4}>
                <Grid xs={12} item>
                  <TextField placeholder="Enter name of your POC" label="Name" variant="outlined" fullWidth required />
                </Grid>
                <Grid xs={12} item>
                  <TextField placeholder="Enter tech  stack" label="Tech Stack" variant="outlined" fullWidth required />
                </Grid>
                <Grid item xs={12}>
                  <TextField placeholder="Enter Descrption" label="Description" multiline rows={4} variant="outlined" fullWidth required />
                </Grid>
                <Grid item xs={12}>
                  <TextField type="url" placeholder="Enter Github Url" label="Github Url" variant="outlined" fullWidth required />
                </Grid>
                <Grid item xs={12}>
                  <TextField type="Url" placeholder="Enter Demo Url" label="Demo Url" variant="outlined" fullWidth required />
                </Grid>
                <Grid item xs={12}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      disableFuture
                      variant="outlined"
                      label="Start Date"
                      openTo="year"
                      views={['year', 'month', 'day']}
                      value={value}
                      onChange={(newValue) => {
                        setValue(newValue);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      disableFuture
                      variant="outlined"
                      label="End Date"
                      openTo="year"
                      views={['year', 'month', 'day']}
                      value={value}
                      onChange={(newValue) => {
                        setValue(newValue);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary" fullWidth>Submit</Button>
                </Grid>

              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
}
