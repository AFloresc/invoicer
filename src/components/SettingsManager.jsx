import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Grid, 
  TextField, 
  Button, 
  IconButton, 
  MenuItem, 
  Divider, 
  Paper, 
  Alert 
} from '@mui/material';
import { 
  Save, 
  Photo, 
  DeleteForever, 
  Business, 
  Restore, 
  CheckCircle
} from '@mui/icons-material';

// Modular Subcomponent 1: Logo Upload Selector
function LogoSelector({ logoUrl, onLogoUpload, onClearLogo }) {
  return (
    <Card variant="outlined" sx={{ borderRadius: '12px' }}>
      <CardContent sx={{ p: 3 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5, fontFamily: 'var(--font-display)' }}>
          Global Template Logo
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5, fontSize: '0.8rem' }}>
          Uploaded image will auto-populate as the corporate letterhead logo on all new proposals or invoices.
        </Typography>

        {logoUrl ? (
          <Box sx={{ border: '1px dashed', borderColor: 'divider', borderRadius: '8px', p: 2.5, textAlign: 'center', position: 'relative', bgcolor: '#fff' }}>
            <img 
              src={logoUrl} 
              alt="Default Logo Preview" 
              style={{ maxHeight: '110px', maxWidth: '100%', objectFit: 'contain', margin: '0 auto' }} 
              referrerPolicy="no-referrer"
            />
            <IconButton 
              color="error" 
              onClick={onClearLogo} 
              sx={{ position: 'absolute', top: 5, right: 5, bgcolor: 'rgba(255,255,255,0.8)', '&:hover': { bgcolor: '#ffebee' } }}
              size="small"
              title="Remove Global Logo"
            >
              <DeleteForever sx={{ fontSize: 18 }} />
            </IconButton>
          </Box>
        ) : (
          <Box 
            sx={{ 
              border: '1px dashed', 
              borderColor: 'divider', 
              borderRadius: '8px', 
              p: 3.5, 
              textAlign: 'center', 
              color: 'text.secondary',
              cursor: 'pointer',
              bgcolor: 'action.hover',
              transition: 'all 0.2s',
              '&:hover': {
                borderColor: 'primary.main',
                bgcolor: 'action.selected'
              }
            }}
            component="label"
          >
            <input 
              type="file" 
              accept="image/*" 
              onChange={onLogoUpload} 
              hidden 
            />
            <Photo sx={{ fontSize: 40, mb: 1.5, opacity: 0.5 }} />
            <Typography variant="body2" sx={{ fontWeight: 700, fontSize: '0.75rem' }}>
              Upload Global Brand image
            </Typography>
            <Typography variant="caption" sx={{ fontSize: '0.65rem', display: 'block', mt: 0.5 }}>
              Drag or click. Maximum 1MB.
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}

// Modular Subcomponent 2: System Diagnostics Box
function SystemDiagnosticsCard({ onFactoryReset }) {
  return (
    <Card variant="outlined" sx={{ borderRadius: '12px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
      <CardContent sx={{ p: 3 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'error.main', mb: 1, fontFamily: 'var(--font-display)' }}>
          System Diagnostics Control
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5, fontSize: '0.8rem' }}>
          Reset database matrices in local storage. All custom invoicing logs will be wiped and seed default entries re-applied.
        </Typography>

        <Button 
          variant="outlined" 
          color="error" 
          startIcon={<Restore />} 
          fullWidth
          onClick={onFactoryReset}
          sx={{ textTransform: 'none', borderRadius: '8px', fontWeight: 600 }}
        >
          Reset System Data
        </Button>
      </CardContent>
    </Card>
  );
}

export function SettingsManager({ 
  settings, 
  onSaveSettings,
  onResetData 
}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [currency, setCurrency] = useState('$');
  const [logoUrl, setLogoUrl] = useState('');

  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    setName(settings.name || '');
    setEmail(settings.email || '');
    setAddress(settings.address || '');
    setPhone(settings.phone || '');
    setCurrency(settings.currency || '$');
    setLogoUrl(settings.logoUrl || '');
  }, [settings]);

  const handleLogoUpload = (e) => {
    const files = e.target.files;
    if (files && files[0]) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClearLogo = () => {
    setLogoUrl('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveSettings({
      name,
      email,
      address,
      phone,
      logoUrl: logoUrl || undefined,
      currency
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleFactoryReset = () => {
    if (window.confirm('Are you absolutely sure you want to restore the database? This will revert all bills, proposals, and customers to initial sample templates and clear any custom entries!')) {
      onResetData();
      setSavedSuccess(false);
    }
  };

  return (
    <Box sx={{ animation: 'fadeIn 0.4s ease' }}>
      {/* Header section panel */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'text.primary', mb: 0.5, letterSpacing: '-0.02em' }}>
          Company Settings & Profiles
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Configure default corporate details, currencies, and brand logos printed on output files.
        </Typography>
      </Box>

      {savedSuccess && (
        <Alert severity="success" icon={<CheckCircle />} sx={{ mb: 3, borderRadius: '10px' }}>
          Company settings saved and applied successfully.
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* Core Profile Coordinates Card */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper 
            component="form" 
            onSubmit={handleSubmit}
            elevation={0} 
            sx={{ 
              p: 3, 
              border: '1px solid', 
              borderColor: 'divider', 
              borderRadius: '12px' 
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
              <Business color="primary" />
              <Typography variant="subtitle1" sx={{ fontWeight: 700, fontFamily: 'var(--font-display)' }}>
                Corporate Contact Profile
              </Typography>
            </Box>

            <Grid container spacing={2.5}>
              <Grid size={12}>
                <TextField
                  label="Registered Company Name"
                  required
                  variant="outlined"
                  fullWidth
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  label="Official Email Address"
                  type="email"
                  required
                  variant="outlined"
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  label="Phone Number"
                  variant="outlined"
                  fullWidth
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
                />
              </Grid>

              <Grid size={12}>
                <TextField
                  label="HQ Physical Address"
                  multiline
                  rows={2}
                  variant="outlined"
                  fullWidth
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
                />
              </Grid>

              {/* Currency Customizer Selector */}
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  select
                  label="Default Billing Currency"
                  variant="outlined"
                  fullWidth
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
                >
                  <MenuItem value="$">United States Dollar ($)</MenuItem>
                  <MenuItem value="€">Euro (€)</MenuItem>
                  <MenuItem value="£">British Pound Sterling (£)</MenuItem>
                  <MenuItem value="¥">Japanese Yen / Chinese Yuan (¥)</MenuItem>
                  <MenuItem value="₹">Indian Rupee (₹)</MenuItem>
                  <MenuItem value="A$">Australian Dollar (A$)</MenuItem>
                  <MenuItem value="C$">Canadian Dollar (C$)</MenuItem>
                </TextField>
              </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />

            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button 
                type="submit" 
                variant="contained" 
                startIcon={<Save />}
                sx={{ textTransform: 'none', borderRadius: '8px', px: 4, py: 1 }}
              >
                Save Settings
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* Global Logo Customizer Card \& System Diagnostics (Reset Data) */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Grid container spacing={3}>
            {/* Logo box */}
            <Grid size={12}>
              <LogoSelector 
                logoUrl={logoUrl}
                onLogoUpload={handleLogoUpload}
                onClearLogo={handleClearLogo}
              />
            </Grid>

            {/* System reset diagnostics */}
            <Grid size={12}>
              <SystemDiagnosticsCard 
                onFactoryReset={handleFactoryReset}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
