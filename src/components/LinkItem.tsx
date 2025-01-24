import { FC } from 'react';
import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface LinkItemProps {
  title?: string;
  url?: string;
  onDelete?: () => void;
}

const LinkItem: FC<LinkItemProps> = ({ title = '', url = '', onDelete }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" component="h2">
          {title}
        </Typography>
        <Typography color="textSecondary">
          {url}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          startIcon={<DeleteIcon />}
          onClick={onDelete}
          color="error"
          aria-label="Delete"
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default LinkItem;
