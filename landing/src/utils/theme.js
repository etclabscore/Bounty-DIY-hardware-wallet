const SECONDARY_COLOR = '#19a79a';

export default isDark => ({
  typography: {
    fontFamily: ['Source Code Pro', 'monospace'].join(','),
  },
  palette: {
    type: isDark ? 'dark' : 'light',
    primary: {
      main: isDark ? '#ffffff' : '#373836',
    },
    secondary: {
      main: SECONDARY_COLOR,
    },
  },
  overrides: {
    MuiButton: {
      root: {
        borderRadius: 2,
      },
    },
  },
});
