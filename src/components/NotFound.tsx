import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { ResponsiveContainer } from './ResponsiveContainer';

const NotFound = () => {
  return (
    <ResponsiveContainer>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          background: 'linear-gradient(45deg, #1976D2 30%, #DC004E 90%)',
        }}
      >
        <Typography variant="h4" gutterBottom>
          404 - Page Not Found
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          The page you are looking for does not exist.
        </Typography>
        <Button variant="contained" color="primary" href="/">
          Go to Home
        </Button>
      </Box>
    </ResponsiveContainer>
  );
};

export default NotFound;
