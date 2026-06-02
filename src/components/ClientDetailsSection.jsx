import React, { useState } from 'react';
import { Card, CardContent, Box, Typography, TextField, InputAdornment, MenuItem, Grid } from '@mui/material';
import { ContactPage } from '@mui/icons-material';

export function ClientDetailsSection({ 
  customers, 
  clientName, 
  onClientNameChange, 
  clientEmail, 
  onClientEmailChange, 
  clientAddress, 
  onClientAddressChange 
}) {
  const [selectedCustId, setSelectedCustId] = useState('');

  const handleCustomerSelect = (e) => {
    const cid = e.target.value;
    setSelectedCustId(cid);
    if (!cid) return;
    const target = customers.find(c => c.id === cid);
    if (target) {
      onClientNameChange(target.name);
      onClientEmailChange(target.email || '');
      onClientAddressChange(target.address || '');
    }
  };

  return (
    <Card variant="outlined" sx={{ borderRadius: '12px', mb: 3 }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', mb: 2.5, gap: 1 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, fontFamily: 'var(--font-display)' }}>
            Client Contact Details
          </Typography>
          
          {customers && customers.length > 0 && (
            <TextField
              select
              size="small"
              label="Auto-Fill from Customers"
              value={selectedCustId}
              onChange={handleCustomerSelect}
              sx={{ minWidth: '220px', '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <ContactPage sx={{ fontSize: 16, color: 'text.secondary' }} />
                    </InputAdornment>
                  )
                }
              }}
            >
              <MenuItem value="">— Select Customer —</MenuItem>
              {customers.map(c => (
                <MenuItem key={c.id} value={c.id}>
                  {c.name} {c.companyName ? `(${c.companyName})` : ''}
                </MenuItem>
              ))}
            </TextField>
          )}
        </Box>
        
        <Grid container spacing={2.5}>
          <Grid item size={12}>
            <TextField
              label="Client Name / Organization"
              variant="outlined"
              required
              fullWidth
              placeholder="e.g. Wayne Enterprises"
              value={clientName}
              onChange={(e) => onClientNameChange(e.target.value)}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
            />
          </Grid>
          <Grid item size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Client Email Address"
              type="email"
              variant="outlined"
              fullWidth
              placeholder="accounts@waynecorp.com"
              value={clientEmail}
              onChange={(e) => onClientEmailChange(e.target.value)}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
            />
          </Grid>
          <Grid item size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Client Billing Address"
              variant="outlined"
              fullWidth
              placeholder="Wayne Tower, Gotham City, NJ"
              value={clientAddress}
              onChange={(e) => onClientAddressChange(e.target.value)}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
