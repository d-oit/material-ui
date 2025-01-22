import React, { useState } from 'react';
import { Button, Typography } from '@mui/material';

const Auth: React.FC = () => {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  const handleLogin = () => {
    // Simulate OAuth2 login
    const mockUser = { name: 'John Doe', email: 'john.doe@example.com' };
    setUser(mockUser);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div>
      <h1>Authentication</h1>
      {user ? (
        <div>
          <Typography variant="h6">Welcome, {user.name}!</Typography>
          <Typography variant="body1">Email: {user.email}</Typography>
          <Button variant="contained" color="secondary" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      ) : (
        <Button variant="contained" color="primary" onClick={handleLogin}>
          Login with GitHub
        </Button>
      )}
    </div>
  );
};

export default Auth;
