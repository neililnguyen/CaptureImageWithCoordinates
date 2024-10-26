// src/components/HistoryInfo.tsx
import React from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';

const HistoryInfo: React.FC = () => {
  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6">Lịch sử tiếp cận</Typography>
      <TextField label="Từ ngày" type="date" sx={{ mt: 2, mr: 2 }} InputLabelProps={{ shrink: true }} />
      <TextField label="Đến ngày" type="date" sx={{ mt: 2, mr: 2 }} InputLabelProps={{ shrink: true }} />
      <Button variant="contained" sx={{ mt: 2 }}>Lọc</Button>
      {/* Bảng lịch sử tiếp cận */}
    </Box>
  );
};

export default HistoryInfo;
