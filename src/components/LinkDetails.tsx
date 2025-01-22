import React from 'react';
import { Box, Card, CardContent, Typography, Button, CircularProgress } from '@mui/material';
import { ResponsiveContainer } from './ResponsiveContainer';

const LinkDetails = () => {
  const link = {
    title: 'Example Link',
    url: 'https://example.com',
    description: 'This is an example link.',
    category: 'Work',
  };

  const isLoading = false; // Set to true to show loading state

  return (
    <ResponsiveContainer>
      <Box sx={{ p: 2 }}>
        <Typography variant="h4" gutterBottom>
          Link Details
        </Typography>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                {link.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {link.description}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Category: {link.category}
              </Typography>
              <Button variant="contained" color="primary" href={link.url} target="_blank">
                Open Link
              </Button>
            </CardContent>
          </Card>
        )}
      </Box>
    </ResponsiveContainer>
  );
};

export default LinkDetails;
