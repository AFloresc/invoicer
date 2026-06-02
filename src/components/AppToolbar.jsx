import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  IconButton, 
  Typography, 
  Box 
} from '@mui/material';
import { 
  Menu as MenuIcon, 
  Brightness4, 
  Brightness7,
  ReceiptLongOutlined
} from '@mui/icons-material';

const drawerWidth = 260;

export function AppToolbar({ onMenuToggle, darkMode, onThemeToggle }) {
  return (
    <AppBar 
      position="fixed" 
      elevation={0}
      sx={{ 
        width: { md: `calc(100% - ${drawerWidth}px)` },
        ml: { md: `${drawerWidth}px` },
        bgcolor: 'background.paper',
        borderBottom: '1px solid',
        borderColor: 'divider',
        zIndex: 1100
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', px: 2 }}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={onMenuToggle}
          sx={{ mr: 2, display: { md: 'none' }, color: 'text.primary' }}
        >
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" color="text.primary" sx={{ display: 'flex', alignItems: 'center', gap: 1, fontFamily: 'var(--font-display)', fontWeight: 700 }}>
          <ReceiptLongOutlined color="primary" /> Invoice & Estimate Flow Control
        </Typography>

        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton onClick={onThemeToggle} color="inherit" sx={{ color: 'text.primary' }}>
            {darkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
