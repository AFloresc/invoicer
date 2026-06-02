import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { formatCurrency } from '../utils.js';

export function RevenueAllocationChart({ paid, pending, overdue, total, currency }) {
  return (
    <Paper 
      elevation={0}
      sx={{ 
        p: 3, 
        borderRadius: '12px', 
        border: '1px solid',
        borderColor: 'divider',
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 3, fontFamily: 'var(--font-display)', textTransform: 'uppercase', letterSpacing: '0.03em', color: 'text.secondary' }}>
        Revenue Allocation Analysis
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center', justifyContent: 'space-around', gap: 3, flexGrow: 1 }}>
        <Box sx={{ position: 'relative', width: 180, height: 180, display: 'flex', alignItems: 'center', justifyItems: 'center' }}>
          <svg width="180" height="180" viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)' }}>
            <circle cx="50" cy="50" r="40" fill="transparent" stroke="var(--mui-palette-action-hover, #f3f4f6)" strokeWidth="12" />
            
            {total > 0 && (
              <circle 
                cx="50" 
                cy="50" 
                r="40" 
                fill="transparent" 
                stroke="#10b981" 
                strokeWidth="12" 
                strokeDasharray={`${(paid / total) * 251.2} 251.2`}
                strokeDashoffset="0"
              />
            )}

            {total > 0 && (
              <circle 
                cx="50" 
                cy="50" 
                r="40" 
                fill="transparent" 
                stroke="#f59e0b" 
                strokeWidth="12" 
                strokeDasharray={`${(pending / total) * 251.2} 251.2`}
                strokeDashoffset={`-${(paid / total) * 251.2}`}
              />
            )}

            {total > 0 && (
              <circle 
                cx="50" 
                cy="50" 
                r="40" 
                fill="transparent" 
                stroke="#ef4444" 
                strokeWidth="12" 
                strokeDasharray={`${(overdue / total) * 251.2} 251.2`}
                strokeDashoffset={`-${((paid + pending) / total) * 251.2}`}
              />
            )}
          </svg>
          <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, fontSize: '0.65rem' }}>TOTAL INVOICED</Typography>
            <Typography variant="subtitle1" sx={{ fontWeight: 800, fontFamily: 'var(--font-mono)', fontSize: '0.95rem' }}>{formatCurrency(total, currency)}</Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, width: { xs: 'full', sm: '200px' } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderLeft: '4px solid #10b981', pl: 1.5 }}>
            <Box>
              <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>COLLECTED / PAID</Typography>
              <Typography variant="body2" sx={{ fontWeight: 700, fontFamily: 'var(--font-mono)' }}>{formatCurrency(paid, currency)}</Typography>
            </Box>
            <Typography variant="caption" sx={{ fontWeight: 700, color: '#10b981' }}>
              {total ? Math.round((paid / total) * 100) : 0}%
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderLeft: '4px solid #f59e0b', pl: 1.5 }}>
            <Box>
              <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>PENDING / OUTSTANDING</Typography>
              <Typography variant="body2" sx={{ fontWeight: 700, fontFamily: 'var(--font-mono)' }}>{formatCurrency(pending, currency)}</Typography>
            </Box>
            <Typography variant="caption" sx={{ fontWeight: 700, color: '#f59e0b' }}>
              {total ? Math.round((pending / total) * 100) : 0}%
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderLeft: '4px solid #ef4444', pl: 1.5 }}>
            <Box>
              <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>OVERDUE REVENUE</Typography>
              <Typography variant="body2" sx={{ fontWeight: 700, fontFamily: 'var(--font-mono)' }}>{formatCurrency(overdue, currency)}</Typography>
            </Box>
            <Typography variant="caption" sx={{ fontWeight: 700, color: '#ef4444' }}>
              {total ? Math.round((overdue / total) * 100) : 0}%
            </Typography>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
}
