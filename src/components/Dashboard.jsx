import React from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Chip,
  Button
} from '@mui/material';
import { 
  ArrowForward, 
  Receipt, 
  RequestQuote, 
  Paid, 
  Pending, 
  ErrorOutlined 
} from '@mui/icons-material';
import { KPICards } from './KPICards.jsx';
import { calculateTotal, formatCurrency } from '../utils.js';

// Modular Subcomponent 1: Revenue Allocation SVG Ring Chart
function RevenueAllocationChart({ paid, pending, overdue, total, currency }) {
  return (
    <Paper 
      elevation={0}
      sx={{ 
        p: 3, 
        borderRadius: '12px', 
        border: '1px solid',
        borderColor: 'divider',
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 3, fontFamily: 'var(--font-display)', textTransform: 'uppercase', letterSpacing: '0.03em', color: 'text.secondary' }}>
        Revenue Allocation Analysis
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center', justifyContent: 'space-around', gap: 3, flexGrow: 1 }}>
        <Box sx={{ position: 'relative', width: 180, height: 180, display: 'flex', alignItems: 'center', justifyItems: 'center' }}>
          <svg width="180" height="180" viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)' }}>
            <circle cx="50" cy="50" r="40" fill="transparent" stroke="var(--mui-palette-action-hover, #f3f4f6)" strokeWidth="12" />
            
            {total > 0 && (
              <circle 
                cx="50" 
                cy="50" 
                r="40" 
                fill="transparent" 
                stroke="#10b981" 
                strokeWidth="12" 
                strokeDasharray={`${(paid / total) * 251.2} 251.2`}
                strokeDashoffset="0"
              />
            )}

            {total > 0 && (
              <circle 
                cx="50" 
                cy="50" 
                r="40" 
                fill="transparent" 
                stroke="#f59e0b" 
                strokeWidth="12" 
                strokeDasharray={`${(pending / total) * 251.2} 251.2`}
                strokeDashoffset={`-${(paid / total) * 251.2}`}
              />
            )}

            {total > 0 && (
              <circle 
                cx="50" 
                cy="50" 
                r="40" 
                fill="transparent" 
                stroke="#ef4444" 
                strokeWidth="12" 
                strokeDasharray={`${(overdue / total) * 251.2} 251.2`}
                strokeDashoffset={`-${((paid + pending) / total) * 251.2}`}
              />
            )}
          </svg>
          <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, fontSize: '0.65rem' }}>TOTAL INVOICED</Typography>
            <Typography variant="subtitle1" sx={{ fontWeight: 800, fontFamily: 'var(--font-mono)', fontSize: '0.95rem' }}>{formatCurrency(total, currency)}</Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, width: { xs: 'full', sm: '200px' } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderLeft: '4px solid #10b981', pl: 1.5 }}>
            <Box>
              <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>COLLECTED / PAID</Typography>
              <Typography variant="body2" sx={{ fontWeight: 700, fontFamily: 'var(--font-mono)' }}>{formatCurrency(paid, currency)}</Typography>
            </Box>
            <Typography variant="caption" sx={{ fontWeight: 700, color: '#10b981' }}>
              {total ? Math.round((paid / total) * 100) : 0}%
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderLeft: '4px solid #f59e0b', pl: 1.5 }}>
            <Box>
              <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>PENDING / OUTSTANDING</Typography>
              <Typography variant="body2" sx={{ fontWeight: 700, fontFamily: 'var(--font-mono)' }}>{formatCurrency(pending, currency)}</Typography>
            </Box>
            <Typography variant="caption" sx={{ fontWeight: 700, color: '#f59e0b' }}>
              {total ? Math.round((pending / total) * 100) : 0}%
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderLeft: '4px solid #ef4444', pl: 1.5 }}>
            <Box>
              <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>OVERDUE REVENUE</Typography>
              <Typography variant="body2" sx={{ fontWeight: 700, fontFamily: 'var(--font-mono)' }}>{formatCurrency(overdue, currency)}</Typography>
            </Box>
            <Typography variant="caption" sx={{ fontWeight: 700, color: '#ef4444' }}>
              {total ? Math.round((overdue / total) * 100) : 0}%
            </Typography>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
}

