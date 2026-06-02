import React from 'react';
import { Alert } from '@mui/material';
import { ErrorOutlined } from '@mui/icons-material';

export function OverdueAlert({ count }) {
  if (count <= 0) return null;
  return (
    <Alert 
      severity="error" 
      variant="outlined" 
      sx={{ mb: 3, borderRadius: '10px', bgcolor: 'rgba(239, 68, 68, 0.03)', border: '1px solid rgba(239, 68, 68, 0.2)' }}
      icon={<ErrorOutlined />}
    >
      Company currently has <strong>{count} overdue accounts</strong> that require immediate collection followup or grace-period updates.
    </Alert>
  );
}
