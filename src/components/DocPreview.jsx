import React from 'react';
import { 
  Box, 
  Button, 
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Divider, 
  Grid,
  Chip 
} from '@mui/material';
import { Print, Close, Email, Home, Phone, Receipt } from '@mui/icons-material';
import { calculateSubtotal, calculateTotal, formatCurrency } from '../utils.js';

// Modular Subcomponent 1: Print Action Topbar Control
function ActionPanel({ isInvoice, onPrint, onClose }) {
  return (
    <Box 
      className="no-print" 
      sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 4, 
        pb: 2, 
        borderBottom: '1px solid',
        borderColor: 'divider'
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Receipt color="primary" />
        <Typography variant="h6" sx={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
          {isInvoice ? 'Invoice' : 'Estimate'} Preview
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button 
          variant="contained" 
          startIcon={<Print />} 
          onClick={onPrint}
          color="primary"
          sx={{ textTransform: 'none', borderRadius: 2 }}
        >
          Print / PDF
        </Button>
        {onClose && (
          <Button 
            variant="outlined" 
            startIcon={<Close />} 
            onClick={onClose}
            color="inherit"
            sx={{ textTransform: 'none', borderRadius: 2 }}
          >
            Close
          </Button>
        )}
      </Box>
    </Box>
  );
}

// Modular Subcomponent 2: Letterhead Profile (Sender / Brand Profile)
function LetterheadHeader({ finalLogo, settings }) {
  return (
    <Grid size={{ xs: 12, md: 7 }}>
      {finalLogo ? (
        <Box sx={{ mb: 2, maxHeight: '80px', display: 'flex', alignItems: 'center' }}>
          <img 
            src={finalLogo} 
            alt="Company Logo" 
            style={{ maxHeight: '70px', maxWidth: '240px', objectFit: 'contain' }}
            referrerPolicy="no-referrer"
          />
        </Box>
      ) : (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
          <Box 
            sx={{ 
              bgcolor: 'primary.main', 
              color: 'primary.contrastText', 
              borderRadius: '8px', 
              width: 44, 
              height: 44, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '1.2rem',
              fontFamily: 'var(--font-display)'
            }}
          >
            {settings.name ? settings.name.charAt(0).toUpperCase() : 'C'}
          </Box>
          <Typography variant="h5" sx={{ fontWeight: 800, letterSpacing: '-0.5px', fontFamily: 'var(--font-display)', color: '#1a1a1a' }}>
            {settings.name || 'My Company'}
          </Typography>
        </Box>
      )}

      {/* Vendor coordinates */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, color: '#4b5563', fontSize: '0.875rem' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Home sx={{ fontSize: 16, color: '#9ca3af' }} />
          <span>{settings.address || 'Address not configured'}</span>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Email sx={{ fontSize: 16, color: '#9ca3af' }} />
          <span>{settings.email || 'Email not configured'}</span>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Phone sx={{ fontSize: 16, color: '#9ca3af' }} />
          <span>{settings.phone || 'Phone not configured'}</span>
        </Box>
      </Box>
    </Grid>
  );
}

// Modular Subcomponent 3: Billed Recipient Demographics
function BilledPartySection({ doc }) {
  return (
    <Box sx={{ mb: 5 }}>
      <Typography variant="subtitle2" sx={{ color: '#9ca3af', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.75rem', mb: 1, fontFamily: 'var(--font-display)' }}>
        Bill To
      </Typography>
      <Typography variant="h6" sx={{ fontWeight: 700, color: '#1f2937', mb: 0.5, fontSize: '1rem' }}>
        {doc.clientName}
      </Typography>
      <Typography sx={{ color: '#4b5563', fontSize: '0.875rem', whiteSpace: 'pre-line', mb: 0.5 }}>
        {doc.clientAddress}
      </Typography>
      <Typography sx={{ color: '#4b5563', fontSize: '0.875rem', fontFamily: 'var(--font-mono)' }}>
        {doc.clientEmail}
      </Typography>
    </Box>
  );
}

// Modular Subcomponent 4: Terms & Notes footnotes block
function TermsNotesSection({ notes, terms, email, fallbackName }) {
  return (
    <Grid size={{ xs: 12, sm: 6 }}>
      {notes && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="caption" sx={{ color: '#9ca3af', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.7rem', display: 'block', mb: 1, fontFamily: 'var(--font-display)' }}>
            Notes & Details
          </Typography>
          <Typography sx={{ color: '#4b5563', fontSize: '0.8rem', whiteSpace: 'pre-line', lineHeight: 1.5 }}>
            {notes}
          </Typography>
        </Box>
      )}
      
      {terms && (
        <Box>
          <Typography variant="caption" sx={{ color: '#9ca3af', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.7rem', display: 'block', mb: 1, fontFamily: 'var(--font-display)' }}>
            Terms & Conditions
          </Typography>
          <Typography sx={{ color: '#4b5563', fontSize: '0.8rem', whiteSpace: 'pre-line', lineHeight: 1.5 }}>
            {terms}
          </Typography>
        </Box>
      )}
    </Grid>
  );
}

export function DocPreview({ type, document: doc, settings, onClose }) {
  const isInvoice = type === 'invoice';
  const invoice = isInvoice ? doc : undefined;

  const subtotal = calculateSubtotal(doc.items);
  const discountAmount = subtotal * ((doc.discount || 0) / 100);
  const discountedSubtotal = subtotal - discountAmount;
  const taxAmount = discountedSubtotal * ((doc.taxRate || 0) / 100);
  const total = calculateTotal(doc.items, doc.taxRate, doc.discount);

  const handlePrint = () => {
    setTimeout(() => {
      window.print();
    }, 150);
  };

  const getStatusColor = () => {
    if (doc.status === 'paid' || doc.status === 'accepted') return 'success';
    if (doc.status === 'pending') return 'warning';
    if (doc.status === 'overdue' || doc.status === 'rejected') return 'error';
    return 'default';
  };

  const finalLogo = doc.logoUrl || settings.logoUrl;

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }} className="print-container">
      {/* Top action header (Excluded on print mode) */}
      <ActionPanel 
        isInvoice={isInvoice}
        onPrint={handlePrint}
        onClose={onClose}
      />

      {/* Main A4 physical mimic sheet */}
      <Paper 
        elevation={0}
        sx={{ 
          p: { xs: 3, md: '45px' }, 
          border: '1px solid rgba(0,0,0,0.1)', 
          borderRadius: '8px',
          bgcolor: '#ffffff',
          color: '#1a1a1a',
          maxWidth: '800px',
          margin: '0 auto',
          position: 'relative',
          fontFamily: 'var(--font-sans)',
          boxShadow: { xs: 'none', md: '0 4px 20px rgba(0,0,0,0.05)' }
        }}
      >
        {/* Real-time Status Badge Watermark in top corner */}
        <Box sx={{ position: 'absolute', top: 35, right: 35, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 0.5 }}>
          <Chip 
            label={doc.status.toUpperCase()} 
            color={getStatusColor()} 
            variant="filled"
            size="medium"
            sx={{ 
              fontWeight: 700, 
              fontSize: '0.75rem', 
              letterSpacing: '1px',
              fontFamily: 'var(--font-display)',
              borderRadius: '6px',
              px: 1
            }} 
          />
          {isInvoice && invoice?.estimateId && (
            <Typography variant="caption" sx={{ color: 'text.secondary', mt: 0.5, fontSize: '0.7rem' }}>
              Ref: {invoice.estimateId}
            </Typography>
          )}
        </Box>

        {/* Corporate Profile Information Sheet */}
        <Grid container spacing={3} sx={{ mb: 5, pt: 2 }}>
          <LetterheadHeader 
            finalLogo={finalLogo}
            settings={settings}
          />

          <Grid size={{ xs: 12, md: 5 }} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: { xs: 'flex-start', md: 'flex-end' } }}>
            <Typography variant="h3" sx={{ fontWeight: 800, fontFamily: 'var(--font-display)', letterSpacing: '-1px', color: '#111827', mb: 1 }}>
              {isInvoice ? 'INVOICE' : 'ESTIMATE'}
            </Typography>
            
            <Typography variant="h6" sx={{ fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'primary.main', mb: 1.5, fontSize: '1.1rem' }}>
              {doc.id}
            </Typography>

            <Box sx={{ display: 'grid', gridTemplateColumns: 'auto auto', gap: '6px 16px', fontSize: '0.85rem', color: '#4b5563', justifyContent: 'end' }}>
              <span className="font-medium text-gray-400">Issue Date:</span>
              <span className="text-right text-gray-800 font-medium">{doc.date}</span>
              <span className="font-medium text-gray-400">Due Date:</span>
              <span className="text-right text-gray-800 font-medium">{doc.dueDate}</span>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: '#e5e7eb' }} />

        {/* Client Billing Demographics */}
        <BilledPartySection doc={doc} />

        {/* Line Items Table */}
        <TableContainer component={Box} sx={{ mb: 4 }}>
          <Table aria-label="billing items" sx={{ '& .MuiTableCell-root': { py: 1.5, px: 1, borderColor: '#e5e7eb' } }}>
            <TableHead>
              <TableRow sx={{ bgcolor: '#f9fafb' }}>
                <TableCell sx={{ color: '#374151', fontWeight: 700, fontSize: '0.775rem', width: '60px' }}>#</TableCell>
                <TableCell sx={{ color: '#374151', fontWeight: 700, fontSize: '0.775rem' }}>Description</TableCell>
                <TableCell align="center" sx={{ color: '#374151', fontWeight: 700, fontSize: '0.775rem', width: '80px' }}>Qty</TableCell>
                <TableCell align="right" sx={{ color: '#374151', fontWeight: 700, fontSize: '0.775rem', width: '120px' }}>Unit Price</TableCell>
                <TableCell align="right" sx={{ color: '#374151', fontWeight: 700, fontSize: '0.775rem', width: '130px' }}>Line Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {doc.items.map((item, index) => (
                <TableRow key={item.id || index} sx={{ '&:hover': { bgcolor: '#fefefe' } }}>
                  <TableCell sx={{ color: '#4b5563', fontWeight: 500, fontSize: '0.85rem' }}>{index + 1}</TableCell>
                  <TableCell sx={{ color: '#1f2937', fontWeight: 500, fontSize: '0.85rem', whiteSpace: 'pre-line' }}>{item.description}</TableCell>
                  <TableCell align="center" sx={{ color: '#1f2937', fontSize: '0.85rem' }}>{item.quantity}</TableCell>
                  <TableCell align="right" sx={{ color: '#1f2937', fontSize: '0.85rem', fontFamily: 'var(--font-mono)' }}>
                    {formatCurrency(item.unitPrice, settings.currency)}
                  </TableCell>
                  <TableCell align="right" sx={{ color: '#111827', fontWeight: 600, fontSize: '0.85rem', fontFamily: 'var(--font-mono)' }}>
                    {formatCurrency(item.quantity * item.unitPrice, settings.currency)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Calculations / Subtotals Summary footer page bottom */}
        <Grid container spacing={3} sx={{ mt: 1 }}>
          <TermsNotesSection 
            notes={doc.notes}
            terms={doc.terms}
            email={settings.email}
            fallbackName={settings.name}
          />

          <Grid size={{ xs: 12, sm: 6 }} sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, justifyContent: 'flex-start' }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 1, fontSize: '0.875rem' }}>
              <span className="text-gray-500 font-medium">Subtotal</span>
              <span className="text-right text-gray-800 font-medium font-mono">{formatCurrency(subtotal, settings.currency)}</span>

              {doc.discount > 0 && (
                <>
                  <span className="text-gray-500 font-medium">Discount ({doc.discount}%)</span>
                  <span className="text-right text-emerald-600 font-medium font-mono">-{formatCurrency(discountAmount, settings.currency)}</span>
                </>
              )}

              {doc.taxRate > 0 && (
                <>
                  <span className="text-gray-500 font-medium">Tax ({doc.taxRate}%)</span>
                  <span className="text-right text-gray-800 font-medium font-mono">+{formatCurrency(taxAmount, settings.currency)}</span>
                </>
              )}
            </Box>

            <Divider sx={{ my: 1, borderColor: '#e5e7eb' }} />

            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 1, alignItems: 'center' }}>
              <Typography sx={{ fontWeight: 800, color: '#111827', fontSize: '1rem', fontFamily: 'var(--font-display)' }}>
                Grand Total ({settings.currency})
              </Typography>
              <Typography sx={{ fontWeight: 800, color: 'primary.main', fontSize: '1.25rem', fontFamily: 'var(--font-mono)' }}>
                {formatCurrency(total, settings.currency)}
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {/* Brand signature footnote stamp */}
        <Box sx={{ mt: 8, textAlign: 'center', borderTop: '1px dashed #e5e7eb', pt: 3 }} className="print-footer">
          <Typography variant="body2" sx={{ color: '#9ca3af', fontStyle: 'italic', fontSize: '0.775rem' }}>
            Thank you for your business. For billing queries, please contact {settings.email || settings.name}.
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}
