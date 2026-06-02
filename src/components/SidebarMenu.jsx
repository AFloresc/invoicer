import React from 'react';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Avatar, Typography } from '@mui/material';
import { DashboardOutlined, ReceiptOutlined, RequestQuoteOutlined, SettingsOutlined, PeopleAltOutlined, AccountCircle } from '@mui/icons-material';

export function SidebarMenu({ activeTab, onTabSelect, settings }) {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: <DashboardOutlined fontSize="small" /> },
    { id: 'invoices', label: 'Invoices Log', icon: <ReceiptOutlined fontSize="small" /> },
    { id: 'estimates', label: 'Proposals Book', icon: <RequestQuoteOutlined fontSize="small" /> },
    { id: 'customers', label: 'Customers directory', icon: <PeopleAltOutlined fontSize="small" /> },
    { id: 'settings', label: 'Configurations', icon: <SettingsOutlined fontSize="small" /> },
  ];

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: '#0f172a', color: '#cbd5e1' }}>
      <Box sx={{ p: 2.5, display: 'flex', alignItems: 'center', gap: 1.5, borderBottom: '1px solid', borderColor: '#1e293b' }}>
        <Avatar sx={{ bgcolor: 'primary.main', width: 36, height: 36, fontWeight: 800, fontSize: '1.1rem', fontFamily: 'var(--font-display)', borderRadius: '8px' }}>
          {settings.name ? settings.name.charAt(0).toUpperCase() : 'F'}
        </Avatar>
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 800, lineHeight: 1.2, fontFamily: 'var(--font-display)', color: '#ffffff', letterSpacing: '-0.4px', fontSize: '0.95rem' }}>
            {settings.name || 'Accounts Portal'}
          </Typography>
          <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 600, fontSize: '0.7rem' }}>
            Billing & Estimates Hub
          </Typography>
        </Box>
      </Box>

      <List sx={{ px: 1.5, py: 2, display: 'flex', flexDirection: 'column', gap: 0.5, flexGrow: 1 }}>
        {tabs.map((tab) => (
          <ListItem key={tab.id} disablePadding>
            <ListItemButton 
              selected={activeTab === tab.id}
              onClick={() => onTabSelect(tab.id)}
              sx={{ 
                borderRadius: '8px', py: 1,
                color: activeTab === tab.id ? '#ffffff' : '#94a3b8',
                bgcolor: activeTab === tab.id ? '#1e293b !important' : 'transparent',
                '&:hover': { bgcolor: '#1e293b', color: '#ffffff' }
              }}
            >
              <ListItemIcon sx={{ color: activeTab === tab.id ? '#3b82f6' : '#94a3b8', minWidth: 32 }}>
                {tab.icon}
              </ListItemIcon>
              <ListItemText 
                primary={
                  <Typography sx={{ fontSize: '0.85rem', fontWeight: activeTab === tab.id ? 700 : 500, fontFamily: 'var(--font-sans)' }}>
                    {tab.label}
                  </Typography>
                } 
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Box sx={{ p: 2.5, display: 'flex', alignItems: 'center', gap: 1.5, borderTop: '1px solid', borderColor: '#1e293b' }}>
        <AccountCircle sx={{ fontSize: 32, color: '#475569' }} />
        <Box sx={{ overflow: 'hidden' }}>
          <Typography variant="caption" sx={{ display: 'block', fontWeight: 700, color: '#475569', letterSpacing: '0.05em', textTransform: 'uppercase', fontSize: '0.625rem' }}>OPERATOR</Typography>
          <Typography variant="body2" sx={{ fontWeight: 600, color: '#e2e8f0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: '0.8rem' }}>
            {settings.email || 'operator@corporate.com'}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
