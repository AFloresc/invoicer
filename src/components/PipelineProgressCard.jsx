import React from 'react';
import { 
  Card, 
  Grid, 
  Box, 
  Avatar, 
  Typography, 
  LinearProgress 
} from '@mui/material';
import { QueryStats } from '@mui/icons-material';
import { formatCurrency } from '../utils.js';

export function PipelineProgressCard({ count, value, currency, rate }) {
  return (
    <Card 
      elevation={0}
      sx={{ 
        borderRadius: '12px', 
        border: '1px solid',
        borderColor: 'divider',
        bgcolor: 'background.paper',
        p: 2.5
      }}
    >
      <Grid container spacing={3} sx={{ alignItems: 'center' }}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ bgcolor: 'rgba(59, 130, 246, 0.1)', color: '#2563eb' }}>
              <QueryStats />
            </Avatar>
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, fontFamily: 'var(--font-display)' }}>
                Proposal Pipeline
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
                {count} pending proposals valued at <strong className="font-mono">{formatCurrency(value, currency)}</strong>
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.8rem', color: 'text.secondary' }}>
              Sales Win Goal Status (Target: 70% accepted)
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 700, fontFamily: 'var(--font-mono)', color: rate >= 70 ? 'success.main' : 'warning.main' }}>
              {rate}% / 70%
            </Typography>
          </Box>
          <LinearProgress 
            variant="determinate" 
            value={Math.min(rate, 100)} 
            sx={{ 
              height: 8, 
              borderRadius: 4, 
              bgcolor: 'action.hover',
              '& .MuiLinearProgress-bar': {
                borderRadius: 4,
                bgcolor: rate >= 70 ? '#10b981' : '#2563eb'
              }
            }} 
          />
        </Grid>
      </Grid>
    </Card>
  );
}
