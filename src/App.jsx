import React, { useState, useEffect } from 'react';
import { 
  ThemeProvider, 
  createTheme, 
  CssBaseline, 
  Box, 
  Drawer, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  AppBar, 
  Toolbar, 
  IconButton, 
  Typography, 
  Slide,
  Avatar,
  Dialog
} from '@mui/material';
import { 
  DashboardOutlined, 
  ReceiptOutlined, 
  RequestQuoteOutlined, 
  SettingsOutlined, 
  PeopleAltOutlined,
  Menu as MenuIcon, 
  Brightness4, 
  Brightness7,
  AccountCircle,
  ReceiptLongOutlined
} from '@mui/icons-material';

import { 
  loadSettings, 
  loadEstimates, 
  loadInvoices, 
  loadCustomers,
  saveSettings, 
  saveEstimates, 
  saveInvoices, 
  saveCustomers,
  generateNextId 
} from './utils.js';

import { Dashboard } from './components/Dashboard.jsx';
import { InvoiceManager } from './components/InvoiceManager.jsx';
import { EstimateManager } from './components/EstimateManager.jsx';
import { CustomersManager } from './components/CustomersManager.jsx';
import { SettingsManager } from './components/SettingsManager.jsx';
import { DocumentForm } from './components/DocumentForm.jsx';
import { DocPreview } from './components/DocPreview.jsx';

const drawerWidth = 260;

