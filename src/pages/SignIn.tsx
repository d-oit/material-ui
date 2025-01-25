import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Typography, Button, CircularProgress, Alert } from '@mui/material';
import { ResponsiveContainer } from '../components/ResponsiveContainer';
import { useErrorToast } from '../hooks/useErrorToast';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import PocketBase from 'pocketbase';

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [authInfo, setAuthInfo] = useState<string>('Checking auth methods...');
  const { showError } = useErrorToast();
  const { loginWithOAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthMethods = async () => {
      try {
        const pb = new PocketBase(import.meta.env.VITE_POCKETBASE_URL);
        console.log(pb);
        console.log('Checking auth methods...');
        const methods = await pb.collection('users').listAuthMethods();
        console.log('Auth methods response:', methods);
        setAuthInfo(JSON.stringify(methods, null, 2));
      } catch (error) {
        console.error('Failed to get auth methods:', error);
        setAuthInfo('Failed to get auth methods');
      }
    };

    checkAuthMethods();
  }, []);

  const handleSignIn = async (provider: 'github' | 'discord') => {
    console.log(`handleSignIn called for provider: ${provider}`);
    setIsLoading(true);
    setError(null);
    try {
      console.log(`Initiating ${provider} OAuth flow...`);
      await loginWithOAuth(provider);
      console.log('Warning: OAuth flow did not redirect');
    } catch (error) {
      console.error('Sign in error:', error);
      setError(`Failed to sign in with ${provider}. Please try again.`);
      showError(`Failed to sign in with ${provider}`);
    } finally {
      console.log('handleSignIn completed');
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
          minHeight: '100vh',
          background: 'linear-gradient(45deg, #1976D2 30%, #DC004E 90%)',
          padding: 2
        }}
      >
        <Card sx={{ minWidth: 300, maxWidth: 600, width: '100%', p: 2 }}>
          <CardContent>
            <Typography variant="h5" component="div" gutterBottom>
              Sign In
            </Typography>
            
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <Typography variant="body2" color="text.secondary" sx={{ mb: 2, whiteSpace: 'pre-wrap' }}>
              Auth Methods Info:
              {authInfo}
            </Typography>

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
