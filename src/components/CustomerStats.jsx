import React from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';

export function CustomerStats({ customersCount, corporateCount }) {
  return (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderLeft: '4px solid #2563eb' }}>
          <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.03em' }}>
              Total Active Clients
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 700, mt: 0.5 }}>
              {customersCount}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderLeft: '4px solid #10b981' }}>
          <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.03em' }}>
              Corporate Entities
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 700, mt: 0.5 }}>
              {corporateCount}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderLeft: '4px solid #f59e0b' }}>
          <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.03em' }}>
              Local Database Mode
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 700, mt: 0.5, color: 'warning.main', fontSize: '1.5rem', lineHeight: 1.5 }}>
              Synced Local Cache
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
