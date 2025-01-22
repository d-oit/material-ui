import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Box, Fab } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Add } from '@mui/icons-material';
import { ResponsiveContainer } from './ResponsiveContainer';

const Dashboard = () => {
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'title', headerName: 'Title', width: 300 },
    { field: 'url', headerName: 'URL', width: 300 },
    { field: 'category', headerName: 'Category', width: 150 },
  ];

  const rows = [
    { id: 1, title: 'Example Link', url: 'https://example.com', category: 'Work' },
    // Add more rows as needed
  ];

  return (
    <ResponsiveContainer>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
          <IconButton color="inherit">
            {/* Add user avatar or other actions here */}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid rows={rows} columns={columns} paginationModel={{ page: 0, pageSize: 5 }} />
      </Box>
      <Fab color="primary" aria-label="add" sx={{ position: 'fixed', bottom: 16, right: 16 }}>
        <Add />
      </Fab>
    </ResponsiveContainer>
  );
};

export default Dashboard;
