import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { Receipt, RequestQuote } from '@mui/icons-material';
import { KPICards } from './KPICards.jsx';
import { RevenueAllocationChart } from './RevenueAllocationChart.jsx';
import { TransactionStatusCounters } from './TransactionStatusCounters.jsx';
import { RecentTransactionsTable } from './RecentTransactionsTable.jsx';
import { calculateTotal } from '../utils.js';

export function Dashboard({ 
  invoices, 
  estimates, 
  settings, 
  onNavigate,
  onViewInvoice,
  onViewEstimate
}) {
  const currency = settings.currency;

  const recentInvoices = [...invoices]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 4);

  const recentEstimates = [...estimates]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 4);

  const invoiceStatuses = invoices.reduce((acc, inv) => {
    acc[inv.status] = (acc[inv.status] || 0) + 1;
    return acc;
  }, { paid: 0, pending: 0, overdue: 0 });

  const invoiceAmounts = invoices.reduce((acc, inv) => {
    const total = calculateTotal(inv.items, inv.taxRate, inv.discount);
    acc[inv.status] = (acc[inv.status] || 0) + total;
    return acc;
  }, { paid: 0, pending: 0, overdue: 0 });

  const totalInvoicesValue = Object.values(invoiceAmounts).reduce((a, b) => a + b, 0);

  return (
    <Box sx={{ animation: 'fadeIn 0.4s ease' }}>
      {/* Page Title */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'text.primary', mb: 0.5, letterSpacing: '-0.02em' }}>
          Finance Operations Dashboard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Overview of company metrics, estimates, invoices, and cash flow indices for {settings.name}.
        </Typography>
      </Box>

      {/* KPI Stats Grid */}
      <KPICards invoices={invoices} estimates={estimates} settings={settings} />

      {/* Visual Charts Row */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item size={{ xs: 12, md: 7 }}>
          <RevenueAllocationChart 
            paid={invoiceAmounts.paid}
            pending={invoiceAmounts.pending}
            overdue={invoiceAmounts.overdue}
            total={totalInvoicesValue}
            currency={currency}
          />
        </Grid>
        <Grid item size={{ xs: 12, md: 5 }}>
          <TransactionStatusCounters 
            paid={invoiceStatuses.paid}
            pending={invoiceStatuses.pending}
            overdue={invoiceStatuses.overdue}
            total={invoices.length}
          />
        </Grid>
      </Grid>

      {/* Activity Tables Row */}
      <Grid container spacing={3}>
        <Grid item size={{ xs: 12, md: 6 }}>
          <RecentTransactionsTable 
            title="Recent Invoices"
            icon={<Receipt color="primary" />}
            buttonLabel="Invoices Ledger"
            items={recentInvoices}
            currency={currency}
            onNavigate={() => onNavigate('invoices')}
            onClickRow={onViewInvoice}
            isInvoice={true}
          />
        </Grid>
        <Grid item size={{ xs: 12, md: 6 }}>
          <RecentTransactionsTable 
            title="Recent Estimates"
            icon={<RequestQuote color="primary" />}
            buttonLabel="Proposals Book"
            items={recentEstimates}
            currency={currency}
            onNavigate={() => onNavigate('estimates')}
            onClickRow={onViewEstimate}
            isInvoice={false}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
