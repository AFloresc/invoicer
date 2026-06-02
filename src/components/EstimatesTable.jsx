import React from 'react';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Typography, Chip, Box, IconButton } from '@mui/material';
import { Visibility, Edit, MoreVert } from '@mui/icons-material';
import { calculateTotal, formatCurrency } from '../utils.js';

export function EstimatesTable({ items, currency, onView, onEdit, onOpenMenu }) {
  const getStatusColor = (status) => {
    if (status === 'accepted') return 'success';
    if (status === 'pending') return 'warning';
    if (status === 'rejected') return 'error';
    return 'default';
  };

  return (
    <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: '12px' }}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead sx={{ bgcolor: 'action.hover' }}>
          <TableRow>
            <TableCell sx={{ fontWeight: 600 }}>ID</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Client Name</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Issue Date</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Valid Until</TableCell>
            <TableCell align="right" sx={{ fontWeight: 600 }}>Amount</TableCell>
            <TableCell align="center" sx={{ fontWeight: 600 }}>Status</TableCell>
            <TableCell align="center" sx={{ fontWeight: 600, width: '120px' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} align="center">
                <Typography variant="body2" color="text.secondary" sx={{ py: 6 }}>
                  No estimates matching filters found. Create a new estimate to start.
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            items.map((est) => {
              const total = calculateTotal(est.items, est.taxRate, est.discount);
              return (
                <TableRow key={est.id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell sx={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '0.8rem' }}>
                    {est.id}
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>
                    <Typography sx={{ fontSize: '0.875rem', fontWeight: 600 }}>
                      {est.clientName}
                    </Typography>
                    {est.clientEmail && (
                      <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary', fontFamily: 'var(--font-sans)' }}>
                        {est.clientEmail}
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell sx={{ fontSize: '0.85rem' }}>{est.date}</TableCell>
                  <TableCell sx={{ fontSize: '0.85rem' }}>{est.dueDate}</TableCell>
                  <TableCell align="right" sx={{ fontFamily: 'var(--font-mono)', fontWeight: 600, fontSize: '0.875rem' }}>
                    {formatCurrency(total, currency)}
                  </TableCell>
                  <TableCell align="center">
                    <Chip 
                      label={est.status.toUpperCase()} 
                      color={getStatusColor(est.status)} 
                      size="small" 
                      sx={{ fontWeight: 700, fontSize: '0.675rem', borderRadius: '6px' }}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.5 }}>
                      <IconButton 
                        size="small" 
                        title="View / Print Document" 
                        onClick={() => onView(est)}
                        color="primary"
                      >
                        <Visibility sx={{ fontSize: 18 }} />
                      </IconButton>
                      <IconButton 
                        size="small" 
                        title="Edit Proposal Details" 
                        onClick={() => onEdit(est)}
                      >
                        <Edit sx={{ fontSize: 18 }} />
                      </IconButton>
                      <IconButton 
                        size="small" 
                        title="More Operations" 
                        onClick={(e) => onOpenMenu(e, est)}
                      >
                        <MoreVert sx={{ fontSize: 18 }} />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
