import { useEffect, useState } from 'react';
import { Button, Snackbar, Alert } from '@mui/material';
import pb from '../services/pocketbase';

const GDPRBanner = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const user = pb.authStore.model ?? { gdpr_consent: false };
    if (!user?.gdpr_consent) setShowBanner(true);
  }, []);

  const handleConsent = async (consent: boolean) => {
    await pb.collection('users').update(pb.authStore.model?.id ?? '', { gdpr_consent: consent });
    setShowBanner(false);
  };

  return (
    <Snackbar open={showBanner} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
      <Alert severity="info" sx={{ width: '100%' }}>
        We use cookies to improve your experience.
        <Button onClick={() => handleConsent(true)}>Accept</Button>
        <Button onClick={() => handleConsent(false)}>Decline</Button>
      </Alert>
    </Snackbar>
  );
};

export default GDPRBanner;
