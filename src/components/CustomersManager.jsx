import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  TextField, 
  Paper, 
  InputAdornment, 
  Grid, 
  Avatar, 
  Divider, 
  Chip, 
  Table, 
  TableHead, 
  TableRow, 
  TableCell, 
  TableBody, 
  TableContainer,
  IconButton,
  Card,
  CardContent,
  Tooltip
} from '@mui/material';
import { 
  Add, 
  Search, 
  ArrowBack, 
  Business, 
  Email, 
  Phone, 
  LocationOn, 
  StickyNote2, 
  Receipt, 
  AttachMoney, 
  Warning, 
  HourglassEmpty,
  Launch
} from '@mui/icons-material';
import { generateNextId, calculateTotal, formatCurrency } from '../utils.js';
import { CustomerStats } from './CustomerStats.jsx';
import { CustomerTable } from './CustomerTable.jsx';
import { CustomerDialog } from './CustomerDialog.jsx';

export function CustomersManager({ customers, invoices = [], settings = {}, onSaveCustomers, onViewInvoice }) {
  const [search, setSearch] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCust, setSelectedCust] = useState(null);
  const [viewingCustomer, setViewingCustomer] = useState(null);

  const currency = settings.currency || '$';
  const currencyPosition = settings.currencyPosition || 'before';

  const handleAddClick = () => {
    setSelectedCust(null);
    setOpenDialog(true);
  };

  const handleEditClick = (cust) => {
    setSelectedCust(cust);
    setOpenDialog(true);
  };

  const handleSave = (fields) => {
    let updatedList;
    if (selectedCust) {
      updatedList = customers.map(c => c.id === selectedCust.id ? { ...c, ...fields } : c);
      // update state if currently viewing this customer
      if (viewingCustomer && viewingCustomer.id === selectedCust.id) {
        setViewingCustomer({ ...viewingCustomer, ...fields });
      }
    } else {
      const newId = generateNextId('CUST', customers);
      const newCust = { id: newId, ...fields };
      updatedList = [newCust, ...customers];
    }
    onSaveCustomers(updatedList);
    setOpenDialog(false);
  };

  const handleDeleteClick = (id) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      const updatedList = customers.filter(c => c.id !== id);
      onSaveCustomers(updatedList);
      if (viewingCustomer && viewingCustomer.id === id) {
        setViewingCustomer(null);
      }
    }
  };

  const filteredCustomers = customers.filter(c => {
    const term = search.toLowerCase();
    return (
      (c.name || '').toLowerCase().includes(term) ||
      (c.companyName || '').toLowerCase().includes(term) ||
      (c.email || '').toLowerCase().includes(term) ||
      (c.phone || '').toLowerCase().includes(term)
    );
  });

  // Calculate customer-specific metrics & invoices
  const customerInvoices = viewingCustomer ? invoices.filter(inv => {
    const custName = (viewingCustomer.name || '').trim().toLowerCase();
    const custCompany = (viewingCustomer.companyName || '').trim().toLowerCase();
    const custEmail = (viewingCustomer.email || '').trim().toLowerCase();

    const invName = (inv.clientName || '').trim().toLowerCase();
    const invEmail = (inv.clientEmail || '').trim().toLowerCase();

    const nameMatch = custName && invName === custName;
    const companyMatch = custCompany && invName === custCompany;
    const emailMatch = custEmail && invEmail && invEmail === custEmail;

    return nameMatch || companyMatch || emailMatch;
  }) : [];

  const totalInvoiced = customerInvoices.reduce((sum, i) => sum + calculateTotal(i.items, i.taxRate, i.discount), 0);
  const totalPaid = customerInvoices.filter(i => i.status === 'paid').reduce((sum, i) => sum + calculateTotal(i.items, i.taxRate, i.discount), 0);
  const totalPending = customerInvoices.filter(i => i.status === 'pending').reduce((sum, i) => sum + calculateTotal(i.items, i.taxRate, i.discount), 0);
  const totalOverdue = customerInvoices.filter(i => i.status === 'overdue').reduce((sum, i) => sum + calculateTotal(i.items, i.taxRate, i.discount), 0);

  const getStatusBadgeColor = (status) => {
    if (status === 'paid') return 'success';
    if (status === 'pending') return 'warning';
    if (status === 'overdue') return 'error';
    return 'default';
  };

  if (viewingCustomer) {
    return (
      <Box sx={{ animation: 'fadeIn 0.3s ease' }}>
        {/* Breadcrumb Header Nav */}
        <Box sx={{ mb: 4, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
          <Button 
            startIcon={<ArrowBack />} 
            onClick={() => setViewingCustomer(null)}
            variant="outlined" 
            sx={{ textTransform: 'none', borderRadius: '8px', fontWeight: 600 }}
          >
            Back to Customer Directory
          </Button>

          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() => handleEditClick(viewingCustomer)}
              sx={{ textTransform: 'none', fontWeight: 600, borderRadius: '8px' }}
            >
              Edit Customer Profile
            </Button>
            <Button
              variant="contained"
              color="error"
              size="small"
              onClick={() => handleDeleteClick(viewingCustomer.id)}
              sx={{ textTransform: 'none', fontWeight: 600, borderRadius: '8px' }}
            >
              Delete
            </Button>
          </Box>
        </Box>

        <Grid container spacing={3}>
          {/* Customer Metadata Card */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper elevation={0} sx={{ p: 3, border: '1px solid', borderColor: 'divider', borderRadius: '12px', height: '100%', display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                <Avatar sx={{ width: 56, height: 56, bgcolor: 'primary.main', fontSize: '1.25rem', fontWeight: 800 }}>
                  {viewingCustomer.name.charAt(0).toUpperCase()}
                </Avatar>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 800, fontFamily: 'var(--font-display)' }}>
                    {viewingCustomer.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ fontFamily: 'var(--font-mono)' }}>
                    {viewingCustomer.id}
                  </Typography>
                </Box>
              </Box>

              <Divider />

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {viewingCustomer.companyName && (
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                    <Business color="action" sx={{ mt: 0.3 }} />
                    <Box>
                      <Typography variant="caption" color="text.secondary" display="block">Company Partner</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>{viewingCustomer.companyName}</Typography>
                    </Box>
                  </Box>
                )}

                {viewingCustomer.email && (
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                    <Email color="action" sx={{ mt: 0.3 }} />
                    <Box>
                      <Typography variant="caption" color="text.secondary" display="block">Email Address</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600, fontFamily: 'var(--font-mono)', wordBreak: 'break-all' }}>{viewingCustomer.email}</Typography>
                    </Box>
                  </Box>
                )}

                {viewingCustomer.phone && (
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                    <Phone color="action" sx={{ mt: 0.3 }} />
                    <Box>
                      <Typography variant="caption" color="text.secondary" display="block">Phone Contact</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>{viewingCustomer.phone}</Typography>
                    </Box>
                  </Box>
                )}

                {viewingCustomer.address && (
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                    <LocationOn color="action" sx={{ mt: 0.3 }} />
                    <Box>
                      <Typography variant="caption" color="text.secondary" display="block">Physical Address</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>{viewingCustomer.address}</Typography>
                    </Box>
                  </Box>
                )}

                {viewingCustomer.notes && (
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                    <StickyNote2 color="action" sx={{ mt: 0.3 }} />
                    <Box>
                      <Typography variant="caption" color="text.secondary" display="block">Internal Corporate Notes</Typography>
                      <Typography variant="body2" sx={{ fontStyle: 'italic', color: 'text.secondary' }}>{viewingCustomer.notes}</Typography>
                    </Box>
                  </Box>
                )}
              </Box>
            </Paper>
          </Grid>

          {/* Customer Summaries Section */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {/* Stats row */}
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <Card variant="outlined" sx={{ borderRadius: '12px' }}>
                    <CardContent sx={{ p: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                        <Typography variant="caption" sx={{ fontWeight: 650, color: 'text.secondary', textTransform: 'uppercase' }}>Total Billed</Typography>
                        <Receipt sx={{ fontSize: 18, color: 'text.disabled' }} />
                      </Box>
                      <Typography variant="h6" sx={{ fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'text.primary' }}>
                        {formatCurrency(totalInvoiced, currency, currencyPosition)}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {customerInvoices.length} Invoices issued
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <Card variant="outlined" sx={{ borderRadius: '12px', borderLeft: '4px solid', borderLeftColor: 'success.main' }}>
                    <CardContent sx={{ p: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                        <Typography variant="caption" sx={{ fontWeight: 650, color: 'text.secondary', textTransform: 'uppercase' }}>Collected Revenue</Typography>
                        <AttachMoney sx={{ fontSize: 18, color: 'success.main' }} />
                      </Box>
                      <Typography variant="h6" sx={{ fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'success.main' }}>
                        {formatCurrency(totalPaid, currency, currencyPosition)}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {customerInvoices.filter(i => i.status === 'paid').length} Paid Invoices
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <Card variant="outlined" sx={{ borderRadius: '12px', borderLeft: '4px solid', borderLeftColor: 'warning.main' }}>
                    <CardContent sx={{ p: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                        <Typography variant="caption" sx={{ fontWeight: 650, color: 'text.secondary', textTransform: 'uppercase' }}>Pending Balance</Typography>
                        <HourglassEmpty sx={{ fontSize: 18, color: 'warning.main' }} />
                      </Box>
                      <Typography variant="h6" sx={{ fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'warning.main' }}>
                        {formatCurrency(totalPending, currency, currencyPosition)}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {customerInvoices.filter(i => i.status === 'pending').length} Invoices pending
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <Card variant="outlined" sx={{ borderRadius: '12px', borderLeft: '4px solid', borderLeftColor: 'error.main' }}>
                    <CardContent sx={{ p: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                        <Typography variant="caption" sx={{ fontWeight: 650, color: 'text.secondary', textTransform: 'uppercase' }}>Past Due Balance</Typography>
                        <Warning sx={{ fontSize: 18, color: 'error.main' }} />
                      </Box>
                      <Typography variant="h6" sx={{ fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'error.main' }}>
                        {formatCurrency(totalOverdue, currency, currencyPosition)}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {customerInvoices.filter(i => i.status === 'overdue').length} Overdue Invoices
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>

              {/* Invoices List Table */}
              <Paper elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: '12px', overflow: 'hidden' }}>
                <Box sx={{ px: 3, py: 2, borderBottom: '1px solid', borderColor: 'divider', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, fontFamily: 'var(--font-display)' }}>
                    Client Invoices History ({customerInvoices.length})
                  </Typography>
                </Box>
                
                <TableContainer>
                  <Table sx={{ minWidth: 600 }}>
                    <TableHead sx={{ bgcolor: 'action.hover' }}>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 700 }}>Invoice ID</TableCell>
                        <TableCell sx={{ fontWeight: 700 }}>Issue Date</TableCell>
                        <TableCell sx={{ fontWeight: 700 }}>Due Date</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 700 }}>Grand Total</TableCell>
                        <TableCell align="center" sx={{ fontWeight: 700 }}>Status</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 700 }}>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {customerInvoices.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={6} align="center" sx={{ py: 6, color: 'text.secondary' }}>
                            No invoices recorded under this customer.
                          </TableCell>
                        </TableRow>
                      ) : (
                        customerInvoices.map((inv) => (
                          <TableRow key={inv.id} hover>
                            <TableCell sx={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '0.85rem' }}>
                              {inv.id}
                            </TableCell>
                            <TableCell sx={{ fontSize: '0.85rem' }}>{inv.date}</TableCell>
                            <TableCell sx={{ fontSize: '0.85rem' }}>{inv.dueDate}</TableCell>
                            <TableCell align="right" sx={{ fontFamily: 'var(--font-mono)', fontWeight: 600, fontSize: '0.85rem' }}>
                              {formatCurrency(calculateTotal(inv.items, inv.taxRate, inv.discount), currency, currencyPosition)}
                            </TableCell>
                            <TableCell align="center">
                              <Chip 
                                label={inv.status.toUpperCase()} 
                                color={getStatusBadgeColor(inv.status)} 
                                size="small" 
                                sx={{ fontWeight: 700, fontSize: '0.65rem' }}
                              />
                            </TableCell>
                            <TableCell align="right">
                              <Tooltip title="View Document">
                                <IconButton 
                                  size="small" 
                                  color="primary" 
                                  onClick={() => onViewInvoice?.(inv)}
                                >
                                  <Launch sx={{ fontSize: 18 }} />
                                </IconButton>
                              </Tooltip>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Box>
          </Grid>
        </Grid>

        {/* Create / Edit Dialog Component */}
        <CustomerDialog 
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          selectedCust={selectedCust}
          onSave={handleSave}
        />
      </Box>
    );
  }

  return (
    <Box sx={{ animation: 'fadeIn 0.4s ease' }}>
      {/* Page Header */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 2, mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'text.primary', mb: 0.5, letterSpacing: '-0.02em' }}>
            Customers Relationship Directory
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage your corporate clients, contact coordinates, billing profiles, and client relationship notes.
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleAddClick}
          sx={{ bgcolor: 'primary.main', fontWeight: 600 }}
        >
          Add Customer
        </Button>
      </Box>

      {/* Stats Quick Cards */}
      <CustomerStats 
        customersCount={customers.length} 
        corporateCount={customers.filter(c => !!c.companyName).length} 
      />

      {/* Filter and search controls panel */}
      <Paper elevation={0} sx={{ p: 2.5, mb: 3, border: '1px solid', borderColor: 'divider', borderRadius: '12px' }}>
        <TextField
          size="small"
          placeholder="Search by client name, company, email address, or phone..."
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)}
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
      </Paper>

      {/* Table list */}
      <CustomerTable 
        filteredCustomers={filteredCustomers}
        onEditClick={handleEditClick}
        onDeleteClick={handleDeleteClick}
        onCustomerClick={(cust) => setViewingCustomer(cust)}
      />

      {/* Create / Edit Dialog Component */}
      <CustomerDialog 
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        selectedCust={selectedCust}
        onSave={handleSave}
      />
    </Box>
  );
}
