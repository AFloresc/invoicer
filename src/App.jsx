import React, { useState, useEffect } from 'react';
import { ThemeProvider, CssBaseline, Box, Drawer, Typography, Dialog } from '@mui/material';
import { getTheme } from './theme.js';
import { loadSettings, loadEstimates, loadInvoices, loadCustomers, saveSettings, saveEstimates, saveInvoices, saveCustomers, generateNextId } from './utils.js';

import { SidebarMenu } from './components/SidebarMenu.jsx';
import { AppToolbar } from './components/AppToolbar.jsx';
import { Dashboard } from './components/Dashboard.jsx';
import { InvoiceManager } from './components/InvoiceManager.jsx';
import { EstimateManager } from './components/EstimateManager.jsx';
import { CustomersManager } from './components/CustomersManager.jsx';
import { SettingsManager } from './components/SettingsManager.jsx';
import { DocumentForm } from './components/DocumentForm.jsx';
import { DocPreview } from './components/DocPreview.jsx';

const drawerWidth = 260;

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
    return localStorage.getItem('inv_dark_mode') === 'true';
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

  const theme = React.useMemo(() => getTheme(darkMode), [darkMode]);

  const handleSaveDocument = (docPayload) => {
    if (!activeForm) return;
    if (activeForm.type === 'estimate') {
      const updatedList = activeForm.mode === 'edit'
        ? estimates.map(e => e.id === docPayload.id ? docPayload : e)
        : [...estimates, docPayload];
      setEstimates(updatedList);
      saveEstimates(updatedList);
    } else {
      const updatedList = activeForm.mode === 'edit'
        ? invoices.map(i => i.id === docPayload.id ? docPayload : i)
        : [...invoices, docPayload];
      setInvoices(updatedList);
      saveInvoices(updatedList);
    }
    setActiveForm(null);
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

  const handleEraseAllData = () => {
    localStorage.setItem('inv_mgmt_initialized', 'true');
    const blankSettings = { name: '', email: '', address: '', phone: '', logoUrl: '', currency: '$' };
    
    saveEstimates([]);
    saveInvoices([]);
    saveCustomers([]);
    saveSettings(blankSettings);
    
    setInvoices([]);
    setEstimates([]);
    setCustomers([]);
    setSettings(blankSettings);
  };

  const handleRestoreDemoData = () => {
    localStorage.removeItem('inv_mgmt_initialized');
    localStorage.removeItem('inv_mgmt_settings');
    localStorage.removeItem('inv_mgmt_estimates');
    localStorage.removeItem('inv_mgmt_invoices');
    localStorage.removeItem('inv_mgmt_customers');
    
    const defaultSet = loadSettings();
    const defaultEst = loadEstimates();
    const defaultInv = loadInvoices();
    const defaultCust = loadCustomers();
    
    setSettings(defaultSet);
    setEstimates(defaultEst);
    setInvoices(defaultInv);
    setCustomers(defaultCust);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      
      <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }} className="no-print">
        <AppToolbar onMenuToggle={() => setMobileOpen(!mobileOpen)} darkMode={darkMode} onThemeToggle={handleToggleTheme} />

        <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}>
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={() => setMobileOpen(false)}
            ModalProps={{ keepMounted: true }}
            sx={{
              display: { xs: 'block', md: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, borderRight: '1px solid', borderColor: 'divider' },
            }}
          >
            <SidebarMenu activeTab={activeTab} onTabSelect={(id) => { setActiveTab(id); setActiveForm(null); setMobileOpen(false); }} settings={settings} />
          </Drawer>

          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', md: 'block' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, borderRight: '1px solid', borderColor: 'divider' },
            }}
            open
          >
            <SidebarMenu activeTab={activeTab} onTabSelect={(id) => { setActiveTab(id); setActiveForm(null); setMobileOpen(false); }} settings={settings} />
          </Drawer>
        </Box>

        <Box component="main" sx={{ flexGrow: 1, p: { xs: 2.5, md: 4 }, width: { md: `calc(100% - ${drawerWidth}px)` }, mt: '64px' }}>
          {activeForm ? (
            <Box sx={{ animation: 'fadeIn 0.2s ease-out' }}>
              <Box sx={{ mb: 3 }}>
                <Typography variant="h4" sx={{ fontWeight: 700, fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>
                  {activeForm.mode === 'edit' ? 'Edit ' : 'Create New '}
                  {activeForm.type === 'estimate' ? 'Estimate Proposal' : 'Invoice Billing'}
                </Typography>
                <Typography variant="body2" color="text.secondary">Complete billing fields and row items below.</Typography>
              </Box>
              <DocumentForm type={activeForm.type} settings={settings} customers={customers} initialData={activeForm.data} onSave={handleSaveDocument} onCancel={() => setActiveForm(null)} />
            </Box>
          ) : (
            <>
              {activeTab === 'dashboard' && <Dashboard invoices={invoices} estimates={estimates} settings={settings} onNavigate={(id) => { setActiveTab(id); setActiveForm(null); }} onViewInvoice={(inv) => setActivePreview({ type: 'invoice', doc: inv })} onViewEstimate={(est) => setActivePreview({ type: 'estimate', doc: est })} />}
              {activeTab === 'invoices' && <InvoiceManager invoices={invoices} settings={settings} onAddInvoice={() => setActiveForm({ type: 'invoice', mode: 'add' })} onEditInvoice={(inv) => setActiveForm({ type: 'invoice', mode: 'edit', data: inv })} onDeleteInvoice={(id) => { const updated = invoices.filter(i => i.id !== id); setInvoices(updated); saveInvoices(updated); }} onUpdateStatus={(id, status) => { const updated = invoices.map(i => i.id === id ? { ...i, status } : i); setInvoices(updated); saveInvoices(updated); }} onViewInvoice={(inv) => setActivePreview({ type: 'invoice', doc: inv })} />}
              {activeTab === 'estimates' && <EstimateManager estimates={estimates} settings={settings} onAddEstimate={() => setActiveForm({ type: 'estimate', mode: 'add' })} onEditEstimate={(est) => setActiveForm({ type: 'estimate', mode: 'edit', data: est })} onDeleteEstimate={(id) => { const updated = estimates.filter(e => e.id !== id); setEstimates(updated); saveEstimates(updated); }} onUpdateStatus={(id, status) => { const updated = estimates.map(e => e.id === id ? { ...e, status } : e); setEstimates(updated); saveEstimates(updated); }} onConvertToInvoice={handleConvertEstimateToInvoice} onViewEstimate={(est) => setActivePreview({ type: 'estimate', doc: est })} />}
              {activeTab === 'customers' && (
                <CustomersManager 
                  customers={customers} 
                  invoices={invoices}
                  settings={settings}
                  onSaveCustomers={(updatedList) => { 
                    setCustomers(updatedList); 
                    saveCustomers(updatedList); 
                  }} 
                  onViewInvoice={(inv) => setActivePreview({ type: 'invoice', doc: inv })}
                />
              )}
              {activeTab === 'settings' && (
                <SettingsManager 
                  settings={settings} 
                  onSaveSettings={(newSettings) => { setSettings(newSettings); saveSettings(newSettings); }} 
                  onEraseAllData={handleEraseAllData} 
                  onRestoreDemoData={handleRestoreDemoData} 
                />
              )}
            </>
          )}
        </Box>
      </Box>

      <Dialog fullScreen open={activePreview !== null} onClose={() => setActivePreview(null)} sx={{ zIndex: 1300, '& .MuiDialog-paper': { bgcolor: darkMode ? '#121212' : '#f1f5f9' } }}>
        <Box sx={{ height: '100%', overflowY: 'auto' }}>
          {activePreview && <DocPreview type={activePreview.type} document={activePreview.doc} settings={settings} onClose={() => setActivePreview(null)} />}
        </Box>
      </Dialog>
    </ThemeProvider>
  );
}
