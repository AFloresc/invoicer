import React from 'react';
import { Box, Typography } from '@mui/material';

export function BilledPartySection({ doc, t }) {
  const billToLabel = t?.billTo || 'Bill To';
  return (
    <Box sx={{ mb: 5 }}>
      <Typography variant="subtitle2" sx={{ color: '#9ca3af', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.75rem', mb: 1, fontFamily: 'var(--font-display)' }}>
        {billToLabel}
      </Typography>
      <Typography variant="h6" sx={{ fontWeight: 700, color: '#1f2937', mb: 0.5, fontSize: '1rem' }}>
        {doc.clientName}
      </Typography>
      <Typography sx={{ color: '#4b5563', fontSize: '0.875rem', whiteSpace: 'pre-line', mb: 0.5 }}>
        {doc.clientAddress}
      </Typography>
      <Typography sx={{ color: '#4b5563', fontSize: '0.875rem', fontFamily: 'var(--font-mono)' }}>
        {doc.clientEmail}
      </Typography>
    </Box>
  );
}