// Immersive fullscreen transitions for PDF viewing
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// Modular Subcomponent 1: Sidebar Navigation Column
function SidebarMenu({ activeTab, onTabSelect, settings }) {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: <DashboardOutlined fontSize="small" /> },
    { id: 'invoices', label: 'Invoices Log', icon: <ReceiptOutlined fontSize="small" /> },
    { id: 'estimates', label: 'Proposals Book', icon: <RequestQuoteOutlined fontSize="small" /> },
    { id: 'customers', label: 'Customers directory', icon: <PeopleAltOutlined fontSize="small" /> },
    { id: 'settings', label: 'Configurations', icon: <SettingsOutlined fontSize="small" /> },
  ];

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: '#0f172a', color: '#cbd5e1' }}>
      {/* Brand Header */}
      <Box sx={{ p: 2.5, display: 'flex', alignItems: 'center', gap: 1.5, borderBottom: '1px solid', borderColor: '#1e293b' }}>
        <Avatar 
          sx={{ 
            bgcolor: 'primary.main', 
            width: 36, 
            height: 36, 
            fontWeight: 800,
            fontSize: '1.1rem',
            fontFamily: 'var(--font-display)',
            borderRadius: '8px'
          }}
        >
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

      {/* Main navigation list */}
      <List sx={{ px: 1.5, py: 2, display: 'flex', flexDirection: 'column', gap: 0.5, flexGrow: 1 }}>
        {tabs.map((tab) => (
          <ListItem key={tab.id} disablePadding>
            <ListItemButton 
              selected={activeTab === tab.id}
              onClick={() => onTabSelect(tab.id)}
              sx={{ 
                borderRadius: '8px', 
                py: 1,
                color: activeTab === tab.id ? '#ffffff' : '#94a3b8',
                bgcolor: activeTab === tab.id ? '#1e293b !important' : 'transparent',
                '&:hover': {
                  bgcolor: '#1e293b',
                  color: '#ffffff'
                }
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

      {/* Footer Profile Box in Sidebar */}
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

// Modular Subcomponent 2: Top Application Header Appbar
function AppToolbar({ onMenuToggle, darkMode, onThemeToggle }) {
  return (
    <AppBar 
      position="fixed" 
      elevation={0}
      sx={{ 
        width: { md: `calc(100% - ${drawerWidth}px)` },
        ml: { md: `${drawerWidth}px` },
        bgcolor: 'background.paper',
        borderBottom: '1px solid',
        borderColor: 'divider',
        zIndex: 1100
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', px: 2 }}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={onMenuToggle}
          sx={{ mr: 2, display: { md: 'none' }, color: 'text.primary' }}
        >
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" color="text.primary" sx={{ display: 'flex', alignItems: 'center', gap: 1, fontFamily: 'var(--font-display)', fontWeight: 700 }}>
          <ReceiptLongOutlined color="primary" /> Invoice & Estimate Flow Control
        </Typography>

        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton onClick={onThemeToggle} color="inherit" sx={{ color: 'text.primary' }}>
            {darkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [activeForm, setActiveForm] = useState(null);
  const [activePreview, setActivePreview] = useState(null);

  const [mobileOpen, setMobileOpen] = useState(false);

  const [settings, setSettings] = useState({ name: '', email: '', address: '', phone: '', currency: '$' });
  const [invoices, setInvoices] = useState([]);
  const [estimates, setEstimates] = useState([]);
  const [customers, setCustomers] = useState([]);

  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('inv_dark_mode');
    return saved === 'true';
  });

  useEffect(() => {
    setSettings(loadSettings());
    setInvoices(loadInvoices());
    setEstimates(loadEstimates());
    setCustomers(loadCustomers());
  }, []);

  const handleToggleTheme = () => {
    setDarkMode(prev => {
      const newVal = !prev;
      localStorage.setItem('inv_dark_mode', String(newVal));
      return newVal;
    });
  };

  const theme = React.useMemo(() => 
    createTheme({
      palette: {
        mode: darkMode ? 'dark' : 'light',
        primary: {
          main: '#2563eb', 
          contrastText: '#ffffff',
        },
        secondary: {
          main: '#10b981', 
        },
        background: {
          default: darkMode ? '#0f172a' : '#f8fafc', 
          paper: darkMode ? '#1e293b' : '#ffffff', 
        },
        divider: darkMode ? '#334155' : '#e2e8f0', 
        text: {
          primary: darkMode ? '#f8fafc' : '#0f172a',
          secondary: darkMode ? '#94a3b8' : '#475569',
        }
      },
      typography: {
        fontFamily: 'var(--font-sans)',
        h4: {
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          letterSpacing: '-0.02em',
        },
        h5: {
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          letterSpacing: '-0.01em',
        },
        h6: {
          fontFamily: 'var(--font-display)',
          fontWeight: 600,
          letterSpacing: '-0.01em',
        },
        subtitle1: {
          fontFamily: 'var(--font-display)',
          fontWeight: 600,
        },
        subtitle2: {
          fontFamily: 'var(--font-display)',
          fontWeight: 600,
        }
      },
      shape: {
        borderRadius: 12, 
      },
      components: {
        MuiButton: {
          styleOverrides: {
            root: {
              textTransform: 'none',
              fontWeight: 600,
              borderRadius: '8px',
              padding: '6px 16px',
            }
          }
        },
        MuiCard: {
          styleOverrides: {
            root: {
              borderRadius: '12px',
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
            }
          }
        },
        MuiPaper: {
          styleOverrides: {
            root: {
              borderRadius: '12px',
            }
          }
        },
        MuiTextField: {
          styleOverrides: {
            root: {
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
              }
            }
          }
        }
      }
    }), [darkMode]
  );

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleTabSelect = (tabId) => {
    setActiveTab(tabId);
    setActiveForm(null);
    setMobileOpen(false);
  };

  const handleSaveSettings = (newSettings) => {
    setSettings(newSettings);
    saveSettings(newSettings);
  };

  const handleSaveDocument = (docPayload) => {
    if (!activeForm) return;

    if (activeForm.type === 'estimate') {
      let updatedList;
      if (activeForm.mode === 'edit') {
        updatedList = estimates.map(e => e.id === docPayload.id ? docPayload : e);
      } else {
        updatedList = [...estimates, docPayload];
      }
      setEstimates(updatedList);
      saveEstimates(updatedList);
    } else {
      let updatedList;
      if (activeForm.mode === 'edit') {
        updatedList = invoices.map(i => i.id === docPayload.id ? docPayload : i);
      } else {
        updatedList = [...invoices, docPayload];
      }
      setInvoices(updatedList);
      saveInvoices(updatedList);
    }

    setActiveForm(null);
  };

  const handleDeleteEstimate = (id) => {
    const updated = estimates.filter(e => e.id !== id);
    setEstimates(updated);
    saveEstimates(updated);
  };

  const handleDeleteInvoice = (id) => {
    const updated = invoices.filter(i => i.id !== id);
    setInvoices(updated);
    saveInvoices(updated);
  };

  const handleUpdateEstimateStatus = (id, status) => {
    const updated = estimates.map(e => e.id === id ? { ...e, status } : e);
    setEstimates(updated);
    saveEstimates(updated);
  };

  const handleUpdateInvoiceStatus = (id, status) => {
    const updated = invoices.map(i => i.id === id ? { ...i, status } : i);
    setInvoices(updated);
    saveInvoices(updated);
  };

  const handleConvertEstimateToInvoice = (estimate) => {
    const nextInvoiceId = generateNextId('INV', invoices);
    const today = new Date().toISOString().split('T')[0];
    const d = new Date();
    d.setDate(d.getDate() + 30);
    const net30DueDate = d.toISOString().split('T')[0];

    const convertedInvoice = {
      id: nextInvoiceId,
      clientName: estimate.clientName,
      clientEmail: estimate.clientEmail,
      clientAddress: estimate.clientAddress,
      date: today,
      dueDate: net30DueDate,
      items: estimate.items.map(item => ({ ...item })),
      notes: `Converted from Estimate ${estimate.id}. Thank you for your business!`,
      status: 'pending',
      logoUrl: estimate.logoUrl,
      taxRate: estimate.taxRate,
      discount: estimate.discount,
      terms: estimate.terms || 'Payment due within 30 days.',
      estimateId: estimate.id
    };

    const updatedEstimates = estimates.map(e => e.id === estimate.id ? { ...e, status: 'accepted' } : e);
    setEstimates(updatedEstimates);
    saveEstimates(updatedEstimates);

    const updatedInvoices = [...invoices, convertedInvoice];
    setInvoices(updatedInvoices);
    saveInvoices(updatedInvoices);

    setActiveTab('invoices');
    setActivePreview({ type: 'invoice', doc: convertedInvoice });
  };

  const handleFactoryResetData = () => {
    localStorage.removeItem('inv_mgmt_settings');
    localStorage.removeItem('inv_mgmt_estimates');
    localStorage.removeItem('inv_mgmt_invoices');
    localStorage.removeItem('inv_mgmt_customers');
    window.location.reload();
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      
      {/* Root Layout - Only visible if not printing */}
      <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }} className="no-print">
        <AppToolbar 
          onMenuToggle={handleDrawerToggle}
          darkMode={darkMode}
          onThemeToggle={handleToggleTheme}
        />

        <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}>
          {/* Mobile drawer */}
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
            sx={{
              display: { xs: 'block', md: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, borderRight: '1px solid', borderColor: 'divider' },
            }}
          >
            <SidebarMenu 
              activeTab={activeTab}
              onTabSelect={handleTabSelect}
              settings={settings}
            />
          </Drawer>

          {/* Desktop permanent drawer */}
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', md: 'block' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, borderRight: '1px solid', borderColor: 'divider' },
            }}
            open
          >
            <SidebarMenu 
              activeTab={activeTab}
              onTabSelect={handleTabSelect}
              settings={settings}
            />
          </Drawer>
        </Box>

        {/* Main Work Space */}
        <Box
          component="main"
          sx={{ 
            flexGrow: 1, 
            p: { xs: 2.5, md: 4 }, 
            width: { md: `calc(100% - ${drawerWidth}px)` },
            mt: '64px'
          }}
        >
          {activeForm ? (
            <Box sx={{ animation: 'fadeIn 0.2s ease-out' }}>
              <Box sx={{ mb: 3 }}>
                <Typography variant="h4" sx={{ fontWeight: 700, fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>
                  {activeForm.mode === 'edit' ? 'Edit ' : 'Create New '}
                  {activeForm.type === 'estimate' ? 'Estimate Proposal' : 'Invoice Billing'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Complete billing fields and row items below.
                </Typography>
              </Box>
              <DocumentForm 
                type={activeForm.type}
                settings={settings}
                customers={customers}
                initialData={activeForm.data}
                onSave={handleSaveDocument}
                onCancel={() => setActiveForm(null)}
              />
            </Box>
          ) : (
            <>
              {activeTab === 'dashboard' && (
                <Dashboard 
                  invoices={invoices}
                  estimates={estimates}
                  settings={settings}
                  onNavigate={handleTabSelect}
                  onViewInvoice={(inv) => setActivePreview({ type: 'invoice', doc: inv })}
                  onViewEstimate={(est) => setActivePreview({ type: 'estimate', doc: est })}
                />
              )}

              {activeTab === 'invoices' && (
                <InvoiceManager 
                  invoices={invoices}
                  settings={settings}
                  onAddInvoice={() => setActiveForm({ type: 'invoice', mode: 'add' })}
                  onEditInvoice={(inv) => setActiveForm({ type: 'invoice', mode: 'edit', data: inv })}
                  onDeleteInvoice={handleDeleteInvoice}
                  onUpdateStatus={handleUpdateInvoiceStatus}
                  onViewInvoice={(inv) => setActivePreview({ type: 'invoice', doc: inv })}
                />
              )}

              {activeTab === 'estimates' && (
                <EstimateManager 
                  estimates={estimates}
                  settings={settings}
                  onAddEstimate={() => setActiveForm({ type: 'estimate', mode: 'add' })}
                  onEditEstimate={(est) => setActiveForm({ type: 'estimate', mode: 'edit', data: est })}
                  onDeleteEstimate={handleDeleteEstimate}
                  onUpdateStatus={handleUpdateEstimateStatus}
                  onConvertToInvoice={handleConvertEstimateToInvoice}
                  onViewEstimate={(est) => setActivePreview({ type: 'estimate', doc: est })}
                />
              )}

              {activeTab === 'customers' && (
                <CustomersManager 
                  customers={customers}
                  onSaveCustomers={(updatedList) => {
                    setCustomers(updatedList);
                    saveCustomers(updatedList);
                  }}
                />
              )}

              {activeTab === 'settings' && (
                <SettingsManager 
                  settings={settings}
                  onSaveSettings={handleSaveSettings}
                  onResetData={handleFactoryResetData}
                />
              )}
            </>
          )}
        </Box>
      </Box>

      {/* Screen Case 3: Print Preview full Dialog overlay */}
      <Dialog
        fullScreen
        open={activePreview !== null}
        onClose={() => setActivePreview(null)}
        sx={{
          zIndex: 1300,
          '& .MuiDialog-paper': {
            bgcolor: darkMode ? '#121212' : '#f1f5f9',
          }
        }}
      >
        <Box sx={{ height: '100%', overflowY: 'auto' }}>
          {activePreview && (
            <DocPreview 
              type={activePreview.type}
              document={activePreview.doc}
              settings={settings}
              onClose={() => setActivePreview(null)}
            />
          )}
        </Box>
      </Dialog>
    </ThemeProvider>
  );
}
