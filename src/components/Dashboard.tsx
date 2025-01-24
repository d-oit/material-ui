import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Box, Fab, Alert, Dialog } from '@mui/material';
import { DataGrid, GridColDef, GridPaginationModel } from '@mui/x-data-grid';
import { Add } from '@mui/icons-material';
import { ResponsiveContainer } from './ResponsiveContainer';
import useLinks from '../hooks/useLinks';
import { LinearProgress } from '@mui/material';
import LinkForm from './LinkForm';

// Base interface for PocketBase records
interface BaseRecord {
  id: string;
  created: string;
  updated: string;
  collectionId: string;
  collectionName: string;
}

interface Link extends BaseRecord {
  title: string;
  category: string;
}

const CustomLoadingOverlay = () => (
  <Box sx={{ position: 'absolute', top: 0, width: '100%' }}>
    <LinearProgress />
  </Box>
);

const Dashboard = () => {
  const [paginationModel, setPaginationModel] = React.useState<GridPaginationModel>({
    page: 0,
    pageSize: 5,
  });

  const { data, isLoading, error } = useLinks({
    page: paginationModel.page + 1, // PocketBase uses 1-based pagination
    pageSize: paginationModel.pageSize,
    sort: '-created',
    fields: ['id', 'title', 'url', 'category', 'created'],
  });

  const columns: GridColDef<Link>[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'title', headerName: 'Title', width: 300 },
    { field: 'url', headerName: 'URL', width: 300 },
    { field: 'category', headerName: 'Category', width: 150 },
    {
      field: 'created',
      headerName: 'Created',
      width: 180,
      valueFormatter: ({ value }) => {
        if (!value) return '';
        try {
          return new Date(value).toLocaleString();
        } catch {
          return 'Invalid date';
        }
      },
    },
  ];

  const rows = React.useMemo(() => {
    return (data?.items || []) as Link[];
  }, [data?.items]);

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
      <Box sx={{ height: 400, width: '100%', mt: 2 }}>
        {error ? (
          <Alert severity="error">
            Error loading data: {error instanceof Error ? error.message : 'Unknown error'}
          </Alert>
        ) : (
          <DataGrid<Link>
            rows={rows}
            rowCount={data?.totalItems || 0}
            columns={columns}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            loading={isLoading}
            paginationMode="server"
            pageSizeOptions={[5, 10, 25]}
            disableRowSelectionOnClick
            slots={{
              loadingOverlay: CustomLoadingOverlay,
            }}
            sx={{
              '& .MuiDataGrid-cell': {
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              },
            }}
          />
        )}
      </Box>
      <Fab color="primary" aria-label="add" sx={{ position: 'fixed', bottom: 16, right: 16 }}>
        <Add />
      </Fab>
    </ResponsiveContainer>
  );
};

export default Dashboard;
