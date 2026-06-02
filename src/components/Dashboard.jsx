import React, { useState } from 'react';
import { Box, Typography, Grid, TextField, MenuItem, Paper } from '@mui/material';
import { Receipt, RequestQuote, DateRange } from '@mui/icons-material';
import { KPICards } from './KPICards.jsx';
import { RevenueAllocationChart } from './RevenueAllocationChart.jsx';
import { TransactionStatusCounters } from './TransactionStatusCounters.jsx';
import { RecentTransactionsTable } from './RecentTransactionsTable.jsx';
import { calculateTotal } from '../utils.js';

// Date matching helper
function isDateWithinFilter(docDateStr, filterType, customStart, customEnd) {
  if (filterType === 'all') return true;
  if (!docDateStr) return false;

  const docDate = new Date(docDateStr);
  docDate.setHours(0, 0, 0, 0);

  const now = new Date();
  
  switch (filterType) {
    case 'week': {
      // Current week ranges (Monday to Sunday)
      const currentDay = now.getDay();
      const distanceToMonday = now.getDate() - currentDay + (currentDay === 0 ? -6 : 1);
      const startOfWeek = new Date(now.getFullYear(), now.getMonth(), distanceToMonday, 0, 0, 0, 0);
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      endOfWeek.setHours(23, 59, 59, 999);
      return docDate >= startOfWeek && docDate <= endOfWeek;
    }
    case 'month': {
      // Current month
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0);
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
      return docDate >= startOfMonth && docDate <= endOfMonth;
    }
    case 'trimester': {
      // Trimester = 3-month block (Q1: Jan-Mar, Q2: Apr-Jun, Q3: Jul-Sep, Q4: Oct-Dec)
      const currentMonth = now.getMonth();
      const trimesterIndex = Math.floor(currentMonth / 3);
      const startMonth = trimesterIndex * 3;
      const endMonth = startMonth + 2;
      const startOfTrimester = new Date(now.getFullYear(), startMonth, 1, 0, 0, 0, 0);
      const endOfTrimester = new Date(now.getFullYear(), endMonth + 1, 0, 23, 59, 59, 999);
      return docDate >= startOfTrimester && docDate <= endOfTrimester;
    }
    case 'semester': {
      // Semester = 6-month block (S1: Jan-Jun, S2: Jul-Dec)
      const currentMonth = now.getMonth();
      const semesterIndex = Math.floor(currentMonth / 6);
      const startMonth = semesterIndex * 6;
      const endMonth = startMonth + 5;
      const startOfSemester = new Date(now.getFullYear(), startMonth, 1, 0, 0, 0, 0);
      const endOfSemester = new Date(now.getFullYear(), endMonth + 1, 0, 23, 59, 59, 999);
      return docDate >= startOfSemester && docDate <= endOfSemester;
    }
    case 'year': {
      // Current year (Jan 1 to Dec 31)
      const startOfYear = new Date(now.getFullYear(), 0, 1, 0, 0, 0, 0);
      const endOfYear = new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999);
      return docDate >= startOfYear && docDate <= endOfYear;
    }
    case 'custom': {
      if (!customStart && !customEnd) return true;
      let matchesStart = true;
      let matchesEnd = true;
      if (customStart) {
        const start = new Date(customStart);
        start.setHours(0, 0, 0, 0);
        matchesStart = docDate >= start;
      }
      if (customEnd) {
        const end = new Date(customEnd);
        end.setHours(23, 59, 59, 999);
        matchesEnd = docDate <= end;
      }
      return matchesStart && matchesEnd;
    }
    default:
      return true;
  }
}

