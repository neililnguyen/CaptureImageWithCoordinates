// src/components/ApproachInfo.tsx
import React from 'react';
import { Grid, Paper, TextField, Button, Typography } from '@mui/material';

const ApproachInfo: React.FC = () => {
  return (
    <Grid container spacing={2} sx={{ mt: 2 }}>
      <Grid item xs={8}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6">Thông tin khách hàng</Typography>
          {/* Bộ lọc và tìm kiếm thông tin khách hàng */}
          <TextField fullWidth label="Tìm kiếm khách hàng" sx={{ mt: 2 }} />
          {/* Các trường thông tin khách hàng */}
          <TextField fullWidth label="Tên công ty / Tên khách hàng" sx={{ mt: 2 }} />
          <TextField fullWidth label="Địa chỉ" sx={{ mt: 2 }} />
          {/* Thêm các trường khác nếu cần */}
        </Paper>
      </Grid>
      <Grid item xs={4}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6">Thông tin tiếp cận</Typography>
          <TextField fullWidth label="Tên người liên hệ" sx={{ mt: 2 }} />
          <TextField fullWidth label="Email" sx={{ mt: 2 }} />
          <TextField fullWidth label="Số điện thoại" sx={{ mt: 2 }} />
          {/* Các trường khác */}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ApproachInfo;
