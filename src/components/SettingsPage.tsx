import { useMutation } from '@tanstack/react-query';
import pb from '../services/pocketbase';
import { Button } from '@mui/material';

const DeleteAccountButton = () => {
  const { mutate: deleteUser } = useMutation(async () => {
    // Delete user and all associated data
    await pb.collection('users').delete(pb.authStore.model?.id ?? '');
    pb.authStore.clear();
  });

  return (
    <Button
      variant="contained"
      color="error"
      onClick={() => {
        if (window.confirm('Permanently delete all data?')) deleteUser();
      }}
    >
      Delete Account
    </Button>
  );
};

export default DeleteAccountButton;
