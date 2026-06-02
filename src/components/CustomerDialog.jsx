import React, { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  Grid, 
  TextField, 
  DialogActions, 
  Button 
} from '@mui/material';

export function CustomerDialog({ open, onClose, selectedCust, onSave }) {
  const [name, setName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (selectedCust) {
      setName(selectedCust.name || '');
      setCompanyName(selectedCust.companyName || '');
      setEmail(selectedCust.email || '');
      setPhone(selectedCust.phone || '');
      setAddress(selectedCust.address || '');
      setNotes(selectedCust.notes || '');
    } else {
      setName('');
      setCompanyName('');
      setEmail('');
      setPhone('');
      setAddress('');
      setNotes('');
    }
  }, [selectedCust, open]);

  const handleSubmit = () => {
    onSave({
      name,
      companyName,
      email,
      phone,
      address,
      notes
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 700, fontFamily: 'var(--font-display)', pb: 1 }}>
        {selectedCust ? 'Edit Customer Profile' : 'Add New Customer Profile'}
      </DialogTitle>
      <DialogContent dividers sx={{ py: 2.5 }}>
        <Grid container spacing={2.5}>
          <Grid size={{ xs: 12 }}>
            <TextField
              required
              label="Full Client Name"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. John Doe"
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              label="Company Name"
              fullWidth
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="e.g. Acme Corporation"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Client Email Address"
              type="email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. billing@acme.com"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Client Phone Number"
              fullWidth
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. +1 (555) 123-4567"
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
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
          <Grid size={{ xs: 12 }}>
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
        <Button onClick={onClose} variant="outlined" color="inherit">
          Cancel
        </Button>
        <Button onClick={handleSubmit} disabled={!name.trim()} variant="contained" sx={{ bgcolor: 'primary.main' }}>
          {selectedCust ? 'Update Profile' : 'Create Profile'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
