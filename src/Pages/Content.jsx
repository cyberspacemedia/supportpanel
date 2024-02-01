import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Divider, LinearProgress } from '@mui/material';


const Content = () => {
  return (
<Box sx={{ flexGrow: 1, p: 1, bgcolor: "red" }}>
      <Typography variant="h4">Blank Template</Typography>
      <Typography variant="h6">Used for Creating Content</Typography>
      <Divider />
      <LinearProgress />
    </Box>
  );
};

export default Content;
