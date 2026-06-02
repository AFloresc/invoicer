import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Button, 
  Card, 
  CardContent, 
  Grid, 
  TextField, 
  Typography, 
  IconButton, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Divider,
  Paper,
  InputAdornment,
  MenuItem
} from '@mui/material';
import { 
  Add, 
  Delete, 
  Save, 
  Cancel, 
  Photo, 
  DeleteForever,
  EditCalendar,
  ContactPage
} from '@mui/icons-material';
import { calculateSubtotal, calculateTotal, loadInvoices, loadEstimates, generateNextId } from '../utils.js';

// Modular Subcomponent 1: Logo Upload & Customizer
function LogoSection({ isInvoice, logoUrl, onLogoUpload, onClearLogo }) {
  return (
    <Card variant="outlined" sx={{ borderRadius: '12px' }}>
      <CardContent sx={{ p: 3 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5, fontFamily: 'var(--font-display)' }}>
          {isInvoice ? 'Invoice' : 'Estimate'} Logo
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, fontSize: '0.8rem' }}>
          Select a custom logo for this document. If omitted, the default template logo is used.
        </Typography>

        {logoUrl ? (
          <Box sx={{ border: '1px dashed', borderColor: 'divider', borderRadius: '8px', p: 2, textAlign: 'center', position: 'relative', bgcolor: '#fff' }}>
            <img 
              src={logoUrl} 
              alt="Logo preview" 
              style={{ maxHeight: '100px', maxWidth: '100%', objectFit: 'contain', margin: '0 auto' }} 
              referrerPolicy="no-referrer"
            />
            <IconButton 
              color="error" 
              onClick={onClearLogo} 
              sx={{ position: 'absolute', top: 5, right: 5, bgcolor: 'rgba(255,255,255,0.8)', '&:hover': { bgcolor: '#ffebee' } }}
              size="small"
              title="Remove Logo"
            >
              <DeleteForever sx={{ fontSize: 18 }} />
            </IconButton>
          </Box>
        ) : (
          <Box 
            sx={{ 
              border: '1px dashed', 
              borderColor: 'divider', 
              borderRadius: '8px', 
              p: 3, 
              textAlign: 'center', 
              color: 'text.secondary',
              cursor: 'pointer',
              bgcolor: 'action.hover',
              transition: 'all 0.2s',
              '&:hover': {
                borderColor: 'primary.main',
                bgcolor: 'action.selected'
              }
            }}
            component="label"
          >
            <input 
              type="file" 
              accept="image/*" 
              onChange={onLogoUpload} 
              hidden 
            />
            <Photo sx={{ fontSize: 36, mb: 1, opacity: 0.5 }} />
            <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.75rem' }}>
              Click to Upload Logo File
            </Typography>
            <Typography variant="caption" sx={{ fontSize: '0.65rem', display: 'block', mt: 0.5 }}>
              Supports PNG, JPG, GIF
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}

// Modular Subcomponent 2: Document Reference Details Box
function DocumentReferenceSection({ initialData, docId, onDocIdChange, date, onDateChange, dueDate, onDueDateChange }) {
  return (
    <Card variant="outlined" sx={{ borderRadius: '12px' }}>
      <CardContent sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 2.5 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 700, fontFamily: 'var(--font-display)' }}>
          Document Reference
        </Typography>

        <TextField
          label="Reference ID"
          variant="outlined"
          fullWidth
          disabled={!!initialData}
          value={docId}
          onChange={(e) => onDocIdChange(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <EditCalendar sx={{ fontSize: 18, color: 'text.secondary' }} />
                </InputAdornment>
              )
            }
          }}
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
        />

        <TextField
          label="Issue Date"
          type="date"
          variant="outlined"
          fullWidth
          value={date}
          onChange={(e) => onDateChange(e.target.value)}
          slotProps={{ inputLabel: { shrink: true } }}
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
        />

        <TextField
          label="Due Date"
          type="date"
          variant="outlined"
          fullWidth
          value={dueDate}
          onChange={(e) => onDueDateChange(e.target.value)}
          slotProps={{ inputLabel: { shrink: true } }}
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
        />
      </CardContent>
    </Card>
  );
}

