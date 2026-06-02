import React from 'react';
import { Grid, Box, Typography } from '@mui/material';

export function TermsNotesSection({ notes, terms, email, fallbackName, t }) {
  const notesLabel = t?.notesAndDetails || 'Notes & Details';
  const termsLabel = t?.termsAndConditions || 'Terms & Conditions';

  return (
    <Grid item size={{ xs: 12, sm: 6 }}>
      {notes && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="caption" sx={{ color: '#9ca3af', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.7rem', display: 'block', mb: 1, fontFamily: 'var(--font-display)' }}>
            {notesLabel}
          </Typography>
          <Typography sx={{ color: '#4b5563', fontSize: '0.8rem', whiteSpace: 'pre-line', lineHeight: 1.5 }}>
            {notes}
          </Typography>
        </Box>
      )}
      
      {terms && (
        <Box>
          <Typography variant="caption" sx={{ color: '#9ca3af', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.7rem', display: 'block', mb: 1, fontFamily: 'var(--font-display)' }}>
            {termsLabel}
          </Typography>
          <Typography sx={{ color: '#4b5563', fontSize: '0.8rem', whiteSpace: 'pre-line', lineHeight: 1.5 }}>
            {terms}
          </Typography>
        </Box>
      )}
    </Grid>
  );
}
