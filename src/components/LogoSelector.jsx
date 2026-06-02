import React from 'react';
import { Card, CardContent, Typography, Box, IconButton } from '@mui/material';
import { DeleteForever, Photo } from '@mui/icons-material';

export function LogoSelector({ logoUrl, onLogoUpload, onClearLogo }) {
  return (
    <Card variant="outlined" sx={{ borderRadius: '12px' }}>
      <CardContent sx={{ p: 3 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5, fontFamily: 'var(--font-display)' }}>
          Global Template Logo
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5, fontSize: '0.8rem' }}>
          Uploaded image will auto-populate as the corporate letterhead logo on all new proposals or invoices.
        </Typography>

        {logoUrl ? (
          <Box sx={{ border: '1px dashed', borderColor: 'divider', borderRadius: '8px', p: 2.5, textAlign: 'center', position: 'relative', bgcolor: '#fff' }}>
            <img 
              src={logoUrl} 
              alt="Default Logo Preview" 
              style={{ maxHeight: '110px', maxWidth: '100%', objectFit: 'contain', margin: '0 auto' }} 
              referrerPolicy="no-referrer"
            />
            <IconButton 
              color="error" 
              onClick={onClearLogo} 
              sx={{ position: 'absolute', top: 5, right: 5, bgcolor: 'rgba(255,255,255,0.8)', '&:hover': { bgcolor: '#ffebee' } }}
              size="small"
              title="Remove Global Logo"
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
              p: 3.5, 
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
            <Photo sx={{ fontSize: 40, mb: 1.5, opacity: 0.5 }} />
            <Typography variant="body2" sx={{ fontWeight: 700, fontSize: '0.75rem' }}>
              Upload Global Brand image
            </Typography>
            <Typography variant="caption" sx={{ fontSize: '0.65rem', display: 'block', mt: 0.5 }}>
              Drag or click. Maximum 1MB.
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