// Modular Subcomponent 3: Client contact details with custom Customer Auto-Fill selector
function ClientDetailsSection({ 
  customers, 
  clientName, 
  onClientNameChange, 
  clientEmail, 
  onClientEmailChange, 
  clientAddress, 
  onClientAddressChange 
}) {
  const [selectedCustId, setSelectedCustId] = useState('');

  const handleCustomerSelect = (e) => {
    const cid = e.target.value;
    setSelectedCustId(cid);
    if (!cid) return;
    const target = customers.find(c => c.id === cid);
    if (target) {
      onClientNameChange(target.name);
      onClientEmailChange(target.email || '');
      onClientAddressChange(target.address || '');
    }
  };

  return (
    <Card variant="outlined" sx={{ borderRadius: '12px', mb: 3 }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', mb: 2.5, gap: 1 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, fontFamily: 'var(--font-display)' }}>
            Client Contact Details
          </Typography>
          
          {customers && customers.length > 0 && (
            <TextField
              select
              size="small"
              label="Auto-Fill from Customers"
              value={selectedCustId}
              onChange={handleCustomerSelect}
              sx={{ minWidth: '220px', '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <ContactPage sx={{ fontSize: 16, color: 'text.secondary' }} />
                    </InputAdornment>
                  )
                }
              }}
            >
              <MenuItem value="">— Select Customer —</MenuItem>
              {customers.map(c => (
                <MenuItem key={c.id} value={c.id}>
                  {c.name} {c.companyName ? `(${c.companyName})` : ''}
                </MenuItem>
              ))}
            </TextField>
          )}
        </Box>
        
        <Grid container spacing={2.5}>
          <Grid size={12}>
            <TextField
              label="Client Name / Organization"
              variant="outlined"
              required
              fullWidth
              placeholder="e.g. Wayne Enterprises"
              value={clientName}
              onChange={(e) => onClientNameChange(e.target.value)}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Client Email Address"
              type="email"
              variant="outlined"
              fullWidth
              placeholder="accounts@waynecorp.com"
              value={clientEmail}
              onChange={(e) => onClientEmailChange(e.target.value)}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Client Billing Address"
              variant="outlined"
              fullWidth
              placeholder="Wayne Tower, Gotham City, NJ"
              value={clientAddress}
              onChange={(e) => onClientAddressChange(e.target.value)}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

// Modular Subcomponent 4: Line Items Table Builder
function LineItemsTableSection({ items, currency, onAddItem, onRemoveItem, onUpdateItem }) {
  return (
    <Card variant="outlined" sx={{ borderRadius: '12px', mb: 3 }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, fontFamily: 'var(--font-display)' }}>
            Line Items
          </Typography>
          <Button 
            startIcon={<Add />} 
            variant="outlined" 
            size="small"
            onClick={onAddItem}
            sx={{ textTransform: 'none', borderRadius: '8px', px: 2 }}
          >
            Add Item
          </Button>
        </Box>

        <TableContainer component={Box} sx={{ mt: 1 }}>
          <Table sx={{ '& .MuiTableCell-root': { py: 1.5, px: 0.5 } }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: 'text.secondary', fontWeight: 600, fontSize: '0.8rem' }}>Description</TableCell>
                <TableCell align="center" sx={{ color: 'text.secondary', fontWeight: 600, fontSize: '0.8rem', width: '100px' }}>Quantity</TableCell>
                <TableCell align="right" sx={{ color: 'text.secondary', fontWeight: 600, fontSize: '0.8rem', width: '130px' }}>Unit Price ({currency})</TableCell>
                <TableCell align="right" sx={{ color: 'text.secondary', fontWeight: 600, fontSize: '0.8rem', width: '120px' }}>Total</TableCell>
                <TableCell align="center" sx={{ width: '50px' }}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <TextField
                      placeholder="Service/Product item description"
                      fullWidth
                      variant="outlined"
                      size="small"
                      value={item.description}
                      onChange={(e) => onUpdateItem(item.id, 'description', e.target.value)}
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: '6px' } }}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <TextField
                      type="number"
                      variant="outlined"
                      size="small"
                      value={item.quantity}
                      onChange={(e) => onUpdateItem(item.id, 'quantity', e.target.value)}
                      slotProps={{ htmlInput: { min: 1 } }}
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: '6px' } }}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <TextField
                      type="number"
                      variant="outlined"
                      size="small"
                      value={item.unitPrice}
                      onChange={(e) => onUpdateItem(item.id, 'unitPrice', e.target.value)}
                      slotProps={{ htmlInput: { min: 0, step: '0.01' } }}
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: '6px' } }}
                    />
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600, fontFamily: 'var(--font-mono)', pr: 1, fontSize: '0.875rem' }}>
                    {currency}{((parseFloat(item.quantity) || 0) * (parseFloat(item.unitPrice) || 0)).toFixed(2)}
                  </TableCell>
                  <TableCell align="center">
                    <IconButton 
                      onClick={() => onRemoveItem(item.id)} 
                      color="error" 
                      disabled={items.length === 1 && item.description === ''}
                      size="small"
                    >
                      <Delete sx={{ fontSize: 18 }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}

