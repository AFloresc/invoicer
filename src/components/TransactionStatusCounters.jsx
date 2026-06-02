import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { Paid, Pending, ErrorOutlined } from '@mui/icons-material';

export function TransactionStatusCounters({ paid, pending, overdue, total }) {
  const getPercent = (count) => (total ? (count / total) * 100 : 0);

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
      <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2, fontFamily: 'var(--font-display)', textTransform: 'uppercase', letterSpacing: '0.03em', color: 'text.secondary' }}>
        Transaction Allocation Stats
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, flexGrow: 1, justifyContent: 'center' }}>
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
            <Typography variant="body2" sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Paid color="success" sx={{ fontSize: 18 }} /> Paid Invoices Count
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 700, fontFamily: 'var(--font-mono)' }}>{paid}</Typography>
          </Box>
          <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-3">
            <div 
              className="bg-emerald-500 h-3 rounded-full transition-all duration-300" 
              style={{ width: `${getPercent(paid)}%` }}
            />
          </div>
        </Box>

        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
            <Typography variant="body2" sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Pending color="warning" sx={{ fontSize: 18 }} /> Pending Invoices Count
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 700, fontFamily: 'var(--font-mono)' }}>{pending}</Typography>
          </Box>
          <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-3">
            <div 
              className="bg-amber-500 h-3 rounded-full transition-all duration-300" 
              style={{ width: `${getPercent(pending)}%` }}
            />
          </div>
        </Box>

        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
            <Typography variant="body2" sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <ErrorOutlined color="error" sx={{ fontSize: 18 }} /> Overdue Invoices Count
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 700, fontFamily: 'var(--font-mono)' }}>{overdue}</Typography>
          </Box>
          <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-3">
            <div 
              className="bg-red-500 h-3 rounded-full transition-all duration-300" 
              style={{ width: `${getPercent(overdue)}%` }}
            />
          </div>
        </Box>
      </Box>
    </Paper>
  );
}
