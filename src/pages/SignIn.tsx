import React, { useState } from 'react';
import { Box, Card, CardContent, Typography, Button, CircularProgress, Alert } from '@mui/material';
import { ResponsiveContainer } from '../components/ResponsiveContainer';
import { useErrorToast } from '../hooks/useErrorToast';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { showError } = useErrorToast();
  const { loginWithOAuth } = useAuth();
  const navigate = useNavigate();

  const handleSignIn = async (provider: 'github' | 'discord') => {
    setIsLoading(true);
    setError(null);
    try {
      console.log(`Starting ${provider} OAuth flow...`);
      await loginWithOAuth(provider);
      // Don't navigate here - the OAuth flow will redirect to provider
    } catch (error) {
      console.error('Sign in error:', error);
      setError(`Failed to sign in with ${provider}. Please try again.`);
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
        <Card sx={{ minWidth: 300, p: 2 }}>
          <CardContent>
            <Typography variant="h5" component="div" gutterBottom>
              Sign In
            </Typography>
            
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            {isLoading ? (
              <Box display="flex" justifyContent="center" p={2}>
                <CircularProgress />
              </Box>
            ) : (
              <>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mb: 2 }}
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
