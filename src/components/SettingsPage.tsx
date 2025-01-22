import React from 'react';
import { Box, Typography, Tabs, Tab, FormControlLabel, Switch } from '@mui/material';
import { ResponsiveContainer } from './ResponsiveContainer';

const SettingsPage = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <ResponsiveContainer>
      <Box sx={{ p: 2 }}>
        <Typography variant="h4" gutterBottom>
          Settings
        </Typography>
        <Tabs value={value} onChange={handleChange} aria-label="settings tabs">
          <Tab label="Account" />
          <Tab label="Theme" />
          <Tab label="Security" />
        </Tabs>
        {value === 0 && (
          <Box sx={{ p: 2 }}>
            <Typography variant="h6">Account Settings</Typography>
            {/* Add account settings form here */}
          </Box>
        )}
        {value === 1 && (
          <Box sx={{ p: 2 }}>
            <Typography variant="h6">Theme Settings</Typography>
            <FormControlLabel
              control={<Switch checked={true} onChange={() => {}} />}
              label="Dark Mode"
            />
          </Box>
        )}
        {value === 2 && (
          <Box sx={{ p: 2 }}>
            <Typography variant="h6">Security Settings</Typography>
            {/* Add security settings form here */}
          </Box>
        )}
      </Box>
    </ResponsiveContainer>
  );
};

export default SettingsPage;
