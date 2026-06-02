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
  Divider
} from '@mui/material';
import { 
  Add, 
  Search, 
  Visibility, 
  Edit, 
  Delete, 
  Check, 
  Close, 
  MoreVert, 
  Transform 
} from '@mui/icons-material';
import { calculateTotal, formatCurrency } from '../utils.js';

// Modular Subcomponent 1: Filter panel for estimates
function EstimateFilters({ search, onSearchChange, statusFilter, onStatusFilterChange }) {
  return (
    <Paper elevation={0} sx={{ p: 2.5, mb: 3, border: '1px solid', borderColor: 'divider', borderRadius: '12px' }}>
      <Grid container spacing={2} sx={{ alignItems: 'center' }}>
        <Grid size={{ xs: 12, sm: 6, md: 8 }}>
          <TextField
            size="small"
            placeholder="Search estimate ID, client name, email..."
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
            {['all', 'pending', 'accepted', 'rejected'].map((filter) => (
              <Button
                key={filter}
                variant={statusFilter === filter ? 'contained' : 'outlined'}
                color={filter === 'all' ? 'primary' : statusFilter === filter ? (filter === 'accepted' ? 'success' : filter === 'pending' ? 'warning' : 'error') : 'inherit'}
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

// Modular Subcomponent 2: Main table sheet listing estimates
function EstimatesTable({ items, currency, onView, onEdit, onOpenMenu }) {
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

  // Menu Anchors for Row Actions popup
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedEst, setSelectedEst] = useState(null);

  const handleOpenMenu = (event, est) => {
    setAnchorEl(event.currentTarget);
    setSelectedEst(est);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedInv(null);
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
      {/* Header section panel */}
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

      {/* Filter and search controls panel */}
      <EstimateFilters 
        search={search}
        onSearchChange={setSearch}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
      />

      {/* Main estimate ledger table sheet */}
      <EstimatesTable 
        items={filteredEstimates}
        currency={settings.currency}
        onView={onViewEstimate}
        onEdit={onEditEstimate}
        onOpenMenu={handleOpenMenu}
      />

      {/* Row context floating operational menu */}
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
