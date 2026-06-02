import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import { Home, Email, Phone } from '@mui/icons-material';

export function LetterheadHeader({ finalLogo, settings }) {
  return (
    <Grid size={{ xs: 12, md: 7 }}>
      {finalLogo ? (
        <Box sx={{ mb: 2, maxHeight: '80px', display: 'flex', alignItems: 'center' }}>
          <img 
            src={finalLogo} 
            alt="Company Logo" 
            style={{ maxHeight: '70px', maxWidth: '240px', objectFit: 'contain' }}
            referrerPolicy="no-referrer"
          />
        </Box>
      ) : (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
          <Box 
            sx={{ 
              bgcolor: 'primary.main', 
              color: 'primary.contrastText', 
              borderRadius: '8px', 
              width: 44, 
              height: 44, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '1.2rem',
              fontFamily: 'var(--font-display)'
            }}
          >
            {settings.name ? settings.name.charAt(0).toUpperCase() : 'C'}
          </Box>
          <Typography variant="h5" sx={{ fontWeight: 800, letterSpacing: '-0.5px', fontFamily: 'var(--font-display)', color: '#1a1a1a' }}>
            {settings.name || 'My Company'}
          </Typography>
        </Box>
      )}

      {/* Vendor coordinates */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, color: '#4b5563', fontSize: '0.875rem' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Home sx={{ fontSize: 16, color: '#9ca3af' }} />
          <span>{settings.address || 'Address not configured'}</span>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Email sx={{ fontSize: 16, color: '#9ca3af' }} />
          <span>{settings.email || 'Email not configured'}</span>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Phone sx={{ fontSize: 16, color: '#9ca3af' }} />
          <span>{settings.phone || 'Phone not configured'}</span>
        </Box>
      </Box>
    </Grid>
  );
}
