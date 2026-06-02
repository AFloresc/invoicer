import React from 'react';
import { Grid, Card, CardContent, Typography, TextField, InputAdornment, Box, Divider } from '@mui/material';
import { formatCurrency } from '../utils.js';

export function TaxDiscountSummarySection({ 
  subtotal, 
  discount, 
  onDiscountChange, 
  taxRate, 
  onTaxRateChange, 
  taxLabel, 
  onTaxLabelChange, 
  settings 
}) {
  const discountAmount = subtotal * (discount / 100);
  const total = subtotal * (1 - discount / 100) * (1 + taxRate / 100);
  const activeTaxLabel = taxLabel || settings.taxLabel || 'Tax';

  return (
    <Grid container spacing={3}>
      <Grid item size={{ xs: 12, sm: 6 }}>
        <Card variant="outlined" sx={{ borderRadius: '12px', height: '100%' }}>
          <CardContent sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, fontFamily: 'var(--font-display)' }}>
              {activeTaxLabel} & Discounts
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

            <Grid container spacing={2}>
              <Grid item size={6}>
                <TextField
                  label={`${activeTaxLabel} Rate`}
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
              </Grid>
              <Grid item size={6}>
                <TextField
                  label={`${activeTaxLabel} Term / Label`}
                  variant="outlined"
                  fullWidth
                  placeholder="e.g. Tax, IVA, VAT"
                  value={taxLabel}
                  onChange={(e) => onTaxLabelChange(e.target.value)}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      <Grid item size={{ xs: 12, sm: 6 }}>
        <Card variant="outlined" sx={{ borderRadius: '12px', height: '100%', bgcolor: 'action.hover' }}>
          <CardContent sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, fontFamily: 'var(--font-display)' }}>
              Financial Summary
            </Typography>
            
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 1.5, fontSize: '0.85rem', color: 'text.secondary' }}>
              <span>Subtotal</span>
              <span className="font-mono text-right font-semibold">
                {formatCurrency(subtotal, settings.currency, settings.currencyPosition)}
              </span>

              {discount > 0 && (
                <>
                  <span>Discount ({discount}%)</span>
                  <span className="font-mono text-right text-emerald-600 font-semibold font-mono">
                    -{formatCurrency(discountAmount, settings.currency, settings.currencyPosition)}
                  </span>
                </>
              )}

              {taxRate > 0 && (
                <>
                  <span>{activeTaxLabel} ({taxRate}%)</span>
                  <span className="font-mono text-right font-semibold animate-pulse-subtle">
                    +{formatCurrency((subtotal - discountAmount) * (taxRate / 100), settings.currency, settings.currencyPosition)}
                  </span>
                </>
              )}
            </Box>

            <Divider />

            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 1, alignItems: 'center' }}>
              <Typography sx={{ fontWeight: 700, fontSize: '0.9rem', fontFamily: 'var(--font-display)' }}>
                Grand Total:
              </Typography>
              <Typography sx={{ fontWeight: 800, fontSize: '1.25rem', fontFamily: 'var(--font-mono)', color: 'primary.main' }}>
                {formatCurrency(total, settings.currency, settings.currencyPosition)}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
