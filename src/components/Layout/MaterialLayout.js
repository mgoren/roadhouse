import { useState, useEffect } from 'react';
import { CssBaseline, useMediaQuery } from '@mui/material';
import { ThemeProvider } from '@mui/system';
import ColorModeToggle from 'components/ColorModeToggle';
import { lightTheme, darkTheme, rootStyle } from './LayoutStyles';
import { StyledPaper } from 'components/Layout/SharedStyles';

export default function MaterialLayout({ children }) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [theme, setTheme] = useState(prefersDarkMode ? darkTheme : lightTheme);

  useEffect(() => {
    setTheme(prefersDarkMode ? darkTheme : lightTheme);
  }, [prefersDarkMode]);
  
  const toggleColorMode = () => {
    setTheme(prevTheme => (prevTheme === lightTheme ? darkTheme : lightTheme));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div sx={rootStyle(theme)}>
        <StyledPaper extraStyles={{ maxWidth: 1000 }} align="center">
          <ColorModeToggle toggleColorMode={toggleColorMode} />
          {/* <Box sx={{ my: { xs: -6, sm: -12 } }}> */}
            {children}
          {/* </Box> */}
        </StyledPaper>
      </div>
    </ThemeProvider>
  );
}
