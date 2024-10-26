// src/components/SalesInfo.tsx
import React from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';

const SalesInfo: React.FC = () => {
  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6">Thông tin doanh số</Typography>
      <TextField label="Từ ngày" type="date" sx={{ mt: 2, mr: 2 }} InputLabelProps={{ shrink: true }} />
      <TextField label="Đến ngày" type="date" sx={{ mt: 2, mr: 2 }} InputLabelProps={{ shrink: true }} />
      <Button variant="contained" sx={{ mt: 2 }}>Lọc</Button>
      {/* Bảng doanh số */}
    </Box>
  );
};

export default SalesInfo;
