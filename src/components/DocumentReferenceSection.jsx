import React from 'react';
import { Card, CardContent, Typography, TextField, InputAdornment } from '@mui/material';
import { EditCalendar } from '@mui/icons-material';

export function DocumentReferenceSection({ initialData, docId, onDocIdChange, date, onDateChange, dueDate, onDueDateChange }) {
  return (
    <Card variant="outlined" sx={{ borderRadius: '12px' }}>
      <CardContent sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 2.5 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 700, fontFamily: 'var(--font-display)' }}>
          Document Reference
        </Typography>

        <TextField
          label="Reference ID"
          variant="outlined"
          fullWidth
          disabled={!!initialData}
          value={docId}
          onChange={(e) => onDocIdChange(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <EditCalendar sx={{ fontSize: 18, color: 'text.secondary' }} />
                </InputAdornment>
              )
            }
          }}
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
        />

        <TextField
          label="Issue Date"
          type="date"
          variant="outlined"
          fullWidth
          value={date}
          onChange={(e) => onDateChange(e.target.value)}
          slotProps={{ inputLabel: { shrink: true } }}
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
        />

        <TextField
          label="Due Date"
          type="date"
          variant="outlined"
          fullWidth
          value={dueDate}
          onChange={(e) => onDueDateChange(e.target.value)}
          slotProps={{ inputLabel: { shrink: true } }}
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
        />
      </CardContent>
    </Card>
  );
}
