import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  TextField, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  IconButton, 
  InputAdornment, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions,
  Grid,
  Tooltip,
  Card,
  CardContent,
  Avatar
} from '@mui/material';
import { 
  Add, 
  Edit, 
  Delete, 
  Search, 
  Email, 
  Phone, 
  Business, 
  LocationOn, 
  StickyNote2 
} from '@mui/icons-material';
import { generateNextId } from '../utils.js';

export function CustomersManager({ customers, onSaveCustomers, settings }) {
  const [search, setSearch] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCust, setSelectedCust] = useState(null);

  // Form Fields
  const [name, setName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');

  // Handle open dialog for adding
  const handleAddClick = () => {
    setSelectedCust(null);
    setName('');
    setCompanyName('');
    setEmail('');
    setPhone('');
    setAddress('');
    setNotes('');
    setOpenDialog(true);
  };

  // Handle open dialog for editing
  const handleEditClick = (cust) => {
    setSelectedCust(cust);
    setName(cust.name || '');
    setCompanyName(cust.companyName || '');
    setEmail(cust.email || '');
    setPhone(cust.phone || '');
    setAddress(cust.address || '');
    setNotes(cust.notes || '');
    setOpenDialog(true);
  };

  // Handle save customer
  const handleSave = () => {
    if (!name.trim()) return;

    let updatedList;
    if (selectedCust) {
      // Update
      updatedList = customers.map(c => c.id === selectedCust.id ? {
        ...c,
        name,
        companyName,
        email,
        phone,
        address,
        notes
      } : c);
    } else {
      // Create
      const newId = generateNextId('CUST', customers);
      const newCust = {
        id: newId,
        name,
        companyName,
        email,
        phone,
        address,
        notes
      };
      updatedList = [newCust, ...customers];
    }

    onSaveCustomers(updatedList);
    setOpenDialog(false);
  };

  // Handle delete click
  const handleDeleteClick = (id) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      const updatedList = customers.filter(c => c.id !== id);
      onSaveCustomers(updatedList);
    }
  };

  // Filter customers by search term
  const filteredCustomers = customers.filter(c => {
    const term = search.toLowerCase();
    return (
      (c.name || '').toLowerCase().includes(term) ||
      (c.companyName || '').toLowerCase().includes(term) ||
      (c.email || '').toLowerCase().includes(term) ||
      (c.phone || '').toLowerCase().includes(term)
    );
  });

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
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderLeft: '4px solid #2563eb' }}>
            <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
              <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                Total Active Clients
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700, mt: 0.5 }}>
                {customers.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderLeft: '4px solid #10b981' }}>
            <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
              <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                Corporate Entities
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700, mt: 0.5 }}>
                {customers.filter(c => !!c.companyName).length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm:6, md:4 }}>
          <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderLeft: '4px solid #f59e0b' }}>
            <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
              <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                Local Database Mode
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700, mt: 0.5, color: 'warning.main', fontSize: '1.5rem', lineHeight: 1.5 }}>
                Synced Local Cache
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

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

      {/* Customers Table List */}
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
                <TableRow key={cust.id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
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
                      <Typography sx={{ fontSize: '0.875rem', color: 'text.secondary', italic: true }}>Individual Contract</Typography>
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
                        <Typography sx={{ fontSize: '0.8rem', color: 'text.secondary', whiteSpace: 'normal', lineClamp: 2 }}>
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
                        <IconButton size="small" onClick={() => handleEditClick(cust)}>
                          <Edit sx={{ fontSize: 18 }} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete Profile">
                        <IconButton size="small" color="error" onClick={() => handleDeleteClick(cust.id)}>
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

      {/* Add / Edit Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 700, fontFamily: 'var(--font-display)', pb: 1 }}>
          {selectedCust ? 'Edit Customer Profile' : 'Add New Customer Profile'}
        </DialogTitle>
        <DialogContent dividers sx={{ py: 2.5 }}>
          <Grid container spacing={2.5}>
            <Grid item size={{ xs: 12 }}>
              <TextField
                required
                label="Full Client Name"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. John Doe"
              />
            </Grid>
            <Grid item size={{ xs: 12 }}>
              <TextField
                label="Company Name"
                fullWidth
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="e.g. Acme Corporation"
              />
            </Grid>
            <Grid item size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Client Email Address"
                type="email"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. billing@acme.com"
              />
            </Grid>
            <Grid item size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Client Phone Number"
                fullWidth
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. +1 (555) 123-4567"
              />
            </Grid>
            <Grid item size={{ xs: 12 }}>
              <TextField
                label="Billing Address"
                multiline
                rows={2}
                fullWidth
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="e.g. 100 Industrial Parkway, Chicago, IL 60611"
              />
            </Grid>
            <Grid item size={{ xs: 12 }}>
              <TextField
                label="Relationship Notes"
                multiline
                rows={2}
                fullWidth
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Standard terms Net 30, primary software account"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 2.5 }}>
          <Button onClick={() => setOpenDialog(false)} variant="outlined" color="inherit">
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!name.trim()} variant="contained" sx={{ bgcolor: 'primary.main' }}>
            {selectedCust ? 'Update Profile' : 'Create Profile'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