// Modular Subcomponent 2: Transaction Allocation Stats progress bars
function TransactionStatusCounters({ paid, pending, overdue, total }) {
  const getPercent = (count) => (total ? (count / total) * 100 : 0);

  return (
    <Paper 
      elevation={0}
      sx={{ 
        p: 3, 
        borderRadius: '12px', 
        border: '1px solid',
        borderColor: 'divider',
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2, fontFamily: 'var(--font-display)', textTransform: 'uppercase', letterSpacing: '0.03em', color: 'text.secondary' }}>
        Transaction Allocation Stats
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, flexGrow: 1, justifyContent: 'center' }}>
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
            <Typography variant="body2" sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Paid color="success" sx={{ fontSize: 18 }} /> Paid Invoices Count
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 700, fontFamily: 'var(--font-mono)' }}>{paid}</Typography>
          </Box>
          <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-3">
            <div 
              className="bg-emerald-500 h-3 rounded-full transition-all duration-300" 
              style={{ width: `${getPercent(paid)}%` }}
            />
          </div>
        </Box>

        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
            <Typography variant="body2" sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Pending color="warning" sx={{ fontSize: 18 }} /> Pending Invoices Count
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 700, fontFamily: 'var(--font-mono)' }}>{pending}</Typography>
          </Box>
          <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-3">
            <div 
              className="bg-amber-500 h-3 rounded-full transition-all duration-300" 
              style={{ width: `${getPercent(pending)}%` }}
            />
          </div>
        </Box>

        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
            <Typography variant="body2" sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <ErrorOutlined color="error" sx={{ fontSize: 18 }} /> Overdue Invoices Count
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 700, fontFamily: 'var(--font-mono)' }}>{overdue}</Typography>
          </Box>
          <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-3">
            <div 
              className="bg-red-500 h-3 rounded-full transition-all duration-300" 
              style={{ width: `${getPercent(overdue)}%` }}
            />
          </div>
        </Box>
      </Box>
    </Paper>
  );
}

// Modular Subcomponent 3: Transaction Ledger Table
function RecentTransactionsTable({ title, icon, buttonLabel, items, currency, onNavigate, onClickRow, isInvoice }) {
  const getBadgeColor = (status) => {
    if (status === 'paid' || status === 'accepted') return 'success';
    if (status === 'pending') return 'warning';
    if (status === 'overdue' || status === 'rejected') return 'error';
    return 'default';
  };

  return (
    <Paper 
      elevation={0}
      sx={{ 
        p: 3, 
        borderRadius: '12px', 
        border: '1px solid',
        borderColor: 'divider'
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {icon}
          <Typography variant="subtitle1" sx={{ fontWeight: 700, fontFamily: 'var(--font-display)' }}>
            {title}
          </Typography>
        </Box>
        <Button 
          endIcon={<ArrowForward />} 
          size="small"
          onClick={onNavigate}
          sx={{ textTransform: 'none', fontWeight: 600 }}
        >
          {buttonLabel}
        </Button>
      </Box>

      <TableContainer>
        <Table sx={{ '& .MuiTableCell-root': { py: 1.2, px: 0.5 } }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>Reference</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Client</TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>Total Value</TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  <Typography variant="body2" color="text.secondary" sx={{ py: 2 }}>
                    No operations recorded yet.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              items.map((item) => (
                <TableRow 
                  key={item.id} 
                  hover
                  onClick={() => onClickRow(item)}
                  sx={{ cursor: 'pointer' }}
                >
                  <TableCell sx={{ fontFamily: 'var(--font-mono)', fontWeight: 600, fontSize: '0.8rem' }}>
                    {item.id}
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, fontSize: '0.85rem' }}>{item.clientName}</TableCell>
                  <TableCell align="right" sx={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
                    {formatCurrency(calculateTotal(item.items, item.taxRate, item.discount), currency)}
                  </TableCell>
                  <TableCell align="right">
                    <Chip 
                      label={item.status.toUpperCase()} 
                      color={getBadgeColor(item.status)} 
                      size="small" 
                      sx={{ fontWeight: 700, fontSize: '0.65rem' }}
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
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
            total={invoices.length}
          />
        </Grid>
      </Grid>

      {/* Activity Tables Row */}
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
