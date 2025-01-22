import React from 'react';
import { Box, Card, CardContent, Typography, Button, CircularProgress } from '@mui/material';
import { ResponsiveContainer } from './ResponsiveContainer';

const SignIn = () => {
  const isLoading = false; // Set to true to show loading state

  return (
    <ResponsiveContainer>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          background: 'linear-gradient(45deg, #1976D2 30%, #DC004E 90%)',
        }}
      >
        <Card sx={{ minWidth: 300 }}>
          <CardContent>
            <Typography variant="h5" component="div" gutterBottom>
              Sign In
            </Typography>
            {isLoading ? (
              <CircularProgress />
            ) : (
              <>
                <Button variant="contained" color="primary" fullWidth sx={{ mb: 1 }}>
                  Sign in with GitHub
                </Button>
                <Button variant="contained" color="secondary" fullWidth>
                  Sign in with Discord
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </Box>
    </ResponsiveContainer>
  );
};

export default SignIn;
