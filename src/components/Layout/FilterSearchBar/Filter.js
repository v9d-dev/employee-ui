import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import ClearIcon from '@mui/icons-material/Clear';

const Filter = (props) => {
  const { filterName, type, filterData } = props;
  const [value, setValue] = useState('');

  useEffect(() => {
    filterData(type, value);
  }, [value]);

  const onChangeHandler = (event) => {
    setValue(event.target.value);
  }
  return (
    <Box
      sx={{
        p: 0.5,
        pb: 0,
        display: 'flex',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
      }}
    >
      <p>{filterName}:</p>
      <TextField
        variant="standard"
        value={value}
        onChange={onChangeHandler}
        placeholder="Search…"
        InputProps={{
          endAdornment: (
            <IconButton
              title="Clear"
              aria-label="Clear"
              size="small"
              style={{ visibility: props.value ? 'visible' : 'hidden' }}
              onClick={props.clearSearch}
            >
              <ClearIcon fontSize="small" />
            </IconButton>
          ),
        }}
        sx={{
          width: {
            xs: 1,
            sm: 'auto',
          },
          m: (theme) => theme.spacing(1, 2, 1.5),
          '& .MuiSvgIcon-root': {
            mr: 0.5,
          },
          '& .MuiInput-underline:before': {
            borderBottom: 1,
            borderColor: 'divider'
          },
        }}
      />
    </Box>
  );
}

export default Filter;