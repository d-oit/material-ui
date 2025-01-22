import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useTheme } from '../contexts/ThemeContext';

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  return (
    <ButtonGroup variant="contained" aria-label="Theme switcher">
      <Button
        onClick={() => setTheme('system')}
        color={theme === 'system' ? 'primary' : 'inherit'}
        startIcon={<SettingsBrightnessIcon />}
      >
        System
      </Button>
      <Button
        onClick={() => setTheme('light')}
        color={theme === 'light' ? 'primary' : 'inherit'}
        startIcon={<LightModeIcon />}
      >
        Light
      </Button>
      <Button
        onClick={() => setTheme('dark')}
        color={theme === 'dark' ? 'primary' : 'inherit'}
        startIcon={<DarkModeIcon />}
      >
        Dark
      </Button>
    </ButtonGroup>
  );
};

export default ThemeSwitcher;
