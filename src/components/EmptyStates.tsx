import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { ResponsiveContainer } from './ResponsiveContainer';

const EmptyStates = () => {
  return (
    <ResponsiveContainer>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Typography variant="h4" gutterBottom>
          No Links Found
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          Add your first link to get started.
        </Typography>
        <Button variant="contained" color="primary">
          Add Link
        </Button>
      </Box>
    </ResponsiveContainer>
  );
};

export default EmptyStates;
