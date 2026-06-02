import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import { Restore } from '@mui/icons-material';

export function SystemDiagnosticsCard({ onFactoryReset }) {
  return (
    <Card variant="outlined" sx={{ borderRadius: '12px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
      <CardContent sx={{ p: 3 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'error.main', mb: 1, fontFamily: 'var(--font-display)' }}>
          System Diagnostics Control
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5, fontSize: '0.8rem' }}>
          Reset database matrices in local storage. All custom invoicing logs will be wiped and seed default entries re-applied.
        </Typography>

        <Button 
          variant="outlined" 
          color="error" 
          startIcon={<Restore />} 
          fullWidth
          onClick={onFactoryReset}
          sx={{ textTransform: 'none', borderRadius: '8px', fontWeight: 600 }}
        >
          Reset System Data
        </Button>
      </CardContent>
    </Card>
  );
}
