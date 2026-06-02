import React from 'react';
import { Card, CardContent, Typography, Box, IconButton } from '@mui/material';
import { DeleteForever, Photo } from '@mui/icons-material';

export function LogoSection({ isInvoice, logoUrl, onLogoUpload, onClearLogo }) {
  return (
    <Card variant="outlined" sx={{ borderRadius: '12px' }}>
      <CardContent sx={{ p: 3 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5, fontFamily: 'var(--font-display)' }}>
          {isInvoice ? 'Invoice' : 'Estimate'} Logo
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, fontSize: '0.8rem' }}>
          Select a custom logo for this document. If omitted, the default template logo is used.
        </Typography>

        {logoUrl ? (
          <Box sx={{ border: '1px dashed', borderColor: 'divider', borderRadius: '8px', p: 2, textAlign: 'center', position: 'relative', bgcolor: '#fff' }}>
            <img 
              src={logoUrl} 
              alt="Logo preview" 
              style={{ maxHeight: '100px', maxWidth: '100%', objectFit: 'contain', margin: '0 auto' }} 
              referrerPolicy="no-referrer"
            />
            <IconButton 
              color="error" 
              onClick={onClearLogo} 
              sx={{ position: 'absolute', top: 5, right: 5, bgcolor: 'rgba(255,255,255,0.8)', '&:hover': { bgcolor: '#ffebee' } }}
              size="small"
              title="Remove Logo"
            >
              <DeleteForever sx={{ fontSize: 18 }} />
            </IconButton>
          </Box>
        ) : (
          <Box 
            sx={{ 
              display: 'block',
              border: '1px dashed', 
              borderColor: 'divider', 
              borderRadius: '8px', 
              p: 3, 
              textAlign: 'center', 
              color: 'text.secondary',
              cursor: 'pointer',
              bgcolor: 'action.hover',
              transition: 'all 0.2s',
              '&:hover': {
                borderColor: 'primary.main',
                bgcolor: 'action.selected'
              }
            }}
            component="label"
          >
            <input 
              type="file" 
              accept="image/*" 
              onChange={onLogoUpload} 
              hidden 
            />
            <Photo sx={{ fontSize: 36, mb: 1, opacity: 0.5 }} />
            <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.75rem' }}>
              Click to Upload Logo File
            </Typography>
            <Typography variant="caption" sx={{ fontSize: '0.65rem', display: 'block', mt: 0.5 }}>
              Supports PNG, JPG, GIF
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
