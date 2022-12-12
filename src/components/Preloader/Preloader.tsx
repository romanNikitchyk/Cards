import React from 'react';
import {Stack} from '@mui/material';
import {LinearProgress} from '@material-ui/core';

export const Preloader = () => {
  return (
    <tr>
      <td><Stack sx={{width: '1008px', position: 'fixed'}} spacing={2}>
        <LinearProgress color={'primary'}/>
      </Stack></td>
    </tr>
  );
};

