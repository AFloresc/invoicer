import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Alert } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import { LogoSelector } from './LogoSelector.jsx';
import { SystemDiagnosticsCard } from './SystemDiagnosticsCard.jsx';
import { CorporateContactProfile } from './CorporateContactProfile.jsx';

export function SettingsManager({ settings, onSaveSettings, onEraseAllData, onRestoreDemoData }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [currency, setCurrency] = useState('$');
  const [currencyPosition, setCurrencyPosition] = useState('before');
  const [taxLabel, setTaxLabel] = useState('Tax');
  const [language, setLanguage] = useState('en');
  const [logoUrl, setLogoUrl] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [erasedSuccess, setErasedSuccess] = useState(false);
  const [restoredSuccess, setRestoredSuccess] = useState(false);

  useEffect(() => {
    setName(settings.name || '');
    setEmail(settings.email || '');
    setAddress(settings.address || '');
    setPhone(settings.phone || '');
    setCurrency(settings.currency || '$');
    setCurrencyPosition(settings.currencyPosition || 'before');
    setTaxLabel(settings.taxLabel || 'Tax');
    setLanguage(settings.language || 'en');
    setLogoUrl(settings.logoUrl || '');
  }, [settings]);

  const handleLogoUpload = (e) => {
    const files = e.target.files;
    if (files && files[0]) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => setLogoUrl(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveSettings({ 
      name, 
      email, 
      address, 
      phone, 
      logoUrl: logoUrl || undefined, 
      currency,
      currencyPosition,
      taxLabel,
      language,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const triggerErase = () => {
    onEraseAllData();
    setErasedSuccess(true);
    setTimeout(() => setErasedSuccess(false), 4000);
  };

  const triggerRestore = () => {
    onRestoreDemoData();
    setRestoredSuccess(true);
    setTimeout(() => setRestoredSuccess(false), 4000);
  };

  return (
    <Box sx={{ animation: 'fadeIn 0.4s ease' }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontFamily: 'var(--font-display)', fontWeight: 700, mb: 0.5 }}>
          Company Settings & Profiles
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Configure default details, currencies, and logos on deliverables.
        </Typography>
      </Box>

      {savedSuccess && (
        <Alert severity="success" icon={<CheckCircle />} sx={{ mb: 3, borderRadius: '10px' }}>
          Company settings saved and applied successfully.
        </Alert>
      )}

      {erasedSuccess && (
        <Alert severity="error" sx={{ mb: 3, borderRadius: '10px', fontWeight: 600 }}>
          All memory states and local storage databases (Invoices, Estimates, Customers, Settings) have been successfully erased.
        </Alert>
      )}

      {restoredSuccess && (
        <Alert severity="info" sx={{ mb: 3, borderRadius: '10px', fontWeight: 600 }}>
          Demo data template (Invoices, Estimates, Customers, Settings) has been successfully reloaded and restored.
        </Alert>
      )}

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          <CorporateContactProfile 
            name={name} setName={setName}
            email={email} setEmail={setEmail}
            address={address} setAddress={setAddress}
            phone={phone} setPhone={setPhone}
            currency={currency} setCurrency={setCurrency}
            currencyPosition={currencyPosition} setCurrencyPosition={setCurrencyPosition}
            taxLabel={taxLabel} setTaxLabel={setTaxLabel}
            language={language} setLanguage={setLanguage}
            onSubmit={handleSubmit}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Grid container spacing={3}>
            <Grid size={12}>
              <LogoSelector 
                logoUrl={logoUrl}
                onLogoUpload={handleLogoUpload}
                onClearLogo={() => setLogoUrl('')}
              />
            </Grid>
            <Grid size={12}>
              <SystemDiagnosticsCard 
                onEraseAllData={() => {
                  if (window.confirm('Are you sure you want to erase all invoices, estimates, and customer profiles? This actions will wipe all entries to start with a blank database.')) {
                    triggerErase();
                  }
                }}
                onRestoreDemoData={() => {
                  if (window.confirm('Are you sure you want to restore the default demo template data? This will reload high-quality sample invoices, estimates, and customer records.')) {
                    triggerRestore();
                  }
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
