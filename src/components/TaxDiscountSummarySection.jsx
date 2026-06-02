import React from 'react';
import { Grid, Card, CardContent, Typography, TextField, InputAdornment, Box, Divider } from '@mui/material';

export function TaxDiscountSummarySection({ subtotal, discount, onDiscountChange, taxRate, onTaxRateChange, settings }) {
  const discountAmount = subtotal * (discount / 100);
  const total = subtotal * (1 - discount / 100) * (1 + taxRate / 100);

  return (
    <Grid container spacing={3}>
      <Grid item size={{ xs: 12, sm: 6 }}>
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

      <Grid item size={{ xs: 12, sm: 6 }}>
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
                  <span className="font-mono text-right text-emerald-600 font-semibold font-mono">-{settings.currency}{discountAmount.toFixed(2)}</span>
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
