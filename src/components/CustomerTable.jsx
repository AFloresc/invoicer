import React from 'react';
import { 
  TableContainer, 
  Paper, 
  Table, 
  TableHead, 
  TableRow, 
  TableCell, 
  TableBody, 
  Box, 
  Avatar, 
  Typography, 
  Tooltip, 
  IconButton 
} from '@mui/material';
import { Business, Email, Phone, LocationOn, StickyNote2, Edit, Delete } from '@mui/icons-material';

export function CustomerTable({ filteredCustomers, onEditClick, onDeleteClick, onCustomerClick }) {
  return (
    <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: '12px', overflow: 'hidden' }}>
      <Table>
        <TableHead sx={{ bgcolor: 'action.hover' }}>
          <TableRow>
            <TableCell sx={{ fontWeight: 700 }}>Client Name</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>Company Name</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>Contact Info</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>Billing Address</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>Relationship Notes</TableCell>
            <TableCell align="right" sx={{ fontWeight: 700 }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredCustomers.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} align="center" sx={{ py: 6, color: 'text.secondary' }}>
                No customer profiles found. Let's create your first client!
              </TableCell>
            </TableRow>
          ) : (
            filteredCustomers.map((cust) => (
              <TableRow 
                key={cust.id} 
                hover 
                onClick={() => onCustomerClick?.(cust)}
                sx={{ 
                  cursor: 'pointer', 
                  '&:last-child td, &:last-child th': { border: 0 },
                  transition: 'background-color 0.15s ease'
                }}
              >
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Avatar sx={{ width: 34, height: 34, bgcolor: 'primary.main', fontSize: '0.85rem', fontWeight: 700 }}>
                      {cust.name.charAt(0).toUpperCase()}
                    </Avatar>
                    <Box>
                      <Typography sx={{ fontWeight: 600, fontSize: '0.875rem' }}>{cust.name}</Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ fontFamily: 'var(--font-mono)' }}>{cust.id}</Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  {cust.companyName ? (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <Business sx={{ fontSize: 16, color: 'text.secondary' }} />
                      <Typography sx={{ fontSize: '0.875rem', fontWeight: 500 }}>{cust.companyName}</Typography>
                    </Box>
                  ) : (
                    <Typography sx={{ fontSize: '0.875rem', color: 'text.secondary', fontFamily: 'var(--font-sans)', fontStyle: 'italic' }}>Individual Contract</Typography>
                  )}
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                    {cust.email && (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Email sx={{ fontSize: 14, color: 'text.secondary' }} />
                        <Typography sx={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: 'text.secondary' }}>{cust.email}</Typography>
                      </Box>
                    )}
                    {cust.phone && (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Phone sx={{ fontSize: 14, color: 'text.secondary' }} />
                        <Typography sx={{ fontSize: '0.8rem', color: 'text.secondary' }}>{cust.phone}</Typography>
                      </Box>
                    )}
                  </Box>
                </TableCell>
                <TableCell>
                  {cust.address ? (
                    <Box sx={{ display: 'flex', gap: 0.5, maxWidth: 220 }}>
                      <LocationOn sx={{ fontSize: 14, color: 'text.secondary', mt: 0.2 }} />
                      <Typography sx={{ fontSize: '0.8rem', color: 'text.secondary', whiteSpace: 'normal' }}>
                        {cust.address}
                      </Typography>
                    </Box>
                  ) : (
                    <Typography sx={{ fontSize: '0.8rem', color: 'text.secondary' }}>—</Typography>
                  )}
                </TableCell>
                <TableCell>
                  {cust.notes ? (
                    <Box sx={{ display: 'flex', gap: 0.5, maxWidth: 200 }}>
                      <StickyNote2 sx={{ fontSize: 14, color: 'text.secondary', mt: 0.2 }} />
                      <Typography variant="caption" sx={{ color: 'text.secondary', whiteSpace: 'normal' }}>
                        {cust.notes}
                      </Typography>
                    </Box>
                  ) : (
                    <Typography sx={{ fontSize: '0.8rem', color: 'text.secondary' }}>—</Typography>
                  )}
                </TableCell>
                <TableCell align="right">
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 0.5 }}>
                    <Tooltip title="Edit Profile">
                      <IconButton size="small" onClick={(e) => { e.stopPropagation(); onEditClick(cust); }}>
                        <Edit sx={{ fontSize: 18 }} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Profile">
                      <IconButton size="small" color="error" onClick={(e) => { e.stopPropagation(); onDeleteClick(cust.id); }}>
                        <Delete sx={{ fontSize: 18 }} />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
