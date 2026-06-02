import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Print, Close, Receipt } from '@mui/icons-material';

export function ActionPanel({ isInvoice, onPrint, onClose }) {
  return (
    <Box 
      className="no-print" 
      sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 4, 
        pb: 2, 
        borderBottom: '1px solid',
        borderColor: 'divider'
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Receipt color="primary" />
        <Typography variant="h6" sx={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
          {isInvoice ? 'Invoice' : 'Estimate'} Preview
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button 
          variant="contained" 
          startIcon={<Print />} 
          onClick={onPrint}
          color="primary"
          sx={{ textTransform: 'none', borderRadius: 2 }}
        >
          Print / PDF
        </Button>
        {onClose && (
          <Button 
            variant="outlined" 
            startIcon={<Close />} 
            onClick={onClose}
            color="inherit"
            sx={{ textTransform: 'none', borderRadius: 2 }}
          >
            Close
          </Button>
        )}
      </Box>
    </Box>
  );
}
