import React from 'react';
import { Paper, Grid, TextField, InputAdornment, Box, Button } from '@mui/material';
import { Search } from '@mui/icons-material';

export function InvoiceFilters({ search, onSearchChange, statusFilter, onStatusFilterChange }) {
  return (
    <Paper elevation={0} sx={{ p: 2.5, mb: 3, border: '1px solid', borderColor: 'divider', borderRadius: '12px' }}>
      <Grid container spacing={2} sx={{ alignItems: 'center' }}>
        <Grid size={{ xs: 12, sm: 6, md: 8 }}>
          <TextField
            size="small"
            placeholder="Search invoice ID, client name, email..."
            fullWidth
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ color: 'text.secondary', fontSize: 18 }} />
                  </InputAdornment>
                ),
              }
            }}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            {['all', 'paid', 'pending', 'overdue'].map((filter) => (
              <Button
                key={filter}
                variant={statusFilter === filter ? 'contained' : 'outlined'}
                color={filter === 'all' ? 'primary' : statusFilter === filter ? (filter === 'paid' ? 'success' : filter === 'pending' ? 'warning' : 'error') : 'inherit'}
                size="small"
                onClick={() => onStatusFilterChange(filter)}
                sx={{ 
                  textTransform: 'none', 
                  borderRadius: '8px', 
                  fontSize: '0.75rem',
                  flexGrow: 1,
                  py: 0.75
                }}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </Button>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}
