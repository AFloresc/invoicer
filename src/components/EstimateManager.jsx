import React, { useState } from 'react';
import { Box, Typography, Button, Menu, MenuItem, Divider } from '@mui/material';
import { Add, Check, Close, Transform, Delete } from '@mui/icons-material';
import { EstimateFilters } from './EstimateFilters.jsx';
import { EstimatesTable } from './EstimatesTable.jsx';

export function EstimateManager({ 
  estimates, 
  onAddEstimate, 
  onEditEstimate, 
  onDeleteEstimate, 
  onUpdateStatus, 
  onConvertToInvoice,
  onViewEstimate,
  settings 
}) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedEst, setSelectedEst] = useState(null);

  const handleOpenMenu = (event, est) => {
    setAnchorEl(event.currentTarget);
    setSelectedEst(est);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedEst(null);
  };

  const filteredEstimates = estimates.filter(est => {
    const matchesSearch = 
      est.clientName.toLowerCase().includes(search.toLowerCase()) ||
      est.id.toLowerCase().includes(search.toLowerCase()) ||
      (est.clientEmail && est.clientEmail.toLowerCase().includes(search.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || est.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <Box sx={{ animation: 'fadeIn 0.4s ease' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h4" sx={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'text.primary', mb: 0.5, letterSpacing: '-0.02em' }}>
            Estimates & Proposals
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Pitch jobs, create detailed quotation sheets, and track client approvals.
          </Typography>
        </Box>
        <Button 
          variant="contained" 
          startIcon={<Add />} 
          onClick={onAddEstimate}
          sx={{ textTransform: 'none', borderRadius: '10px', px: 3, py: 1 }}
        >
          New Estimate
        </Button>
      </Box>

      <EstimateFilters 
        search={search}
        onSearchChange={setSearch}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
      />

      <EstimatesTable 
        items={filteredEstimates}
        currency={settings.currency}
        onView={onViewEstimate}
        onEdit={onEditEstimate}
        onOpenMenu={handleOpenMenu}
      />

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        sx={{ '& .MuiPaper-root': { borderRadius: '8px', minWidth: 180, p: 0.5 } }}
      >
        {selectedEst?.status === 'pending' && [
          <MenuItem key="accept" onClick={() => { onUpdateStatus(selectedEst.id, 'accepted'); handleCloseMenu(); }} sx={{ gap: 1, color: 'success.main', fontWeight: 600 }}>
            <Check sx={{ fontSize: 16 }} /> Accept Quote
          </MenuItem>,
          <MenuItem key="reject" onClick={() => { onUpdateStatus(selectedEst.id, 'rejected'); handleCloseMenu(); }} sx={{ gap: 1, color: 'error.main', fontWeight: 600 }}>
            <Close sx={{ fontSize: 16 }} /> Reject Quote
          </MenuItem>
        ]}

        {selectedEst?.status === 'accepted' && (
          <MenuItem 
            onClick={() => { onConvertToInvoice(selectedEst); handleCloseMenu(); }}
            sx={{ gap: 1, fontWeight: 700, color: 'primary.main' }}
          >
            <Transform sx={{ fontSize: 16 }} /> Convert to Invoice
          </MenuItem>
        )}

        <Divider sx={{ my: 0.5 }} />

        <MenuItem 
          onClick={() => { 
            if (selectedEst && window.confirm(`Are you sure you want to permanently delete Estimate ${selectedEst.id}?`)) {
              onDeleteEstimate(selectedEst.id);
            }
            handleCloseMenu();
          }} 
          sx={{ gap: 1, color: 'error.main' }}
        >
          <Delete sx={{ fontSize: 16 }} /> Delete
        </MenuItem>
      </Menu>
    </Box>
  );
}
