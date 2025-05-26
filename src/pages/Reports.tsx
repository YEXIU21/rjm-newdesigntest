import React, { useState } from 'react';
import {
  Typography,
  Paper,
  Box,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  CardContent,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Chip,
  SelectChangeEvent
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import AssessmentIcon from '@mui/icons-material/Assessment';
import DownloadIcon from '@mui/icons-material/Download';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import CasinoIcon from '@mui/icons-material/Casino';
import '../styles/Reports.css';

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
      id={`report-tabpanel-${index}`}
      aria-labelledby={`report-tab-${index}`}
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

const Reports = () => {
  const [tabValue, setTabValue] = useState(0);
  const [reportType, setReportType] = useState('daily');
  const [startDate, setStartDate] = useState<Date | null>(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)); // 7 days ago
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [gameProvider, setGameProvider] = useState('all');

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleReportTypeChange = (event: SelectChangeEvent) => {
    setReportType(event.target.value);
  };

  const handleGameProviderChange = (event: SelectChangeEvent) => {
    setGameProvider(event.target.value);
  };

  // Mock data for financial summary
  const financialSummary = {
    totalDeposits: 1250000,
    totalWithdrawals: 875000,
    netRevenue: 375000,
    depositCount: 2500,
    withdrawalCount: 1200,
    averageDeposit: 500,
    averageWithdrawal: 729.17
  };

  // Mock data for player statistics
  const playerStats = {
    totalPlayers: 3500,
    activePlayers: 1200,
    newPlayers: 350,
    conversionRate: 34.29,
    retentionRate: 65.71,
    averageBetSize: 100
  };

  // Mock data for game performance
  const gamePerformance = [
    { id: 1, name: 'Sweet Bonanza', provider: 'Pragmatic Play', plays: 12500, revenue: 75000, rtp: 96.5 },
    { id: 2, name: 'Blackjack VIP', provider: 'Evolution', plays: 8750, revenue: 62500, rtp: 97.8 },
    { id: 3, name: 'Gates of Olympus', provider: 'Pragmatic Play', plays: 10000, revenue: 60000, rtp: 96.2 },
    { id: 4, name: 'Lightning Roulette', provider: 'Evolution', plays: 7500, revenue: 45000, rtp: 97.3 },
    { id: 5, name: 'Buffalo King', provider: 'Pragmatic Play', plays: 6000, revenue: 36000, rtp: 96.7 }
  ];

  // Mock data for transaction history
  const transactionHistory = [
    { id: 'TX123456', type: 'deposit', method: 'Bitcoin', amount: 5000, status: 'completed', date: '2023-06-15', player: 'player1' },
    { id: 'TX123457', type: 'withdrawal', method: 'Bank Transfer', amount: 3000, status: 'completed', date: '2023-06-14', player: 'player2' },
    { id: 'TX123458', type: 'deposit', method: 'GCash', amount: 2000, status: 'completed', date: '2023-06-14', player: 'player3' },
    { id: 'TX123459', type: 'withdrawal', method: 'PayMaya', amount: 1500, status: 'pending', date: '2023-06-13', player: 'player4' },
    { id: 'TX123460', type: 'deposit', method: 'Bank Transfer', amount: 10000, status: 'completed', date: '2023-06-12', player: 'player5' },
    { id: 'TX123461', type: 'withdrawal', method: 'Bitcoin', amount: 7500, status: 'completed', date: '2023-06-11', player: 'player1' },
    { id: 'TX123462', type: 'deposit', method: 'GCash', amount: 3000, status: 'completed', date: '2023-06-10', player: 'player6' }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP'
    }).format(amount);
  };

  return (
    <div className="reports-container">
      <Paper elevation={3} className="reports-paper">
        <Box className="reports-header">
          <AssessmentIcon className="reports-icon" />
          <Typography variant="h4" component="h1" className="reports-title">
            Reports
          </Typography>
        </Box>

        <Box className="report-filters" sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          <Box sx={{ flex: '1 1 300px', minWidth: '250px' }}>
            <FormControl fullWidth>
              <InputLabel id="report-type-label">Report Type</InputLabel>
              <Select
                labelId="report-type-label"
                value={reportType}
                label="Report Type"
                onChange={handleReportTypeChange}
              >
                <MenuItem value="daily">Daily</MenuItem>
                <MenuItem value="weekly">Weekly</MenuItem>
                <MenuItem value="monthly">Monthly</MenuItem>
                <MenuItem value="custom">Custom Range</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ flex: '1 1 300px', minWidth: '250px' }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Start Date"
                value={startDate}
                onChange={(newValue: Date | null) => setStartDate(newValue)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    variant: 'outlined'
                  }
                }}
              />
            </LocalizationProvider>
          </Box>
          <Box sx={{ flex: '1 1 300px', minWidth: '250px' }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="End Date"
                value={endDate}
                onChange={(newValue: Date | null) => setEndDate(newValue)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    variant: 'outlined'
                  }
                }}
              />
            </LocalizationProvider>
          </Box>
          <Box sx={{ flex: '1 1 300px', minWidth: '250px' }}>
            <Button
              variant="contained"
              fullWidth
              startIcon={<DownloadIcon />}
              className="export-button"
            >
              Export Report
            </Button>
          </Box>
        </Box>

        <Box className="report-tabs-container">
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="report tabs"
            className="report-tabs"
            variant="fullWidth"
          >
            <Tab icon={<AccountBalanceIcon />} label="Financial Summary" id="report-tab-0" />
            <Tab icon={<PeopleAltIcon />} label="Player Statistics" id="report-tab-1" />
            <Tab icon={<CasinoIcon />} label="Game Performance" id="report-tab-2" />
            <Tab icon={<AssessmentIcon />} label="Transactions" id="report-tab-3" />
          </Tabs>

          <TabPanel value={tabValue} index={0}>
            <Box className="summary-cards" sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
              <Box sx={{ flex: '1 1 300px', minWidth: '250px' }}>
                <Card className="summary-card">
                  <CardContent>
                    <Typography variant="subtitle2" color="textSecondary">
                      Total Deposits
                    </Typography>
                    <Typography variant="h4" gutterBottom className="summary-value">
                      {formatCurrency(financialSummary.totalDeposits)}
                    </Typography>
                    <Box className="summary-details">
                      <Typography variant="body2">
                        {financialSummary.depositCount} transactions
                      </Typography>
                      <Chip 
                        icon={<TrendingUpIcon />} 
                        label="+12.5%" 
                        size="small" 
                        color="success" 
                        className="trend-chip"
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Box>
              <Box sx={{ flex: '1 1 300px', minWidth: '250px' }}>
                <Card className="summary-card">
                  <CardContent>
                    <Typography variant="subtitle2" color="textSecondary">
                      Total Withdrawals
                    </Typography>
                    <Typography variant="h4" gutterBottom className="summary-value">
                      {formatCurrency(financialSummary.totalWithdrawals)}
                    </Typography>
                    <Box className="summary-details">
                      <Typography variant="body2">
                        {financialSummary.withdrawalCount} transactions
                      </Typography>
                      <Chip 
                        icon={<TrendingUpIcon />} 
                        label="+8.3%" 
                        size="small" 
                        color="error" 
                        className="trend-chip"
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Box>
              <Box sx={{ flex: '1 1 300px', minWidth: '250px' }}>
                <Card className="summary-card">
                  <CardContent>
                    <Typography variant="subtitle2" color="textSecondary">
                      Net Revenue
                    </Typography>
                    <Typography variant="h4" gutterBottom className="summary-value">
                      {formatCurrency(financialSummary.netRevenue)}
                    </Typography>
                    <Box className="summary-details">
                      <Typography variant="body2">
                        30% margin
                      </Typography>
                      <Chip 
                        icon={<TrendingUpIcon />} 
                        label="+15.2%" 
                        size="small" 
                        color="success" 
                        className="trend-chip"
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            </Box>

            <TableContainer className="report-table-container">
              <Typography variant="h6" className="table-title">
                Financial Details
              </Typography>
              <Table className="report-table">
                <TableHead>
                  <TableRow>
                    <TableCell>Metric</TableCell>
                    <TableCell align="right">Value</TableCell>
                    <TableCell align="right">Change</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Total Deposits</TableCell>
                    <TableCell align="right">{formatCurrency(financialSummary.totalDeposits)}</TableCell>
                    <TableCell align="right" className="positive-change">+12.5%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Total Withdrawals</TableCell>
                    <TableCell align="right">{formatCurrency(financialSummary.totalWithdrawals)}</TableCell>
                    <TableCell align="right" className="negative-change">+8.3%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Net Revenue</TableCell>
                    <TableCell align="right">{formatCurrency(financialSummary.netRevenue)}</TableCell>
                    <TableCell align="right" className="positive-change">+15.2%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Average Deposit</TableCell>
                    <TableCell align="right">{formatCurrency(financialSummary.averageDeposit)}</TableCell>
                    <TableCell align="right" className="positive-change">+3.1%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Average Withdrawal</TableCell>
                    <TableCell align="right">{formatCurrency(financialSummary.averageWithdrawal)}</TableCell>
                    <TableCell align="right" className="negative-change">-1.2%</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <Box className="summary-cards" sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
              <Box sx={{ flex: '1 1 300px', minWidth: '250px' }}>
                <Card className="summary-card">
                  <CardContent>
                    <Typography variant="subtitle2" color="textSecondary">
                      Total Players
                    </Typography>
                    <Typography variant="h4" gutterBottom className="summary-value">
                      {playerStats.totalPlayers.toLocaleString()}
                    </Typography>
                    <Box className="summary-details">
                      <Typography variant="body2">
                        Lifetime
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
              <Box sx={{ flex: '1 1 300px', minWidth: '250px' }}>
                <Card className="summary-card">
                  <CardContent>
                    <Typography variant="subtitle2" color="textSecondary">
                      Active Players
                    </Typography>
                    <Typography variant="h4" gutterBottom className="summary-value">
                      {playerStats.activePlayers.toLocaleString()}
                    </Typography>
                    <Box className="summary-details">
                      <Typography variant="body2">
                        This period
                      </Typography>
                      <Chip 
                        icon={<TrendingUpIcon />} 
                        label="+5.2%" 
                        size="small" 
                        color="success" 
                        className="trend-chip"
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Box>
              <Box sx={{ flex: '1 1 300px', minWidth: '250px' }}>
                <Card className="summary-card">
                  <CardContent>
                    <Typography variant="subtitle2" color="textSecondary">
                      New Players
                    </Typography>
                    <Typography variant="h4" gutterBottom className="summary-value">
                      {playerStats.newPlayers.toLocaleString()}
                    </Typography>
                    <Box className="summary-details">
                      <Typography variant="body2">
                        This period
                      </Typography>
                      <Chip 
                        icon={<TrendingUpIcon />} 
                        label="+9.7%" 
                        size="small" 
                        color="success" 
                        className="trend-chip"
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Box>
              <Box sx={{ flex: '1 1 300px', minWidth: '250px' }}>
                <Card className="summary-card">
                  <CardContent>
                    <Typography variant="subtitle2" color="textSecondary">
                      Conversion Rate
                    </Typography>
                    <Typography variant="h4" gutterBottom className="summary-value">
                      {playerStats.conversionRate.toFixed(2)}%
                    </Typography>
                    <Box className="summary-details">
                      <Typography variant="body2">
                        Registration to deposit
                      </Typography>
                      <Chip 
                        icon={<TrendingUpIcon />} 
                        label="+2.1%" 
                        size="small" 
                        color="success" 
                        className="trend-chip"
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Box>
              <Box sx={{ flex: '1 1 300px', minWidth: '250px' }}>
                <Card className="summary-card">
                  <CardContent>
                    <Typography variant="subtitle2" color="textSecondary">
                      Retention Rate
                    </Typography>
                    <Typography variant="h4" gutterBottom className="summary-value">
                      {playerStats.retentionRate.toFixed(2)}%
                    </Typography>
                    <Box className="summary-details">
                      <Typography variant="body2">
                        30-day retention
                      </Typography>
                      <Chip 
                        icon={<TrendingDownIcon />} 
                        label="-1.4%" 
                        size="small" 
                        color="error" 
                        className="trend-chip"
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Box>
              <Box sx={{ flex: '1 1 300px', minWidth: '250px' }}>
                <Card className="summary-card">
                  <CardContent>
                    <Typography variant="subtitle2" color="textSecondary">
                      Average Bet Size
                    </Typography>
                    <Typography variant="h4" gutterBottom className="summary-value">
                      {formatCurrency(playerStats.averageBetSize)}
                    </Typography>
                    <Box className="summary-details">
                      <Typography variant="body2">
                        Per player
                      </Typography>
                      <Chip 
                        icon={<TrendingUpIcon />} 
                        label="+3.5%" 
                        size="small" 
                        color="success" 
                        className="trend-chip"
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            </Box>

            <TableContainer className="report-table-container">
              <Typography variant="h6" className="table-title">
                Player Activity
              </Typography>
              <Table className="report-table">
                <TableHead>
                  <TableRow>
                    <TableCell>Metric</TableCell>
                    <TableCell align="right">Value</TableCell>
                    <TableCell align="right">Change</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Total Logins</TableCell>
                    <TableCell align="right">8,723</TableCell>
                    <TableCell align="right" className="positive-change">+7.2%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Average Session Time</TableCell>
                    <TableCell align="right">42 min</TableCell>
                    <TableCell align="right" className="positive-change">+4.8%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Mobile Users</TableCell>
                    <TableCell align="right">68%</TableCell>
                    <TableCell align="right" className="positive-change">+5.6%</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>

          <TabPanel value={tabValue} index={2}>
            <TableContainer className="report-table-container">
              <Typography variant="h6" className="table-title">
                Top Performing Games
              </Typography>
              <Table className="report-table">
                <TableHead>
                  <TableRow>
                    <TableCell>Game</TableCell>
                    <TableCell>Provider</TableCell>
                    <TableCell align="right">Total Plays</TableCell>
                    <TableCell align="right">Revenue</TableCell>
                    <TableCell align="right">RTP</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {gamePerformance.map((game) => (
                    <TableRow key={game.id}>
                      <TableCell>{game.name}</TableCell>
                      <TableCell>{game.provider}</TableCell>
                      <TableCell align="right">{game.plays.toLocaleString()}</TableCell>
                      <TableCell align="right">{formatCurrency(game.revenue)}</TableCell>
                      <TableCell align="right">{game.rtp}%</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>
          
          <TabPanel value={tabValue} index={3}>
            <TableContainer className="report-table-container">
              <Typography variant="h6" className="table-title">
                Transaction History
              </Typography>
              <Table className="report-table">
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Player</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Method</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {transactionHistory.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>{transaction.id}</TableCell>
                      <TableCell>{transaction.player}</TableCell>
                      <TableCell>
                        <Chip
                          label={transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                          color={transaction.type === 'deposit' ? 'success' : 'error'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>{transaction.method}</TableCell>
                      <TableCell align="right" className={transaction.type === 'deposit' ? 'positive-change' : 'negative-change'}>
                        {transaction.type === 'deposit' ? '+' : '-'}{formatCurrency(transaction.amount)}
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                          color={transaction.status === 'completed' ? 'success' : 'warning'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>{transaction.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>
        </Box>
      </Paper>
    </div>
  );
};

export default Reports; 