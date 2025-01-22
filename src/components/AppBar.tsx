import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import ThemeSwitcher from './ThemeSwitcher';

const CustomAppBar = () => (
  <AppBar position="static">
    <Toolbar>
      <ThemeSwitcher />
    </Toolbar>
  </AppBar>
);

export default CustomAppBar;
