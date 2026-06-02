import React from 'react';
import { Card, CardContent, Box, Typography, Button, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TextField, IconButton } from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import { formatCurrency } from '../utils.js';

export function LineItemsTableSection({ items, currency, onAddItem, onRemoveItem, onUpdateItem }) {
  return (
    <Card variant="outlined" sx={{ borderRadius: '12px', mb: 3 }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, fontFamily: 'var(--font-display)' }}>
            Line Items
          </Typography>
          <Button 
            startIcon={<Add />} 
            variant="outlined" 
            size="small"
            onClick={onAddItem}
            sx={{ textTransform: 'none', borderRadius: '8px', px: 2 }}
          >
            Add Item
          </Button>
        </Box>

        <TableContainer component={Box} sx={{ mt: 1 }}>
          <Table sx={{ '& .MuiTableCell-root': { py: 1.5, px: 0.5 } }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: 'text.secondary', fontWeight: 600, fontSize: '0.8rem' }}>Description</TableCell>
                <TableCell align="center" sx={{ color: 'text.secondary', fontWeight: 600, fontSize: '0.8rem', width: '100px' }}>Quantity</TableCell>
                <TableCell align="right" sx={{ color: 'text.secondary', fontWeight: 600, fontSize: '0.8rem', width: '130px' }}>Unit Price ({currency})</TableCell>
                <TableCell align="right" sx={{ color: 'text.secondary', fontWeight: 600, fontSize: '0.8rem', width: '120px' }}>Total</TableCell>
                <TableCell align="center" sx={{ width: '50px' }}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <TextField
                      placeholder="Service/Product item description"
                      fullWidth
                      variant="outlined"
                      size="small"
                      value={item.description}
                      onChange={(e) => onUpdateItem(item.id, 'description', e.target.value)}
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: '6px' } }}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <TextField
                      type="number"
                      variant="outlined"
                      size="small"
                      value={item.quantity}
                      onChange={(e) => onUpdateItem(item.id, 'quantity', e.target.value)}
                      slotProps={{ htmlInput: { min: 1 } }}
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: '6px' } }}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <TextField
                      type="number"
                      variant="outlined"
                      size="small"
                      value={item.unitPrice}
                      onChange={(e) => onUpdateItem(item.id, 'unitPrice', e.target.value)}
                      slotProps={{ htmlInput: { min: 0, step: '0.01' } }}
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: '6px' } }}
                    />
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600, fontFamily: 'var(--font-mono)', pr: 1, fontSize: '0.875rem' }}>
                    {formatCurrency((parseFloat(item.quantity) || 0) * (parseFloat(item.unitPrice) || 0), currency)}
                  </TableCell>
                  <TableCell align="center">
                    <IconButton 
                      onClick={() => onRemoveItem(item.id)} 
                      color="error" 
                      disabled={items.length === 1 && item.description === ''}
                      size="small"
                    >
                      <Delete sx={{ fontSize: 18 }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}
