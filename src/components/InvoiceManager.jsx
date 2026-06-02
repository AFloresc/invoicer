import React, { useState } from 'react';
import { Box, Typography, Button, Menu, MenuItem, Divider } from '@mui/material';
import { Add, Paid, HourglassEmpty, ErrorOutlined, Delete } from '@mui/icons-material';
import { OverdueAlert } from './OverdueAlert.jsx';
import { InvoiceFilters } from './InvoiceFilters.jsx';
import { InvoicesTable } from './InvoicesTable.jsx';

export function InvoiceManager({ 
  invoices, 
  onAddInvoice, 
  onEditInvoice, 
  onDeleteInvoice, 
  onUpdateStatus, 
  onViewInvoice,
  settings 
}) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedInv, setSelectedInv] = useState(null);

  const handleOpenMenu = (event, inv) => {
    setAnchorEl(event.currentTarget);
    setSelectedInv(inv);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedInv(null);
  };

  const filteredInvoices = invoices.filter(inv => {
    const matchesSearch = 
      inv.clientName.toLowerCase().includes(search.toLowerCase()) ||
      inv.id.toLowerCase().includes(search.toLowerCase()) ||
      (inv.clientEmail && inv.clientEmail.toLowerCase().includes(search.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || inv.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const overdueInvoicesCount = invoices.filter(i => i.status === 'overdue').length;

  return (
    <Box sx={{ animation: 'fadeIn 0.4s ease' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h4" sx={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'text.primary', mb: 0.5, letterSpacing: '-0.02em' }}>
            Invoices & Accounts
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Issue billings, track collectables, record client balances, and log settlements.
          </Typography>
        </Box>
        <Button 
          variant="contained" 
          startIcon={<Add />} 
          onClick={onAddInvoice}
          sx={{ textTransform: 'none', borderRadius: '10px', px: 3, py: 1 }}
        >
          New Invoice
        </Button>
      </Box>

      <OverdueAlert count={overdueInvoicesCount} />

      <InvoiceFilters 
        search={search}
        onSearchChange={setSearch}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
      />

      <InvoicesTable 
        items={filteredInvoices}
        currency={settings.currency}
        onView={onViewInvoice}
        onEdit={onEditInvoice}
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
        <MenuItem onClick={() => { if (selectedInv) onUpdateStatus(selectedInv.id, 'paid'); handleCloseMenu(); }} sx={{ gap: 1, color: 'success.main', fontWeight: 600 }}>
          <Paid sx={{ fontSize: 16 }} /> Mark as Paid
        </MenuItem>
        
        <MenuItem onClick={() => { if (selectedInv) onUpdateStatus(selectedInv.id, 'pending'); handleCloseMenu(); }} sx={{ gap: 1, color: 'warning.main', fontWeight: 600 }}>
          <HourglassEmpty sx={{ fontSize: 16 }} /> Mark as Pending
        </MenuItem>

        <MenuItem onClick={() => { if (selectedInv) onUpdateStatus(selectedInv.id, 'overdue'); handleCloseMenu(); }} sx={{ gap: 1, color: 'error.main', fontWeight: 600 }}>
          <ErrorOutlined sx={{ fontSize: 16 }} /> Mark as Overdue
        </MenuItem>

        <Divider sx={{ my: 0.5 }} />

        <MenuItem 
          onClick={() => { 
            if (selectedInv && window.confirm(`Are you sure you want to permanently delete Invoice ${selectedInv.id}?`)) {
              onDeleteInvoice(selectedInv.id);
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