// Modular Subcomponent 5: Financial Summary Panel & Taxes
function TaxDiscountSummarySection({ subtotal, discount, onDiscountChange, taxRate, onTaxRateChange, settings }) {
  const discountAmount = subtotal * (discount / 100);
  const total = subtotal * (1 - discount / 100) * (1 + taxRate / 100);

  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, sm: 6 }}>
        <Card variant="outlined" sx={{ borderRadius: '12px', height: '100%' }}>
          <CardContent sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, fontFamily: 'var(--font-display)' }}>
              Tax & Discounts
            </Typography>

            <TextField
              label="Discount Rate"
              type="number"
              variant="outlined"
              fullWidth
              slotProps={{
                input: {
                  endAdornment: <InputAdornment position="end">%</InputAdornment>,
                },
                htmlInput: { min: 0, max: 100 }
              }}
              value={discount}
              onChange={(e) => onDiscountChange(Math.max(0, Math.min(100, parseFloat(e.target.value) || 0)))}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
            />

            <TextField
              label="Tax Rate"
              type="number"
              variant="outlined"
              fullWidth
              slotProps={{
                input: {
                  endAdornment: <InputAdornment position="end">%</InputAdornment>,
                },
                htmlInput: { min: 0, max: 100 }
              }}
              value={taxRate}
              onChange={(e) => onTaxRateChange(Math.max(0, Math.min(100, parseFloat(e.target.value) || 0)))}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
            />
          </CardContent>
        </Card>
      </Grid>

      <Grid size={{ xs: 12, sm: 6 }}>
        <Card variant="outlined" sx={{ borderRadius: '12px', height: '100%', bgcolor: 'action.hover' }}>
          <CardContent sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, fontFamily: 'var(--font-display)' }}>
              Financial Summary
            </Typography>
            
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 1.5, fontSize: '0.85rem', color: 'text.secondary' }}>
              <span>Subtotal</span>
              <span className="font-mono text-right font-semibold">{settings.currency}{subtotal.toFixed(2)}</span>

              {discount > 0 && (
                <>
                  <span>Discount ({discount}%)</span>
                  <span className="font-mono text-right text-emerald-600 font-semibold">-{settings.currency}{discountAmount.toFixed(2)}</span>
                </>
              )}

              {taxRate > 0 && (
                <>
                  <span>Tax ({taxRate}%)</span>
                  <span className="font-mono text-right font-semibold">+{settings.currency}{((subtotal - discountAmount) * (taxRate / 100)).toFixed(2)}</span>
                </>
              )}
            </Box>

            <Divider />

            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 1, alignItems: 'center' }}>
              <Typography sx={{ fontWeight: 700, fontSize: '0.9rem', fontFamily: 'var(--font-display)' }}>
                Grand Total:
              </Typography>
              <Typography sx={{ fontWeight: 800, fontSize: '1.25rem', fontFamily: 'var(--font-mono)', color: 'primary.main' }}>
                {settings.currency}{total.toFixed(2)}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

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
  const [discount, setDiscount] = useState(0);
  const [logoUrl, setLogoUrl] = useState('');
  const [items, setItems] = useState([
    { id: '1', description: '', quantity: 1, unitPrice: 0 }
  ]);

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
      setDiscount(initialData.discount || 0);
      setLogoUrl(initialData.logoUrl || '');
      
      if (initialData.items && initialData.items.length > 0) {
        setItems(initialData.items);
      }
    } else {
      const existing = isInvoice ? loadInvoices() : loadEstimates();
      const generated = generateNextId(isInvoice ? 'INV' : 'EST', existing);
      setDocId(generated);
      
      if (settings.logoUrl) {
        setLogoUrl(settings.logoUrl);
      }
    }
  }, [initialData, type, settings]);

  const subtotal = calculateSubtotal(items);

  const handleLogoUpload = (e) => {
    const files = e.target.files;
    if (files && files[0]) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClearLogo = () => {
    setLogoUrl('');
  };

  const handleAddItem = () => {
    const nextId = String(items.length > 0 ? Math.max(...items.map(i => parseInt(i.id) || 0)) + 1 : 1);
    setItems([...items, { id: nextId, description: '', quantity: 1, unitPrice: 0 }]);
  };

  const handleRemoveItem = (id) => {
    if (items.length === 1) {
      setItems([{ id: '1', description: '', quantity: 1, unitPrice: 0 }]);
      return;
    }
    setItems(items.filter(item => item.id !== id));
  };

  const handleUpdateItem = (id, field, value) => {
    setItems(items.map(item => {
      if (item.id === id) {
        let finalVal = value;
        if (field === 'quantity') {
          finalVal = value === '' ? '' : Math.max(1, parseInt(value, 10) || 0);
        } else if (field === 'unitPrice') {
          finalVal = value === '' ? '' : Math.max(0, parseFloat(value) || 0);
        }
        return { ...item, [field]: finalVal };
      }
      return item;
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!clientName.trim()) {
      window.alert('Client Name is required');
      return;
    }
    
    const filteredItems = items.filter(i => i.description.trim() !== '');
    if (filteredItems.length === 0) {
      window.alert('Please include at least one valid item description');
      return;
    }

    const payload = {
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
      discount: discount || 0,
      logoUrl: logoUrl || undefined,
      status: initialData ? initialData.status : 'pending',
      estimateId: initialData?.estimateId || undefined
    };

    onSave(payload);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ py: 2 }}>
      <Grid container spacing={3}>
        {/* Left Side: Logo and References */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Grid container spacing={3}>
            <Grid size={12}>
              <LogoSection 
                isInvoice={isInvoice}
                logoUrl={logoUrl}
                onLogoUpload={handleLogoUpload}
                onClearLogo={handleClearLogo}
              />
            </Grid>
            <Grid size={12}>
              <DocumentReferenceSection 
                initialData={initialData}
                docId={docId}
                onDocIdChange={setDocId}
                date={date}
                onDateChange={setDate}
                dueDate={dueDate}
                onDueDateChange={setDueDate}
              />
            </Grid>
          </Grid>
        </Grid>

        {/* Right Side: Client details, Items, totals & notes */}
        <Grid size={{ xs: 12, md: 8 }}>
          <ClientDetailsSection 
            customers={customers}
            clientName={clientName}
            onClientNameChange={setClientName}
            clientEmail={clientEmail}
            onClientEmailChange={setClientEmail}
            clientAddress={clientAddress}
            onClientAddressChange={setClientAddress}
          />

          <LineItemsTableSection 
            items={items}
            currency={settings.currency}
            onAddItem={handleAddItem}
            onRemoveItem={handleRemoveItem}
            onUpdateItem={handleUpdateItem}
          />

          <TaxDiscountSummarySection 
            subtotal={subtotal}
            discount={discount}
            onDiscountChange={setDiscount}
            taxRate={taxRate}
            onTaxRateChange={setTaxRate}
            settings={settings}
          />

          {/* Disclaimers notes card */}
          <Grid container spacing={3} sx={{ mt: 0.5 }}>
            <Grid size={12}>
              <Card variant="outlined" sx={{ borderRadius: '12px' }}>
                <CardContent sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, fontFamily: 'var(--font-display)' }}>
                    Disclaimers & Notes
                  </Typography>

                  <TextField
                    label="Notes & Observations"
                    placeholder="Introduce remarks, payment instructions, or greetings..."
                    multiline
                    rows={2}
                    variant="outlined"
                    fullWidth
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
                  />

                  <TextField
                    label="Terms & Conditions"
                    placeholder="Standard policies, collection terms, or warranty declarations..."
                    multiline
                    rows={2}
                    variant="outlined"
                    fullWidth
                    value={terms}
                    onChange={(e) => setTerms(e.target.value)}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
                  />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>

        {/* Save/Cancel Panel */}
        <Grid size={12}>
          <Paper 
            elevation={0}
            sx={{ 
              p: 2, 
              display: 'flex', 
              justifyContent: 'flex-end', 
              gap: 2, 
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: '12px' 
            }}
          >
            <Button 
              variant="outlined" 
              onClick={onCancel}
              color="inherit"
              sx={{ textTransform: 'none', borderRadius: '8px', px: 3 }}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              variant="contained" 
              color="primary"
              sx={{ textTransform: 'none', borderRadius: '8px', px: 4 }}
            >
              Save {isInvoice ? 'Invoice' : 'Estimate'}
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
