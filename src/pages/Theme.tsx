import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';

const Theme: React.FC = () => {
  const [theme, setTheme] = useState('System');

  const handleThemeChange = (event: SelectChangeEvent<string>) => {
    setTheme(event.target.value as string);
    // Apply the selected theme
    document.documentElement.setAttribute('data-theme', event.target.value as string);
  };

  return (
    <div>
      <h1>Theme Switcher</h1>
      <FormControl fullWidth margin="normal">
        <InputLabel>Theme</InputLabel>
        <Select
          value={theme}
          onChange={handleThemeChange}
          label="Theme"
        >
          <MenuItem value="System">System</MenuItem>
          <MenuItem value="Dark">Dark</MenuItem>
          <MenuItem value="Light">Light</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default Theme;
