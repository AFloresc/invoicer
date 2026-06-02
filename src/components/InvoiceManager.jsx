import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Chip, 
  IconButton, 
  TextField, 
  Menu, 
  MenuItem, 
  InputAdornment,
  Grid,
  Divider,
  Alert
} from '@mui/material';
import { 
  Add, 
  Search, 
  Visibility, 
  Edit, 
  Delete, 
  MoreVert, 
  Paid, 
  HourglassEmpty,
  ErrorOutlined
} from '@mui/icons-material';
import { calculateTotal, formatCurrency } from '../utils.js';

// Modular Subcomponent 1: Overdue Billing Alerts Header
function OverdueAlert({ count }) {
  if (count <= 0) return null;
  return (
    <Alert 
      severity="error" 
      variant="outlined" 
      sx={{ mb: 3, borderRadius: '10px', bgcolor: 'rgba(239, 68, 68, 0.03)', border: '1px solid rgba(239, 68, 68, 0.2)' }}
      icon={<ErrorOutlined />}
    >
      Company currently has <strong>{count} overdue accounts</strong> that require immediate collection followup or grace-period updates.
    </Alert>
  );
}

// Modular Subcomponent 2: Filter and Search Panel
function InvoiceFilters({ search, onSearchChange, statusFilter, onStatusFilterChange }) {
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

// Modular Subcomponent 3: Ledger Table
function InvoicesTable({ items, currency, onView, onEdit, onOpenMenu }) {
  const getStatusColor = (status) => {
    if (status === 'paid') return 'success';
    if (status === 'pending') return 'warning';
    if (status === 'overdue') return 'error';
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
            <TableCell sx={{ fontWeight: 600 }}>Due Date</TableCell>
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
                  No invoices matching filters found. Create a new invoice to start.
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            items.map((inv) => {
              const total = calculateTotal(inv.items, inv.taxRate, inv.discount);
              return (
                <TableRow key={inv.id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell sx={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '0.8rem' }}>
                    {inv.id}
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>
                    <Typography sx={{ fontSize: '0.875rem', fontWeight: 600 }}>
                      {inv.clientName}
                    </Typography>
                    {inv.clientEmail && (
                      <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary', fontFamily: 'var(--font-sans)' }}>
                        {inv.clientEmail}
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell sx={{ fontSize: '0.85rem' }}>{inv.date}</TableCell>
                  <TableCell sx={{ fontSize: '0.85rem' }}>{inv.dueDate}</TableCell>
                  <TableCell align="right" sx={{ fontFamily: 'var(--font-mono)', fontWeight: 600, fontSize: '0.875rem' }}>
                    {formatCurrency(total, currency)}
                  </TableCell>
                  <TableCell align="center">
                    <Chip 
                      label={inv.status.toUpperCase()} 
                      color={getStatusColor(inv.status)} 
                      size="small" 
                      sx={{ fontWeight: 700, fontSize: '0.675rem', borderRadius: '6px' }}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.5 }}>
                      <IconButton 
                        size="small" 
                        title="View / Print Document" 
                        onClick={() => onView(inv)}
                        color="primary"
                      >
                        <Visibility sx={{ fontSize: 18 }} />
                      </IconButton>
                      <IconButton 
                        size="small" 
                        title="Edit Invoice Details" 
                        onClick={() => onEdit(inv)}
                      >
                        <Edit sx={{ fontSize: 18 }} />
                      </IconButton>
                      <IconButton 
                        size="small" 
                        title="Change Balance State" 
                        onClick={(e) => onOpenMenu(e, inv)}
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

  // Menu Anchors for Row Actions popup
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
      {/* Header section panel */}
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

      {/* Warnings / Notifications for overdue files */}
      <OverdueAlert count={overdueInvoicesCount} />

      {/* Filter and search controls panel */}
      <InvoiceFilters 
        search={search}
        onSearchChange={setSearch}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
      />

      {/* Main invoice ledger table sheet */}
      <InvoicesTable 
        items={filteredInvoices}
        currency={settings.currency}
        onView={onViewInvoice}
        onEdit={onEditInvoice}
        onOpenMenu={handleOpenMenu}
      />

      {/* Row context floating state operational menu */}
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
