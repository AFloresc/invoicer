import { createTheme } from '@mui/material/styles';

export function getTheme(darkMode) {
  return createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#2563eb', 
        contrastText: '#ffffff',
      },
      secondary: {
        main: '#10b981', 
      },
      background: {
        default: darkMode ? '#0f172a' : '#f8fafc', 
        paper: darkMode ? '#1e293b' : '#ffffff', 
      },
      divider: darkMode ? '#334155' : '#e2e8f0', 
      text: {
        primary: darkMode ? '#f8fafc' : '#0f172a',
        secondary: darkMode ? '#94a3b8' : '#475569',
      }
    },
    typography: {
      fontFamily: 'var(--font-sans)',
      h4: {
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        letterSpacing: '-0.02em',
      },
      h5: {
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        letterSpacing: '-0.01em',
      },
      h6: {
        fontFamily: 'var(--font-display)',
        fontWeight: 600,
        letterSpacing: '-0.01em',
      },
      subtitle1: {
        fontFamily: 'var(--font-display)',
        fontWeight: 600,
      },
      subtitle2: {
        fontFamily: 'var(--font-display)',
        fontWeight: 600,
      }
    },
    shape: {
      borderRadius: 12, 
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 600,
            borderRadius: '8px',
            padding: '6px 16px',
          }
        }
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: '12px',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
          }
        }
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: '12px',
          }
        }
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
            }
          }
        }
      }
    }
  });
}
