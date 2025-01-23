import React, { useState } from 'react';
import { Box, Card, CardContent, Typography, Button, CircularProgress } from '@mui/material';
import { ResponsiveContainer } from './ResponsiveContainer';
import { useErrorToast } from '../hooks/useErrorToast';

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { showError } = useErrorToast();

  const handleSignIn = async (provider: 'github' | 'discord') => {
    setIsLoading(true);
    try {
      // Simulate sign-in process
      await new Promise((resolve) => setTimeout(resolve, 2000));
      // Replace with actual sign-in logic
      console.log(`Signed in with ${provider}`);
    } catch (error) {
      showError(`Failed to sign in with ${provider}`);
    } finally {
      setIsLoading(false);
    }
  };

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
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mb: 1 }}
                  onClick={() => handleSignIn('github')}
                >
                  Sign in with GitHub
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  fullWidth
                  onClick={() => handleSignIn('discord')}
                >
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
