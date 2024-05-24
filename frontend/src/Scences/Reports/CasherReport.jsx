import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  Paper,
} from '@mui/material';

const CashierReportForm = () => {
  const [billingAndPayment, setBillingAndPayment] = useState('');
  const [patientStatements, setPatientStatements] = useState('');
  const [paymentMethods, setPaymentMethods] = useState('');
  const [dailyTransactions, setDailyTransactions] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to the backend
    console.log({
      billingAndPayment,
      patientStatements,
      paymentMethods,
      dailyTransactions,
    });
  };

  return (
    <Box component={Paper} p={4}>
      <Typography variant="h5" gutterBottom>
        Cashier Reporting Form
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              label="Billing and Payment Processing"
              multiline
              rows={4}
              value={billingAndPayment}
              onChange={(e) => setBillingAndPayment(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Patient Statements of Account"
              multiline
              rows={4}
              value={patientStatements}
              onChange={(e) => setPatientStatements(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Handling of Payment Methods"
              multiline
              rows={4}
              value={paymentMethods}
              onChange={(e) => setPaymentMethods(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Daily Transactions and Deposits"
              multiline
              rows={4}
              value={dailyTransactions}
              onChange={(e) => setDailyTransactions(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Submit Report
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default CashierReportForm;