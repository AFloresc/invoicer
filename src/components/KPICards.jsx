import React from 'react';
import { Grid, Box } from '@mui/material';
import { 
  AttachMoney, 
  Warning, 
  CheckCircle, 
  AssignmentTurnedIn 
} from '@mui/icons-material';
import { calculateTotal, formatCurrency } from '../utils.js';
import { KPICard } from './KPICard.jsx';
import { PipelineProgressCard } from './PipelineProgressCard.jsx';

export function KPICards({ invoices, estimates, settings }) {
  const currency = settings.currency;

  const paidInvoices = invoices.filter(i => i.status === 'paid');
  const pendingInvoices = invoices.filter(i => i.status === 'pending');
  const overdueInvoices = invoices.filter(i => i.status === 'overdue');

  const totalRevenue = paidInvoices.reduce((sum, i) => sum + calculateTotal(i.items, i.taxRate, i.discount), 0);
  const totalPending = pendingInvoices.reduce((sum, i) => sum + calculateTotal(i.items, i.taxRate, i.discount), 0);
  const totalOverdue = overdueInvoices.reduce((sum, i) => sum + calculateTotal(i.items, i.taxRate, i.discount), 0);
  const totalOutstanding = totalPending + totalOverdue;

  const totalEstimatesCount = estimates.length;
  const acceptedEstimatesCount = estimates.filter(e => e.status === 'accepted').length;
  const rejectedEstimatesCount = estimates.filter(e => e.status === 'rejected').length;
  const pendingEstimatesCount = estimates.filter(e => e.status === 'pending').length;

  const conversionRate = totalEstimatesCount > 0 
    ? Math.round((acceptedEstimatesCount / totalEstimatesCount) * 100) 
    : 0;

  const valueOfPendingEstimates = estimates
    .filter(e => e.status === 'pending')
    .reduce((sum, e) => sum + calculateTotal(e.items, e.taxRate, e.discount), 0);

  const kpiData = [
    {
      title: 'Total Revenue Collected',
      value: formatCurrency(totalRevenue, currency),
      subtitle: `${paidInvoices.length} Paid Invoices`,
      icon: <AttachMoney sx={{ fontSize: 28 }} />,
      color: '#10b981',
      bg: 'rgba(16, 185, 129, 0.08)',
      desc: 'Sum of all invoices marked as Paid'
    },
    {
      title: 'Outstanding Balance',
      value: formatCurrency(totalOutstanding, currency),
      subtitle: `${pendingInvoices.length + overdueInvoices.length} Unpaid Invoices`,
      icon: <CheckCircle sx={{ fontSize: 26 }} />,
      color: '#f59e0b',
      bg: 'rgba(245, 158, 11, 0.08)',
      desc: 'Sum of Pending and Overdue invoices'
    },
    {
      title: 'Overdue Receivables',
      value: formatCurrency(totalOverdue, currency),
      subtitle: `${overdueInvoices.length} Past Due Date`,
      icon: <Warning sx={{ fontSize: 26 }} />,
      color: '#ef4444',
      bg: 'rgba(239, 68, 68, 0.08)',
      desc: 'Unpaid invoices whose due date has passed'
    },
    {
      title: 'Estimate Conversion Rate',
      value: `${conversionRate}%`,
      subtitle: `${acceptedEstimatesCount} Accepted, ${rejectedEstimatesCount} Rejected`,
      icon: <AssignmentTurnedIn sx={{ fontSize: 26 }} />,
      color: '#2563eb',
      bg: 'rgba(37, 99, 235, 0.08)',
      desc: 'Accepted estimates divided by total estimates'
    }
  ];

  return (
    <Box sx={{ mb: 4 }}>
      <Grid container spacing={3}>
        {kpiData.map((kpi, idx) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={idx}>
            <KPICard {...kpi} />
          </Grid>
        ))}

        <Grid size={12}>
          <PipelineProgressCard 
            count={pendingEstimatesCount}
            value={valueOfPendingEstimates}
            currency={currency}
            rate={conversionRate}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
