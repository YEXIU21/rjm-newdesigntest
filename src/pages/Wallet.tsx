import React, { useState } from 'react';
import {
  Typography,
  Paper,
  Box,
  Tabs,
  Tab,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Grid,
  Card,
  CardContent,
  Divider,
  Alert,
  IconButton,
  SelectChangeEvent
} from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import HistoryIcon from '@mui/icons-material/History';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import '../styles/Wallet.css';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`wallet-tabpanel-${index}`}
      aria-labelledby={`wallet-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const Wallet = () => {
  const [tabValue, setTabValue] = useState(0);
  const [depositMethod, setDepositMethod] = useState('');
  const [withdrawMethod, setWithdrawMethod] = useState('');
  const [depositAmount, setDepositAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);
  const [showDepositSuccess, setShowDepositSuccess] = useState(false);
  const [showWithdrawSuccess, setShowWithdrawSuccess] = useState(false);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleDepositMethodChange = (event: SelectChangeEvent) => {
    setDepositMethod(event.target.value);
    if (errors.depositMethod) {
      setErrors({ ...errors, depositMethod: '' });
    }
  };

  const handleWithdrawMethodChange = (event: SelectChangeEvent) => {
    setWithdrawMethod(event.target.value);
    if (errors.withdrawMethod) {
      setErrors({ ...errors, withdrawMethod: '' });
    }
  };

  const handleDepositAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDepositAmount(event.target.value);
    if (errors.depositAmount) {
      setErrors({ ...errors, depositAmount: '' });
    }
  };

  const handleWithdrawAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWithdrawAmount(event.target.value);
    if (errors.withdrawAmount) {
      setErrors({ ...errors, withdrawAmount: '' });
    }
  };

  const validateDeposit = () => {
    const newErrors: Record<string, string> = {};
    
    if (!depositMethod) {
      newErrors.depositMethod = 'Please select a deposit method';
    }
    
    if (!depositAmount) {
      newErrors.depositAmount = 'Please enter an amount';
    } else if (isNaN(Number(depositAmount)) || Number(depositAmount) <= 0) {
      newErrors.depositAmount = 'Please enter a valid amount';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateWithdraw = () => {
    const newErrors: Record<string, string> = {};
    
    if (!withdrawMethod) {
      newErrors.withdrawMethod = 'Please select a withdrawal method';
    }
    
    if (!withdrawAmount) {
      newErrors.withdrawAmount = 'Please enter an amount';
    } else if (isNaN(Number(withdrawAmount)) || Number(withdrawAmount) <= 0) {
      newErrors.withdrawAmount = 'Please enter a valid amount';
    } else if (Number(withdrawAmount) > 5000) {
      newErrors.withdrawAmount = 'Maximum withdrawal amount is 5,000';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleDeposit = () => {
    if (validateDeposit()) {
      console.log('Processing deposit:', {
        method: depositMethod,
        amount: depositAmount
      });
      setShowDepositSuccess(true);
      // Reset form
      setDepositMethod('');
      setDepositAmount('');
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setShowDepositSuccess(false);
      }, 5000);
    }
  };

  const handleWithdraw = () => {
    if (validateWithdraw()) {
      console.log('Processing withdrawal:', {
        method: withdrawMethod,
        amount: withdrawAmount
      });
      setShowWithdrawSuccess(true);
      // Reset form
      setWithdrawMethod('');
      setWithdrawAmount('');
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setShowWithdrawSuccess(false);
      }, 5000);
    }
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText('bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh');
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const recentTransactions = [
    { id: 'TX123456', type: 'deposit', method: 'Bitcoin', amount: '0.05 BTC', status: 'completed', date: '2023-06-15' },
    { id: 'TX123457', type: 'withdrawal', method: 'Bank Transfer', amount: '₱5,000', status: 'pending', date: '2023-06-10' },
    { id: 'TX123458', type: 'deposit', method: 'GCash', amount: '₱10,000', status: 'completed', date: '2023-06-05' },
    { id: 'TX123459', type: 'withdrawal', method: 'PayMaya', amount: '₱3,000', status: 'completed', date: '2023-05-28' }
  ];

  return (
    <div className="wallet-container">
      <Paper elevation={3} className="wallet-paper">
        <Box className="wallet-header">
          <AccountBalanceWalletIcon className="wallet-icon" />
          <Typography variant="h4" component="h1" className="wallet-title">
            My Wallet
          </Typography>
        </Box>

        <Box className="balance-section">
          <Typography variant="h5" gutterBottom>
            Available Balance
          </Typography>
          <Typography variant="h3" className="balance-amount">
            ₱25,000.00
          </Typography>
          <Box className="balance-actions">
            <Button 
              variant="contained" 
              startIcon={<ArrowUpwardIcon />}
              onClick={() => setTabValue(0)}
              className="deposit-button"
            >
              Deposit
            </Button>
            <Button 
              variant="outlined" 
              startIcon={<ArrowDownwardIcon />}
              onClick={() => setTabValue(1)}
              className="withdraw-button"
            >
              Withdraw
            </Button>
          </Box>
        </Box>

        <Box className="wallet-tabs-container">
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange} 
            aria-label="wallet operations"
            className="wallet-tabs"
            variant="fullWidth"
          >
            <Tab icon={<ArrowUpwardIcon />} label="Deposit" id="wallet-tab-0" />
            <Tab icon={<ArrowDownwardIcon />} label="Withdraw" id="wallet-tab-1" />
            <Tab icon={<HistoryIcon />} label="History" id="wallet-tab-2" />
          </Tabs>

          <TabPanel value={tabValue} index={0}>
            {showDepositSuccess && (
              <Alert severity="success" className="success-alert">
                Your deposit request has been submitted successfully!
              </Alert>
            )}
            
            <FormControl fullWidth error={!!errors.depositMethod} margin="normal">
              <InputLabel id="deposit-method-label">Deposit Method</InputLabel>
              <Select
                labelId="deposit-method-label"
                value={depositMethod}
                label="Deposit Method"
                onChange={handleDepositMethodChange}
              >
                <MenuItem value="bitcoin">Bitcoin</MenuItem>
                <MenuItem value="ethereum">Ethereum</MenuItem>
                <MenuItem value="gcash">GCash</MenuItem>
                <MenuItem value="paymaya">PayMaya</MenuItem>
                <MenuItem value="bank">Bank Transfer</MenuItem>
              </Select>
              {errors.depositMethod && <FormHelperText>{errors.depositMethod}</FormHelperText>}
            </FormControl>
            
            <TextField
              fullWidth
              label="Amount"
              value={depositAmount}
              onChange={handleDepositAmountChange}
              error={!!errors.depositAmount}
              helperText={errors.depositAmount}
              type="number"
              margin="normal"
              InputProps={{
                startAdornment: depositMethod === 'bitcoin' || depositMethod === 'ethereum' ? 
                  null : <Typography className="currency-symbol">₱</Typography>
              }}
            />
            
            {depositMethod === 'bitcoin' && (
              <Card className="crypto-address-card">
                <CardContent>
                  <Typography variant="subtitle1" gutterBottom>
                    Bitcoin Deposit Address
                  </Typography>
                  <Box className="address-container">
                    <Typography variant="body2" className="crypto-address">
                      bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh
                    </Typography>
                    <IconButton 
                      size="small" 
                      onClick={handleCopyAddress}
                      className="copy-button"
                      color={copied ? "success" : "default"}
                    >
                      {copied ? <CheckCircleIcon /> : <ContentCopyIcon />}
                    </IconButton>
                  </Box>
                  <Typography variant="caption" color="textSecondary">
                    Please send only Bitcoin (BTC) to this address. Sending any other cryptocurrency may result in permanent loss.
                  </Typography>
                </CardContent>
              </Card>
            )}
            
            {depositMethod === 'ethereum' && (
              <Card className="crypto-address-card">
                <CardContent>
                  <Typography variant="subtitle1" gutterBottom>
                    Ethereum Deposit Address
                  </Typography>
                  <Box className="address-container">
                    <Typography variant="body2" className="crypto-address">
                      0x742d35Cc6634C0532925a3b844Bc454e4438f44e
                    </Typography>
                    <IconButton 
                      size="small" 
                      onClick={handleCopyAddress}
                      className="copy-button"
                      color={copied ? "success" : "default"}
                    >
                      {copied ? <CheckCircleIcon /> : <ContentCopyIcon />}
                    </IconButton>
                  </Box>
                  <Typography variant="caption" color="textSecondary">
                    Please send only Ethereum (ETH) to this address. Sending any other cryptocurrency may result in permanent loss.
                  </Typography>
                </CardContent>
              </Card>
            )}
            
            {depositMethod === 'gcash' && (
              <Card className="payment-info-card">
                <CardContent>
                  <Typography variant="subtitle1" gutterBottom>
                    GCash Payment Details
                  </Typography>
                  <Typography variant="body2">
                    <strong>Account Name:</strong> Your Company
                  </Typography>
                  <Typography variant="body2">
                    <strong>Mobile Number:</strong> 09123456789
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    Please include your username in the reference/message field when making the payment.
                  </Typography>
                </CardContent>
              </Card>
            )}
            
            {depositMethod === 'paymaya' && (
              <Card className="payment-info-card">
                <CardContent>
                  <Typography variant="subtitle1" gutterBottom>
                    PayMaya Payment Details
                  </Typography>
                  <Typography variant="body2">
                    <strong>Account Name:</strong> Your Company
                  </Typography>
                  <Typography variant="body2">
                    <strong>Mobile Number:</strong> 09123456789
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    Please include your username in the reference/message field when making the payment.
                  </Typography>
                </CardContent>
              </Card>
            )}
            
            {depositMethod === 'bank' && (
              <Card className="payment-info-card">
                <CardContent>
                  <Typography variant="subtitle1" gutterBottom>
                    Bank Transfer Details
                  </Typography>
                  <Typography variant="body2">
                    <strong>Bank Name:</strong> BDO
                  </Typography>
                  <Typography variant="body2">
                    <strong>Account Name:</strong> Your Company
                  </Typography>
                  <Typography variant="body2">
                    <strong>Account Number:</strong> 1234 5678 9012
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    Please include your username in the reference/message field when making the transfer.
                  </Typography>
                </CardContent>
              </Card>
            )}
            
            <Button 
              variant="contained" 
              color="primary" 
              fullWidth 
              className="action-button"
              onClick={handleDeposit}
              disabled={!depositMethod || !depositAmount}
            >
              Confirm Deposit
            </Button>
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            {showWithdrawSuccess && (
              <Alert severity="success" className="success-alert">
                Your withdrawal request has been submitted successfully!
              </Alert>
            )}
            
            <FormControl fullWidth error={!!errors.withdrawMethod} margin="normal">
              <InputLabel id="withdraw-method-label">Withdrawal Method</InputLabel>
              <Select
                labelId="withdraw-method-label"
                value={withdrawMethod}
                label="Withdrawal Method"
                onChange={handleWithdrawMethodChange}
              >
                <MenuItem value="bitcoin">Bitcoin</MenuItem>
                <MenuItem value="ethereum">Ethereum</MenuItem>
                <MenuItem value="gcash">GCash</MenuItem>
                <MenuItem value="paymaya">PayMaya</MenuItem>
                <MenuItem value="bank">Bank Transfer</MenuItem>
              </Select>
              {errors.withdrawMethod && <FormHelperText>{errors.withdrawMethod}</FormHelperText>}
            </FormControl>
            
            <TextField
              fullWidth
              label="Amount"
              value={withdrawAmount}
              onChange={handleWithdrawAmountChange}
              error={!!errors.withdrawAmount}
              helperText={errors.withdrawAmount || "Maximum withdrawal: ₱5,000"}
              type="number"
              margin="normal"
              InputProps={{
                startAdornment: withdrawMethod === 'bitcoin' || withdrawMethod === 'ethereum' ? 
                  null : <Typography className="currency-symbol">₱</Typography>
              }}
            />
            
            {withdrawMethod === 'bitcoin' && (
              <TextField
                fullWidth
                label="Bitcoin Address"
                margin="normal"
                placeholder="Enter your Bitcoin wallet address"
              />
            )}
            
            {withdrawMethod === 'ethereum' && (
              <TextField
                fullWidth
                label="Ethereum Address"
                margin="normal"
                placeholder="Enter your Ethereum wallet address"
              />
            )}
            
            {withdrawMethod === 'gcash' && (
              <TextField
                fullWidth
                label="GCash Number"
                margin="normal"
                placeholder="Enter your GCash mobile number"
              />
            )}
            
            {withdrawMethod === 'paymaya' && (
              <TextField
                fullWidth
                label="PayMaya Number"
                margin="normal"
                placeholder="Enter your PayMaya mobile number"
              />
            )}
            
            {withdrawMethod === 'bank' && (
              <>
                <TextField
                  fullWidth
                  label="Bank Name"
                  margin="normal"
                  placeholder="Enter your bank name"
                />
                <TextField
                  fullWidth
                  label="Account Name"
                  margin="normal"
                  placeholder="Enter account holder name"
                />
                <TextField
                  fullWidth
                  label="Account Number"
                  margin="normal"
                  placeholder="Enter your account number"
                />
              </>
            )}
            
            <Button 
              variant="contained" 
              color="primary" 
              fullWidth 
              className="action-button"
              onClick={handleWithdraw}
              disabled={!withdrawMethod || !withdrawAmount}
            >
              Request Withdrawal
            </Button>
          </TabPanel>

          <TabPanel value={tabValue} index={2}>
            <Typography variant="h6" gutterBottom>
              Recent Transactions
            </Typography>
            
            {recentTransactions.length > 0 ? (
              <div className="transactions-list">
                {recentTransactions.map((transaction, index) => (
                  <React.Fragment key={transaction.id}>
                    <Box className="transaction-item">
                      <Box className="transaction-icon-container">
                        {transaction.type === 'deposit' ? (
                          <ArrowUpwardIcon className="deposit-icon" />
                        ) : (
                          <ArrowDownwardIcon className="withdraw-icon" />
                        )}
                      </Box>
                      <Box className="transaction-details">
                        <Typography variant="subtitle2">
                          {transaction.type === 'deposit' ? 'Deposit' : 'Withdrawal'} via {transaction.method}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          {transaction.date} • {transaction.id}
                        </Typography>
                      </Box>
                      <Box className="transaction-amount">
                        <Typography variant="subtitle2" className={transaction.type === 'deposit' ? 'amount-positive' : 'amount-negative'}>
                          {transaction.type === 'deposit' ? '+' : '-'}{transaction.amount}
                        </Typography>
                        <Typography variant="caption" className={`status-${transaction.status}`}>
                          {transaction.status}
                        </Typography>
                      </Box>
                    </Box>
                    {index < recentTransactions.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </div>
            ) : (
              <Typography variant="body1" className="no-transactions">
                No transactions yet
              </Typography>
            )}
            
            <Button 
              variant="outlined" 
              fullWidth 
              className="view-all-button"
              startIcon={<HistoryIcon />}
            >
              View All Transactions
            </Button>
          </TabPanel>
        </Box>
      </Paper>
    </div>
  );
};

export default Wallet; 