import React, { useState } from 'react'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import { makeStyles } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import DateFnsUtils from "@date-io/date-fns";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
  } from "@material-ui/pickers";
  

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: 'block'
  }
})

export default function AddDetails() {
  const classes = useStyles()
  const [title, setTitle] = useState('')
  const [details, setDetails] = useState('')
  const [titleError, setTitleError] = useState(false)
  const [detailsError, setDetailsError] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setTitleError(false)
    setDetailsError(false)

    if (title == '') {
      setTitleError(true)
    }
    if (details == '') {
      setDetailsError(true)
    }
    if (title && details) {
      console.log(title, details)
    } 
  }

  return (
    <div>
    <Container size="sm">
      <Typography
        variant="h6" 
        color="textSecondary"
        component="h2"
        gutterBottom
      >
        Add your POC details here
      </Typography>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField className={classes.field}
          onChange={(e) => setTitle(e.target.value)}
          label="Name" 
          variant="outlined" 
          color="primary" 
          fullWidth
          required
          error={titleError}
        />
        <TextField className={classes.field}
          onChange={(e) => setDetails(e.target.value)}
          label="Tech Stack"
          variant="outlined"
          color="primary"
          multiline
        //   rows={4}
          fullWidth
          required
          error={detailsError}
        />
         <TextField className={classes.field}
          onChange={(e) => setDetails(e.target.value)}
          label="Description"
          variant="outlined"
          color="primary"
          multiline
          rows={4}
          fullWidth
          required
          error={detailsError}
        />
         <TextField className={classes.field}
          onChange={(e) => setDetails(e.target.value)}
          label="Github URL"
          variant="outlined"
          color="primary"
          multiline
        //   rows={4}
          fullWidth
          required
          error={detailsError}
        />
        <TextField className={classes.field}
          onChange={(e) => setDetails(e.target.value)}
          label="Demo URL"
          variant="outlined"
          color="primary"
          multiline
        //   rows={4}
          fullWidth
          required
          error={detailsError}
        />

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          {/* 5) Date Picker */}
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            label="Start Date"
            value={null}
            fullWidth
          />
        </MuiPickersUtilsProvider>\
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          {/* 5) Date Picker */}
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            label="End Date"
            value={null}
            fullWidth
          />
        </MuiPickersUtilsProvider>
         </form>
        <Button
          type="submit" 
          color="primary" 
          variant="contained"
          endIcon={<KeyboardArrowRightIcon />}>
          Submit
        </Button>
      
    </Container>
    </div>
  )
}
