import React from 'react';
import { Box, Typography, Grid, TextField, MenuItem, Divider, Button, Paper } from '@mui/material';
import { Business, Save } from '@mui/icons-material';

export function CorporateContactProfile({ 
  name, setName, 
  email, setEmail, 
  address, setAddress, 
  phone, setPhone, 
  currency, setCurrency, 
  currencyPosition, setCurrencyPosition,
  taxLabel, setTaxLabel,
  language, setLanguage,
  onSubmit 
}) {
  return (
    <Paper 
      component="form" 
      onSubmit={onSubmit}
      elevation={0} 
      sx={{ p: 3, border: '1px solid', borderColor: 'divider', borderRadius: '12px' }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
        <Business color="primary" />
        <Typography variant="subtitle1" sx={{ fontWeight: 700, fontFamily: 'var(--font-display)' }}>
          Corporate Contact Profile
        </Typography>
      </Box>

      <Grid container spacing={2.5}>
        <Grid size={12}>
          <TextField
            label="Registered Company Name"
            required
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            label="Official Email Address"
            type="email"
            required
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            label="Phone Number"
            variant="outlined"
            fullWidth
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
          />
        </Grid>

        <Grid size={12}>
          <TextField
            label="HQ Physical Address"
            multiline
            rows={2}
            variant="outlined"
            fullWidth
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            select
            label="Default Billing Currency"
            variant="outlined"
            fullWidth
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
          >
            <MenuItem value="$">United States Dollar ($)</MenuItem>
            <MenuItem value="€">Euro (€)</MenuItem>
            <MenuItem value="£">British Pound Sterling (£)</MenuItem>
            <MenuItem value="¥">Japanese Yen / Chinese Yuan (¥)</MenuItem>
            <MenuItem value="₹">Indian Rupee (₹)</MenuItem>
            <MenuItem value="A$">Australian Dollar (A$)</MenuItem>
            <MenuItem value="C$">Canadian Dollar (C$)</MenuItem>
          </TextField>
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            select
            label="Currency Symbol Position"
            variant="outlined"
            fullWidth
            value={currencyPosition || 'before'}
            onChange={(e) => setCurrencyPosition(e.target.value)}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
          >
            <MenuItem value="before">Before Amount (e.g. $100.00)</MenuItem>
            <MenuItem value="after">After Amount (e.g. 100.00 $)</MenuItem>
          </TextField>
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            label="Default Tax Label / Term"
            variant="outlined"
            fullWidth
            placeholder="e.g. Tax, IVA, VAT"
            value={taxLabel || 'Tax'}
            onChange={(e) => setTaxLabel(e.target.value)}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            select
            label="Default Document Language"
            variant="outlined"
            fullWidth
            value={language || 'en'}
            onChange={(e) => setLanguage(e.target.value)}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
          >
            <MenuItem value="en">English (default)</MenuItem>
            <MenuItem value="es">Español (Spanish)</MenuItem>
            <MenuItem value="ca">Català (Catalan)</MenuItem>
          </TextField>
        </Grid>
      </Grid>

      <Divider sx={{ my: 3 }} />

      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button 
          type="submit" 
          variant="contained" 
          startIcon={<Save />}
          sx={{ textTransform: 'none', borderRadius: '8px', px: 4, py: 1 }}
        >
          Save Settings
        </Button>
      </Box>
    </Paper>
  );
}
