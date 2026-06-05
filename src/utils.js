import { defaultCompanySettings, sampleEstimates, sampleInvoices, sampleCustomers } from './mockData.js';

// Business Math Helpers
export function calculateSubtotal(items) {
  if (!items || !Array.isArray(items)) return 0;
  return items.reduce((sum, item) => sum + ((parseFloat(item.quantity) || 0) * (parseFloat(item.unitPrice) || 0)), 0);
}

export function calculateTotal(items, taxRate, discount) {
  const subtotal = calculateSubtotal(items);
  const discounted = subtotal * (1 - (parseFloat(discount) || 0) / 100);
  const total = discounted * (1 + (parseFloat(taxRate) || 0) / 100);
  return Number(total.toFixed(2));
}

export function formatCurrency(amount, symbol = '$', position = null) {
  let pos = position;
  if (!pos) {
    try {
      const stored = localStorage.getItem('inv_mgmt_settings');
      if (stored) {
        const s = JSON.parse(stored);
        pos = s.currencyPosition;
      }
    } catch (e) {
      // fallback
    }
  }
  if (!pos) pos = 'before';

  const formatted = (parseFloat(amount) || 0).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return pos === 'after' ? `${formatted} ${symbol}` : `${symbol}${formatted}`;
}

// Check if an invoice in local state has passed its due date and should be marked overdue
export function checkAndUpdateOverdueStatus(invoices) {
  const today = new Date().toISOString().split('T')[0];
  return invoices.map(inv => {
    if (inv.status === 'pending' && inv.dueDate < today) {
      return { ...inv, status: 'overdue' };
    }
    return inv;
  });
}

// LocalStorage Persistence Keys
const STORAGE_KEYS = {
  SETTINGS: 'inv_mgmt_settings',
  ESTIMATES: 'inv_mgmt_estimates',
  INVOICES: 'inv_mgmt_invoices',
  CUSTOMERS: 'inv_mgmt_customers',
  INITIALIZED: 'inv_mgmt_initialized',
};

// Storage APIs
function ensureInitialized() {
  const initialized = localStorage.getItem(STORAGE_KEYS.INITIALIZED);
  if (initialized !== 'true') {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(defaultCompanySettings));
    localStorage.setItem(STORAGE_KEYS.ESTIMATES, JSON.stringify(sampleEstimates));
    const updated = checkAndUpdateOverdueStatus(sampleInvoices);
    localStorage.setItem(STORAGE_KEYS.INVOICES, JSON.stringify(updated));
    localStorage.setItem(STORAGE_KEYS.CUSTOMERS, JSON.stringify(sampleCustomers));
    localStorage.setItem(STORAGE_KEYS.INITIALIZED, 'true');
  }
}

export function loadSettings() {
  ensureInitialized();
  const stored = localStorage.getItem(STORAGE_KEYS.SETTINGS);
  if (!stored) {
    return { name: '', email: '', address: '', phone: '', logoUrl: '', currency: '$' };
  }
  return JSON.parse(stored);
}

export function saveSettings(settings) {
  localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
}

export function loadEstimates() {
  ensureInitialized();
  const stored = localStorage.getItem(STORAGE_KEYS.ESTIMATES);
  if (!stored) return [];
  return JSON.parse(stored);
}

export function saveEstimates(estimates) {
  localStorage.setItem(STORAGE_KEYS.ESTIMATES, JSON.stringify(estimates));
}

export function loadInvoices() {
  ensureInitialized();
  const stored = localStorage.getItem(STORAGE_KEYS.INVOICES);
  if (!stored) return [];
  const parsed = JSON.parse(stored);
  return checkAndUpdateOverdueStatus(parsed);
}

export function saveInvoices(invoices) {
  localStorage.setItem(STORAGE_KEYS.INVOICES, JSON.stringify(invoices));
}

// Customers Storage APIs
export function loadCustomers() {
  ensureInitialized();
  const stored = localStorage.getItem(STORAGE_KEYS.CUSTOMERS);
  if (!stored) return [];
  return JSON.parse(stored);
}

export function saveCustomers(customers) {
  localStorage.setItem(STORAGE_KEYS.CUSTOMERS, JSON.stringify(customers));
}

// Generate serial IDs
export function generateNextId(prefix, existingList) {
  const numbers = existingList
    .map(item => {
      const match = item.id.match(new RegExp(`${prefix}-(\\d+)`));
      return match ? parseInt(match[1], 10) : 0;
    })
    .filter(n => !isNaN(n));
  
  const maxNumber = numbers.length > 0 ? Math.max(...numbers) : 1000;
  return `${prefix}-${maxNumber + 1}`;
}
