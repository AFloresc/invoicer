import React, { useState, useEffect } from 'react';
import { Box, Button, Card, CardContent, Grid, TextField, Typography, Paper } from '@mui/material';
import { calculateSubtotal, loadInvoices, loadEstimates, generateNextId } from '../utils.js';
import { LogoSection } from './LogoSection.jsx';
import { DocumentReferenceSection } from './DocumentReferenceSection.jsx';
import { ClientDetailsSection } from './ClientDetailsSection.jsx';
import { LineItemsTableSection } from './LineItemsTableSection.jsx';
import { TaxDiscountSummarySection } from './TaxDiscountSummarySection.jsx';

export function DocumentForm({ 
  type, 
  onSave, 
  onCancel, 
  initialData, 
  settings,
  customers = []
}) {
  const isInvoice = type === 'invoice';
  const todayStr = new Date().toISOString().split('T')[0];
  const defaultDueDate = () => {
    const d = new Date();
    d.setDate(d.getDate() + 30);
    return d.toISOString().split('T')[0];
  };

  const [docId, setDocId] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientAddress, setClientAddress] = useState('');
  const [date, setDate] = useState(todayStr);
  const [dueDate, setDueDate] = useState(defaultDueDate());
  const [notes, setNotes] = useState('');
  const [terms, setTerms] = useState('');
  const [taxRate, setTaxRate] = useState(0);
  const [taxLabel, setTaxLabel] = useState('');
  const [discount, setDiscount] = useState(0);
  const [logoUrl, setLogoUrl] = useState('');
  const [items, setItems] = useState([{ id: '1', description: '', quantity: 1, unitPrice: 0 }]);

  useEffect(() => {
    if (initialData) {
      setDocId(initialData.id);
      setClientName(initialData.clientName || '');
      setClientEmail(initialData.clientEmail || '');
      setClientAddress(initialData.clientAddress || '');
      setDate(initialData.date || todayStr);
      setDueDate(initialData.dueDate || defaultDueDate());
      setNotes(initialData.notes || '');
      setTerms(initialData.terms || '');
      setTaxRate(initialData.taxRate || 0);
      setTaxLabel(initialData.taxLabel || '');
      setDiscount(initialData.discount || 0);
      setLogoUrl(initialData.logoUrl || '');
      if (initialData.items && initialData.items.length > 0) setItems(initialData.items);
    } else {
      const existing = isInvoice ? loadInvoices() : loadEstimates();
      setDocId(generateNextId(isInvoice ? 'INV' : 'EST', existing));
      setTaxLabel(settings.taxLabel || 'Tax');
      if (settings.logoUrl) setLogoUrl(settings.logoUrl);
    }
  }, [initialData, type, settings]);

  const subtotal = calculateSubtotal(items);

  const handleLogoUpload = (e) => {
    const files = e.target.files;
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => setLogoUrl(reader.result);
      reader.readAsDataURL(files[0]);
    }
  };

  const handleUpdateItem = (id, field, value) => {
    setItems(items.map(item => {
      if (item.id === id) {
        let finalVal = value;
        if (field === 'quantity') finalVal = value === '' ? '' : Math.max(1, parseInt(value, 10) || 0);
        else if (field === 'unitPrice') finalVal = value === '' ? '' : Math.max(0, parseFloat(value) || 0);
        return { ...item, [field]: finalVal };
      }
      return item;
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!clientName.trim()) return window.alert('Client Name is required');
    const filteredItems = items.filter(i => i.description.trim() !== '');
    if (filteredItems.length === 0) return window.alert('Please include at least one valid item description');

    onSave({
      id: docId,
      clientName,
      clientEmail,
      clientAddress,
      date,
      dueDate,
      items: filteredItems,
      notes,
      terms,
      taxRate: taxRate || 0,
      taxLabel: taxLabel || undefined,
      discount: discount || 0,
      logoUrl: logoUrl || undefined,
      status: initialData ? initialData.status : 'pending',
      estimateId: initialData?.estimateId || undefined
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ py: 2 }}>
      <Grid container spacing={3}>
        <Grid item size={{ xs: 12, md: 4 }}>
          <Grid container spacing={3}>
            <Grid item size={12}>
              <LogoSection isInvoice={isInvoice} logoUrl={logoUrl} onLogoUpload={handleLogoUpload} onClearLogo={() => setLogoUrl('')} />
            </Grid>
            <Grid item size={12}>
              <DocumentReferenceSection initialData={initialData} docId={docId} onDocIdChange={setDocId} date={date} onDateChange={setDate} dueDate={dueDate} onDueDateChange={setDueDate} />
            </Grid>
          </Grid>
        </Grid>

        <Grid item size={{ xs: 12, md: 8 }}>
          <ClientDetailsSection customers={customers} clientName={clientName} onClientNameChange={setClientName} clientEmail={clientEmail} onClientEmailChange={setClientEmail} clientAddress={clientAddress} onClientAddressChange={setClientAddress} />

          <LineItemsTableSection 
            items={items} 
            currency={settings.currency} 
            onAddItem={() => setItems([...items, { id: String(items.length > 0 ? Math.max(...items.map(i => parseInt(i.id) || 0)) + 1 : 1), description: '', quantity: 1, unitPrice: 0 }])} 
            onRemoveItem={(id) => setItems(items.length === 1 ? [{ id: '1', description: '', quantity: 1, unitPrice: 0 }] : items.filter(item => item.id !== id))} 
            onUpdateItem={handleUpdateItem} 
          />

          <TaxDiscountSummarySection 
            subtotal={subtotal} 
            discount={discount} 
            onDiscountChange={setDiscount} 
            taxRate={taxRate} 
            onTaxRateChange={setTaxRate} 
            taxLabel={taxLabel}
            onTaxLabelChange={setTaxLabel}
            settings={settings} 
          />

          <Grid container spacing={3} sx={{ mt: 0.5 }}>
            <Grid item size={12}>
              <Card variant="outlined" sx={{ borderRadius: '12px' }}>
                <CardContent sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, fontFamily: 'var(--font-display)' }}>Disclaimers & Notes</Typography>
                  <TextField label="Notes & Observations" placeholder="Remarks..." multiline rows={2} variant="outlined" fullWidth value={notes} onChange={(e) => setNotes(e.target.value)} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />
                  <TextField label="Terms & Conditions" placeholder="Standard policies..." multiline rows={2} variant="outlined" fullWidth value={terms} onChange={(e) => setTerms(e.target.value)} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>

        <Grid item size={12}>
          <Paper elevation={0} sx={{ p: 2, display: 'flex', justifyContent: 'flex-end', gap: 2, border: '1px solid', borderColor: 'divider', borderRadius: '12px' }}>
            <Button variant="outlined" onClick={onCancel} color="inherit" sx={{ textTransform: 'none', borderRadius: '8px', px: 3 }}>Cancel</Button>
            <Button type="submit" variant="contained" color="primary" sx={{ textTransform: 'none', borderRadius: '8px', px: 4 }}>Save {isInvoice ? 'Invoice' : 'Estimate'}</Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
