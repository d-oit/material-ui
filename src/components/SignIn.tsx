import { useState } from 'react';
import { Button, Container, Typography } from '@mui/material';
import { GitHub } from '@mui/icons-material';
import pb from '../services/pocketbase';

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleGitHubLogin = async () => {
    setIsLoading(true);
    try {
      await pb.collection('users').authWithOAuth2({ provider: 'github' });
      window.location.href = '/';
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8, textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Welcome to do Links Collector
      </Typography>
      <Button
        variant="contained"
        startIcon={<GitHub />}
        onClick={handleGitHubLogin}
        disabled={isLoading}
      >
        Sign in with GitHub
      </Button>
    </Container>
  );
};

export default SignIn;
