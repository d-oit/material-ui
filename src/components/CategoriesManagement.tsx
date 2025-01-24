import React from 'react';
import { Box, Typography, Card, CardContent, TextField, Button } from '@mui/material';
import { Masonry } from '@mui/lab';
import { ResponsiveContainer } from './ResponsiveContainer';

const CategoriesManagement = () => {
  const categories = [
    { id: 1, name: 'Work' },
    { id: 2, name: 'Personal' },
    // Add more categories as needed
  ];

  return (
    <ResponsiveContainer>
      <Box sx={{ p: 2 }}>
        <Typography variant="h4" gutterBottom>
          Categories Management
        </Typography>
        <Masonry columns={{ xs: 1, sm: 2, md: 3 }} spacing={2}>
          {categories.map((category) => (
            <Card key={category.id}>
              <CardContent>
                <Typography variant="h6">{category.name}</Typography>
                <Button variant="outlined" color="primary">
                  Edit
                </Button>
                <Button variant="outlined" color="secondary">
                  Delete
                </Button>
              </CardContent>
            </Card>
          ))}
        </Masonry>
        <Box sx={{ mt: 2 }}>
          <TextField label="New Category" variant="outlined" fullWidth />
          <Button variant="contained" color="primary" sx={{ mt: 1 }}>
            Add Category
          </Button>
        </Box>
      </Box>
    </ResponsiveContainer>
  );
};

export default CategoriesManagement;