export function Dashboard({ 
  invoices, 
  estimates, 
  settings, 
  onNavigate,
  onViewInvoice,
  onViewEstimate
}) {
  const currency = settings.currency;

  const [filterType, setFilterType] = useState('all');
  const [customStart, setCustomStart] = useState('');
  const [customEnd, setCustomEnd] = useState('');

  // Filter lists based on chosen date filter parameters
  const filteredInvoices = invoices.filter(inv => isDateWithinFilter(inv.date, filterType, customStart, customEnd));
  const filteredEstimates = estimates.filter(est => isDateWithinFilter(est.date, filterType, customStart, customEnd));

  const recentInvoices = [...filteredInvoices]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 4);

  const recentEstimates = [...filteredEstimates]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 4);

  const invoiceStatuses = filteredInvoices.reduce((acc, inv) => {
    acc[inv.status] = (acc[inv.status] || 0) + 1;
    return acc;
  }, { paid: 0, pending: 0, overdue: 0 });

  const invoiceAmounts = filteredInvoices.reduce((acc, inv) => {
    const total = calculateTotal(inv.items, inv.taxRate, inv.discount);
    acc[inv.status] = (acc[inv.status] || 0) + total;
    return acc;
  }, { paid: 0, pending: 0, overdue: 0 });

  const totalInvoicesValue = Object.values(invoiceAmounts).reduce((a, b) => a + b, 0);

  return (
    <Box sx={{ animation: 'fadeIn 0.4s ease' }}>
      {/* Page Title */}
      <Box sx={{ mb: 4, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', md: 'center' }, gap: 2 }}>
        <Box>
          <Typography variant="h4" sx={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'text.primary', mb: 0.5, letterSpacing: '-0.02em' }}>
            Finance Operations Dashboard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Overview of company metrics, estimates, invoices, and cash flow indices for {settings.name}.
          </Typography>
        </Box>
      </Box>

      {/* Timeframe Filter Panel */}
      <Paper 
        elevation={0} 
        sx={{ 
          p: 2.5, 
          mb: 4, 
          border: '1px solid', 
          borderColor: 'divider', 
          borderRadius: '12px' 
        }}
      >
        <Grid container spacing={2} sx={{ alignItems: 'center' }}>
          <Grid size={{ xs: 12, md: filterType === 'custom' ? 4 : 4 }}>
            <TextField
              select
              size="small"
              label="Select Timeframe Period"
              variant="outlined"
              fullWidth
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
              slotProps={{
                input: {
                  startAdornment: (
                    <Box sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
                      <DateRange color="action" fontSize="small" />
                    </Box>
                  )
                }
              }}
            >
              <MenuItem value="all">All Available Data</MenuItem>
              <MenuItem value="week">Current Week (Mon - Sun)</MenuItem>
              <MenuItem value="month">Current Month (This Month)</MenuItem>
              <MenuItem value="trimester">Current Trimester (Quarter - 3 Months)</MenuItem>
              <MenuItem value="semester">Current Semester (6 Months)</MenuItem>
              <MenuItem value="year">Current Financial Year</MenuItem>
              <MenuItem value="custom">Two Dates (Custom Range Picker)</MenuItem>
            </TextField>
          </Grid>
          
          {filterType === 'custom' && (
            <>
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <TextField
                  type="date"
                  label="From Date"
                  size="small"
                  fullWidth
                  variant="outlined"
                  slotProps={{ inputLabel: { shrink: true } }}
                  value={customStart}
                  onChange={(e) => setCustomStart(e.target.value)}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <TextField
                  type="date"
                  label="To Date"
                  size="small"
                  fullWidth
                  variant="outlined"
                  slotProps={{ inputLabel: { shrink: true } }}
                  value={customEnd}
                  onChange={(e) => setCustomEnd(e.target.value)}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
                />
              </Grid>
            </>
          )}
        </Grid>
      </Paper>

      {/* KPI Stats Grid - uses filtered lists */}
      <KPICards invoices={filteredInvoices} estimates={filteredEstimates} settings={settings} />

      {/* Visual Charts Row - uses filtered data */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, md: 7 }}>
          <RevenueAllocationChart 
            paid={invoiceAmounts.paid}
            pending={invoiceAmounts.pending}
            overdue={invoiceAmounts.overdue}
            total={totalInvoicesValue}
            currency={currency}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 5 }}>
          <TransactionStatusCounters 
            paid={invoiceStatuses.paid}
            pending={invoiceStatuses.pending}
            overdue={invoiceStatuses.overdue}
            total={filteredInvoices.length}
          />
        </Grid>
      </Grid>

      {/* Activity Tables Row - matches filtered list values */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
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
        <Grid size={{ xs: 12, md: 6 }}>
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
