// src/App.tsx
import React from 'react';
import { CssBaseline, Container } from '@mui/material';
import CustomerApproachPage from './pages/CustomerApproachPage';

const App: React.FC = () => (
  <Container>
    <CssBaseline />
    <CustomerApproachPage />
  </Container>
);

export default App;
