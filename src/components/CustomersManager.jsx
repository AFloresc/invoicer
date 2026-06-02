import React, { useState } from 'react';
import { Box, Typography, Button, TextField, Paper, InputAdornment } from '@mui/material';
import { Add, Search } from '@mui/icons-material';
import { generateNextId } from '../utils.js';
import { CustomerStats } from './CustomerStats.jsx';
import { CustomerTable } from './CustomerTable.jsx';
import { CustomerDialog } from './CustomerDialog.jsx';

export function CustomersManager({ customers, onSaveCustomers }) {
  const [search, setSearch] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCust, setSelectedCust] = useState(null);

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
