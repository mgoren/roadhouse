import { useTheme } from '@mui/system';
import { Box } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

export default function ColorModeToggle({ toggleColorMode }) {
  const theme = useTheme();
  return (
    <Box display="flex" justifyContent="flex-end">
      <IconButton sx={{ ml: 1, alignSelf: 'flex-start' }} onClick={toggleColorMode} color="inherit">
        {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </Box>
  );
}
