import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Avatar, 
  Tooltip,
  IconButton
} from '@mui/material';
import { HelpOutlined } from '@mui/icons-material';

export function KPICard({ title, value, subtitle, icon, color, bg, desc }) {
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
