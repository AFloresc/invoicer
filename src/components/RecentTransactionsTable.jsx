import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Chip,
  Button
} from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import { calculateTotal, formatCurrency } from '../utils.js';

export function RecentTransactionsTable({ title, icon, buttonLabel, items, currency, onNavigate, onClickRow, isInvoice }) {
  const getBadgeColor = (status) => {
    if (status === 'paid' || status === 'accepted') return 'success';
    if (status === 'pending') return 'warning';
    if (status === 'overdue' || status === 'rejected') return 'error';
    return 'default';
  };

  return (
    <Paper 
      elevation={0}
      sx={{ 
        p: 3, 
        borderRadius: '12px', 
        border: '1px solid',
        borderColor: 'divider'
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {icon}
          <Typography variant="subtitle1" sx={{ fontWeight: 700, fontFamily: 'var(--font-display)' }}>
            {title}
          </Typography>
        </Box>
        <Button 
          endIcon={<ArrowForward />} 
          size="small"
          onClick={onNavigate}
          sx={{ textTransform: 'none', fontWeight: 600 }}
        >
          {buttonLabel}
        </Button>
      </Box>

      <TableContainer>
        <Table sx={{ '& .MuiTableCell-root': { py: 1.2, px: 0.5 } }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>Reference</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Client</TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>Total Value</TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  <Typography variant="body2" color="text.secondary" sx={{ py: 2 }}>
                    No operations recorded yet.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              items.map((item) => (
                <TableRow 
                  key={item.id} 
                  hover
                  onClick={() => onClickRow(item)}
                  sx={{ cursor: 'pointer' }}
                >
                  <TableCell sx={{ fontFamily: 'var(--font-mono)', fontWeight: 600, fontSize: '0.8rem' }}>
                    {item.id}
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, fontSize: '0.85rem' }}>{item.clientName}</TableCell>
                  <TableCell align="right" sx={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
                    {formatCurrency(calculateTotal(item.items, item.taxRate, item.discount), currency)}
                  </TableCell>
                  <TableCell align="right">
                    <Chip 
                      label={item.status.toUpperCase()} 
                      color={getBadgeColor(item.status)} 
                      size="small" 
                      sx={{ fontWeight: 700, fontSize: '0.65rem' }}
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
