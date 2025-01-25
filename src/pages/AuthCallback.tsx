import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import pb from '../services/pocketbase';
import { useErrorToast } from '../hooks/useErrorToast';

const AuthCallback = () => {
  const navigate = useNavigate();
  const { showError } = useErrorToast();

  useEffect(() => {
    const handleOAuthCallback = async () => {
      try {
        // Try to get the redirect URL params
        const queryString = window.location.search;
        console.log('OAuth callback URL:', window.location.href);
        
        if (!queryString) {
          console.error('No query parameters found in callback URL');
          throw new Error('Invalid OAuth callback');
        }

        // Complete the OAuth flow
        const authData = await pb.collection('users').authWithOAuth2({
          provider: new URLSearchParams(queryString).get('provider') || '',
          code: new URLSearchParams(queryString).get('code') || '',
          codeVerifier: localStorage.getItem('codeVerifier') || '',
          redirectUrl: `${window.location.origin}/auth/callback`,
          createData: {
            emailVisibility: true,
          }
        });

        console.log('OAuth authentication successful:', authData);

        // AuthContext will automatically update via onChange listener
        navigate('/dashboard');
      } catch (error) {
        console.error('OAuth callback error:', error);
        showError('Failed to complete authentication');
        navigate('/signin');
      }
    };

    handleOAuthCallback();
  }, [navigate, showError]);

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh'
    }}>
      <p>Completing login...</p>
    </div>
  );
};

export default AuthCallback;
