import React from 'react';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';
import { Delete, Restore } from '@mui/icons-material';

export function SystemDiagnosticsCard({ onEraseAllData, onRestoreDemoData }) {
  return (
    <Card variant="outlined" sx={{ borderRadius: '12px', border: '1px solid rgba(226, 232, 240, 0.8)' }}>
      <CardContent sx={{ p: 3 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.primary', mb: 1, fontFamily: 'var(--font-display)' }}>
          Database & Demo Controls
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5, fontSize: '0.8rem', lineHeight: 1.5 }}>
          Manage your local cache. Wipe current documents/leads to build from scratch, or replenish standard billing and client models instantly.
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <Button 
            variant="outlined" 
            color="error" 
            startIcon={<Delete />} 
            fullWidth
            onClick={onEraseAllData}
            sx={{ textTransform: 'none', borderRadius: '8px', fontWeight: 600, py: 1 }}
          >
            Erase All Data
          </Button>

          <Button 
            variant="contained" 
            color="primary" 
            startIcon={<Restore />} 
            fullWidth
            onClick={onRestoreDemoData}
            sx={{ textTransform: 'none', borderRadius: '8px', fontWeight: 600, py: 1, boxShadow: 'none', '&:hover': { boxShadow: 'none' } }}
          >
            Restore Demo Data
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
