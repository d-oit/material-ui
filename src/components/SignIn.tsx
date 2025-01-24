import React, { useState } from 'react';
import { Box, Card, CardContent, Typography, Button, CircularProgress } from '@mui/material';
import { ResponsiveContainer } from './ResponsiveContainer';
import { useErrorToast } from '../hooks/useErrorToast';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { showError } = useErrorToast();
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSignIn = async (provider: 'github' | 'discord') => {
    setIsLoading(true);
    try {
      // Simulate sign-in process
      await new Promise((resolve) => setTimeout(resolve, 2000));
      // Replace with actual sign-in logic
      const userData = {
        id: '123',
        name: 'John Doe',
        email: 'john.doe@example.com',
      };
      login(userData);
      navigate('/dashboard');
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
