import React from 'react';
import { 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  LinearProgress, 
  Avatar, 
  Tooltip,
  IconButton
} from '@mui/material';
import { 
  AttachMoney, 
  Warning, 
  CheckCircle, 
  HelpOutlined, 
  AssignmentTurnedIn, 
  QueryStats
} from '@mui/icons-material';
import { calculateTotal, formatCurrency } from '../utils.js';

// Modular Subcomponent 1: Individual KPICard to reduce code line volume in parent components
function KPICard({ title, value, subtitle, icon, color, bg, desc }) {
  return (
    <Card 
      elevation={0}
      sx={{ 
        borderRadius: '12px', 
        border: '1px solid',
        borderColor: 'divider',
        borderLeft: `4px solid ${color}`,
        bgcolor: 'background.paper',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
          transform: 'translateY(-2px)'
        }
      }}
    >
      <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
          <Box>
            <Typography 
              variant="caption" 
              color="text.secondary" 
              sx={{ 
                fontFamily: 'var(--font-display)', 
                fontWeight: 600, 
                display: 'flex', 
                alignItems: 'center',
                gap: 0.5,
                textTransform: 'uppercase',
                letterSpacing: '0.03em'
              }}
            >
              {title}
              <Tooltip title={desc} arrow placement="top">
                <IconButton size="small" sx={{ p: 0, opacity: 0.6 }}>
                  <HelpOutlined sx={{ fontSize: 13 }} />
                </IconButton>
              </Tooltip>
            </Typography>
            <Typography 
              variant="h4" 
              sx={{ 
                fontSize: '1.75rem', 
                fontWeight: 700, 
                fontFamily: 'var(--font-mono)', 
                color: 'text.primary',
                mt: 0.5,
                letterSpacing: '-0.02em',
              }}
            >
              {value}
            </Typography>
          </Box>
          <Avatar 
            sx={{ 
              bgcolor: bg, 
              color: color, 
              width: 48, 
              height: 48,
              borderRadius: '10px'
            }}
          >
            {icon}
          </Avatar>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.825rem', fontFamily: 'var(--font-sans)', display: 'flex', alignItems: 'center' }}>
          {subtitle}
        </Typography>
      </CardContent>
    </Card>
  );
}

// Modular Subcomponent 2: PipelineProgressCard to handle progress visualization separately
function PipelineProgressCard({ count, value, currency, rate }) {
  return (
    <Card 
      elevation={0}
      sx={{ 
        borderRadius: '12px', 
        border: '1px solid',
        borderColor: 'divider',
        bgcolor: 'background.paper',
        p: 2.5
      }}
    >
      <Grid container spacing={3} sx={{ alignItems: 'center' }}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ bgcolor: 'rgba(59, 130, 246, 0.1)', color: '#2563eb' }}>
              <QueryStats />
            </Avatar>
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, fontFamily: 'var(--font-display)' }}>
                Proposal Pipeline
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
                {count} pending proposals valued at <strong className="font-mono">{formatCurrency(value, currency)}</strong>
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.8rem', color: 'text.secondary' }}>
              Sales Win Goal Status (Target: 70% accepted)
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 700, fontFamily: 'var(--font-mono)', color: rate >= 70 ? 'success.main' : 'warning.main' }}>
              {rate}% / 70%
            </Typography>
          </Box>
          <LinearProgress 
            variant="determinate" 
            value={Math.min(rate, 100)} 
            sx={{ 
              height: 8, 
              borderRadius: 4, 
              bgcolor: 'action.hover',
              '& .MuiLinearProgress-bar': {
                borderRadius: 4,
                bgcolor: rate >= 70 ? '#10b981' : '#2563eb'
              }
            }} 
          />
        </Grid>
      </Grid>
    </Card>
  );
}

export function KPICards({ invoices, estimates, settings }) {
  const currency = settings.currency;

  const paidInvoices = invoices.filter(i => i.status === 'paid');
  const pendingInvoices = invoices.filter(i => i.status === 'pending');
  const overdueInvoices = invoices.filter(i => i.status === 'overdue');

  const totalRevenue = paidInvoices.reduce((sum, i) => sum + calculateTotal(i.items, i.taxRate, i.discount), 0);
  const totalPending = pendingInvoices.reduce((sum, i) => sum + calculateTotal(i.items, i.taxRate, i.discount), 0);
  const totalOverdue = overdueInvoices.reduce((sum, i) => sum + calculateTotal(i.items, i.taxRate, i.discount), 0);
  const totalOutstanding = totalPending + totalOverdue;

  // Estimates stats
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

  // Card configurations
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

        {/* Custom Estimate Sales Funnel Mini Card */}
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
