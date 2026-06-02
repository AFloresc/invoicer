export const defaultCompanySettings = {
  name: 'Apex Pixel Software',
  email: 'finance@apexpixel.io',
  address: '123 Tech Tower, Suite 400, San Francisco, CA 94105',
  phone: '+1 (555) 987-6543',
  logoUrl: '',
  currency: '$',
};

export const sampleCustomers = [
  {
    id: 'CUST-1001',
    name: 'John Doe',
    companyName: 'Acme Corporation',
    email: 'billing@acme.com',
    phone: '+1 (555) 123-4567',
    address: '100 Industrial Parkway, Bldg B, Chicago, IL 60611',
    notes: 'Primary enterprise contract'
  },
  {
    id: 'CUST-1002',
    name: 'Pepper Potts',
    companyName: 'Stark Industries',
    email: 'pepper@stark.com',
    phone: '+1 (555) 987-6543',
    address: '10880 El Medio Road, Malibu, CA 90265',
    notes: 'Requires high priority attention for energy solutions'
  },
  {
    id: 'CUST-1003',
    name: 'Norman Osborn',
    companyName: 'Oscorp Technologies',
    email: 'finance@oscorp.com',
    phone: '+1 (555) 555-0199',
    address: '750 Eleventh Ave, New York, NY 10019',
    notes: 'Genetic Research Department billing account'
  }
];

export const sampleEstimates = [
  {
    id: 'EST-1001',
    clientName: 'Acme Corporation',
    clientEmail: 'billing@acme.com',
    clientAddress: '100 Industrial Parkway, Bldg B, Chicago, IL 60611',
    date: '2026-05-10',
    dueDate: '2026-06-10',
    items: [
      { id: '1', description: 'Enterprise Website Redesign (Figma, React)', quantity: 1, unitPrice: 3500 },
      { id: '2', description: 'Cloud Infrastructure Setup (AWS/Terraform)', quantity: 1, unitPrice: 1000 },
    ],
    notes: 'Thank you for considering our proposal! This estimate remains valid for 30 days from the issue date.',
    status: 'accepted',
    taxRate: 5,
    discount: 0,
    terms: '50% upfront, 50% upon project launch.',
  },
  {
    id: 'EST-1002',
    clientName: 'Stark Industries',
    clientEmail: 'pepper@stark.com',
    clientAddress: '10880 El Medio Road, Malibu, CA 90265',
    date: '2026-05-25',
    dueDate: '2026-06-25',
    items: [
      { id: '1', description: 'AI Assistant Integration Core Library', quantity: 1, unitPrice: 15000 },
      { id: '2', description: 'Quantum Grid Compute Optimization Consult', quantity: 10, unitPrice: 800 },
      { id: '3', description: 'High-Temperature Cooling Exhaust R&D Support', quantity: 1, unitPrice: 1000 },
    ],
    notes: 'Proposal for clean-energy power plant integration and computational diagnostics.',
    status: 'pending',
    taxRate: 0,
    discount: 10,
    terms: 'Payment due within 15 days of stage finalization.',
  },
  {
    id: 'EST-1003',
    clientName: 'Oscorp Technologies',
    clientEmail: 'finance@oscorp.com',
    clientAddress: '750 Eleventh Ave, New York, NY 10019',
    date: '2026-04-15',
    dueDate: '2026-05-15',
    items: [
      { id: '1', description: 'Genetic Editing Database UI Support', quantity: 1, unitPrice: 1200 },
    ],
    notes: 'Proposed database UI modernization.',
    status: 'rejected',
    taxRate: 8,
    discount: 0,
    terms: 'Net-30 upon signature.',
  }
];

export const sampleInvoices = [
  {
    id: 'INV-1001',
    clientName: 'Acme Corporation',
    clientEmail: 'billing@acme.com',
    clientAddress: '100 Industrial Parkway, Bldg B, Chicago, IL 60611',
    date: '2026-05-12',
    dueDate: '2026-06-12',
    items: [
      { id: '1', description: 'Enterprise Website Redesign (Figma, React)', quantity: 1, unitPrice: 3500 },
      { id: '2', description: 'Cloud Infrastructure Setup (AWS/Terraform)', quantity: 1, unitPrice: 1000 },
    ],
    notes: 'Converted from Estimate EST-1001. Thank you for your business!',
    status: 'paid',
    taxRate: 5,
    discount: 0,
    terms: 'Paid via Bank Transfer.',
    estimateId: 'EST-1001',
  },
  {
    id: 'INV-1002',
    clientName: 'Wayne Enterprises',
    clientEmail: 'accounts@waynecorp.com',
    clientAddress: 'Wayne Tower, Suite 100, Gotham City, NJ 07001',
    date: '2026-05-20',
    dueDate: '2026-06-20',
    items: [
      { id: '1', description: 'Sub-Orbital Radar Telemetry Software Suite', quantity: 1, unitPrice: 12000 },
      { id: '2', description: 'Thermal Imaging Signal Calibration API', quantity: 1, unitPrice: 3000 },
    ],
    notes: 'Thank you for your prompt payment processing.',
    status: 'pending',
    taxRate: 0,
    discount: 0,
    terms: 'Net-30 payment schedule.',
  },
  {
    id: 'INV-1003',
    clientName: 'LexCorp Industries',
    clientEmail: 'receivables@lexcorp.com',
    clientAddress: '350 Lex Street, Metropolis, NY 10022',
    date: '2026-04-10',
    dueDate: '2026-05-10',
    items: [
      { id: '1', description: 'Kryptonite Shielding Frequency Simulation Console', quantity: 1, unitPrice: 8500 },
    ],
    notes: 'Urgent follow-up billing regarding completed aerospace telemetry interfaces.',
    status: 'overdue',
    taxRate: 8.5,
    discount: 5,
    terms: 'Immediate pay on overdue balances.',
  },
  {
    id: 'INV-1004',
    clientName: 'Umbrella Pharma Corp',
    clientEmail: 'payables@umbrella.com',
    clientAddress: 'Racoon City Research Lab, Unit 7, Arklay Mountains, CO 80401',
    date: '2026-05-01',
    dueDate: '2026-06-01',
    items: [
      { id: '1', description: 'Bio-Containment Logging & Alert Portal', quantity: 1, unitPrice: 3200 },
    ],
    notes: 'Software deployment successfully tested under containment conditions.',
    status: 'paid',
    taxRate: 0,
    discount: 0,
    terms: 'Net-15.',
  }
];
