import React, { useState } from 'react';
import {
  Typography,
  Paper,
  Box,
  Tabs,
  Tab,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  Alert,
  Tooltip,
  SelectChangeEvent
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GroupIcon from '@mui/icons-material/Group';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import BlockIcon from '@mui/icons-material/Block';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import '../styles/AgentManagement.css';

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
      id={`agent-tabpanel-${index}`}
      aria-labelledby={`agent-tab-${index}`}
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

interface AgentData {
  id: string;
  username: string;
  name: string;
  email: string;
  phone: string;
  level: string;
  status: 'active' | 'pending' | 'suspended';
  players: number;
  commission: number;
  earnings: number;
}

const AgentManagement = () => {
  const [tabValue, setTabValue] = useState(0);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<AgentData | null>(null);
  const [newAgentData, setNewAgentData] = useState({
    username: '',
    name: '',
    email: '',
    phone: '',
    level: 'sub-agent'
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showSuccess, setShowSuccess] = useState(false);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleOpenAddDialog = () => {
    setOpenAddDialog(true);
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
    setNewAgentData({
      username: '',
      name: '',
      email: '',
      phone: '',
      level: 'sub-agent'
    });
    setErrors({});
  };

  const handleOpenViewDialog = (agent: AgentData) => {
    setSelectedAgent(agent);
    setOpenViewDialog(true);
  };

  const handleCloseViewDialog = () => {
    setOpenViewDialog(false);
    setSelectedAgent(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewAgentData({
      ...newAgentData,
      [name]: value
    });
    
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setNewAgentData({
      ...newAgentData,
      [name]: value
    });
    
    // Clear error for this field when user selects
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateAgentData = () => {
    const newErrors: Record<string, string> = {};
    
    if (!newAgentData.username) {
      newErrors.username = 'Username is required';
    }
    
    if (!newAgentData.name) {
      newErrors.name = 'Name is required';
    }
    
    if (!newAgentData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(newAgentData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!newAgentData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10,12}$/.test(newAgentData.phone)) {
      newErrors.phone = 'Phone number is invalid';
    }
    
    if (!newAgentData.level) {
      newErrors.level = 'Agent level is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddAgent = () => {
    if (validateAgentData()) {
      console.log('Adding new agent:', newAgentData);
      handleCloseAddDialog();
      setShowSuccess(true);
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
    }
  };

  // Mock data for agents
  const agents: AgentData[] = [
    {
      id: 'AG001',
      username: 'masteragent1',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '09123456789',
      level: 'Master Agent',
      status: 'active',
      players: 120,
      commission: 5,
      earnings: 25000
    },
    {
      id: 'AG002',
      username: 'agent2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '09123456788',
      level: 'Sub-Agent',
      status: 'active',
      players: 45,
      commission: 3,
      earnings: 12000
    },
    {
      id: 'AG003',
      username: 'agent3',
      name: 'Robert Johnson',
      email: 'robert@example.com',
      phone: '09123456787',
      level: 'Sub-Agent',
      status: 'pending',
      players: 0,
      commission: 3,
      earnings: 0
    },
    {
      id: 'AG004',
      username: 'agent4',
      name: 'Maria Garcia',
      email: 'maria@example.com',
      phone: '09123456786',
      level: 'Sub-Agent',
      status: 'suspended',
      players: 28,
      commission: 3,
      earnings: 8500
    }
  ];

  // Mock data for commission history
  const commissionHistory = [
    { id: 'CM001', agent: 'masteragent1', amount: 5000, date: '2023-06-15', status: 'paid' },
    { id: 'CM002', agent: 'agent2', amount: 2500, date: '2023-06-15', status: 'paid' },
    { id: 'CM003', agent: 'masteragent1', amount: 3000, date: '2023-06-01', status: 'paid' },
    { id: 'CM004', agent: 'agent2', amount: 1500, date: '2023-06-01', status: 'paid' },
    { id: 'CM005', agent: 'agent4', amount: 1000, date: '2023-06-01', status: 'paid' }
  ];

  // Mock data for agent statistics
  const agentStats = {
    totalAgents: 4,
    activeAgents: 2,
    pendingAgents: 1,
    suspendedAgents: 1,
    totalPlayers: 193,
    totalCommission: 45500
  };

  return (
    <div className="agent-management-container">
      <Paper elevation={3} className="agent-management-paper">
        <Box className="agent-management-header">
          <GroupIcon className="agent-management-icon" />
          <Typography variant="h4" component="h1" className="agent-management-title">
            Agent Management
          </Typography>
        </Box>

        {showSuccess && (
          <Alert severity="success" className="success-alert">
            Agent has been added successfully!
          </Alert>
        )}

        <Box className="stats-section">
          <Grid container spacing={3}>
            <Grid xs={12} md={4}>
              <Card className="stat-card">
                <CardContent>
                  <Box className="stat-header">
                    <PeopleAltIcon className="stat-icon" />
                    <Typography variant="h6">Agents</Typography>
                  </Box>
                  <Typography variant="h3" className="stat-value">{agentStats.totalAgents}</Typography>
                  <Box className="stat-details">
                    <Chip 
                      label={`${agentStats.activeAgents} Active`} 
                      size="small" 
                      color="success" 
                      className="stat-chip"
                    />
                    <Chip 
                      label={`${agentStats.pendingAgents} Pending`} 
                      size="small" 
                      color="warning" 
                      className="stat-chip"
                    />
                    <Chip 
                      label={`${agentStats.suspendedAgents} Suspended`} 
                      size="small" 
                      color="error" 
                      className="stat-chip"
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid xs={12} md={4}>
              <Card className="stat-card">
                <CardContent>
                  <Box className="stat-header">
                    <GroupIcon className="stat-icon" />
                    <Typography variant="h6">Total Players</Typography>
                  </Box>
                  <Typography variant="h3" className="stat-value">{agentStats.totalPlayers}</Typography>
                  <Typography variant="body2" className="stat-subtitle">
                    Across all agents
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid xs={12} md={4}>
              <Card className="stat-card">
                <CardContent>
                  <Box className="stat-header">
                    <AccountBalanceWalletIcon className="stat-icon" />
                    <Typography variant="h6">Total Commission</Typography>
                  </Box>
                  <Typography variant="h3" className="stat-value">₱{agentStats.totalCommission.toLocaleString()}</Typography>
                  <Typography variant="body2" className="stat-subtitle">
                    Paid out to agents
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>

        <Box className="agent-actions">
          <Button
            variant="contained"
            startIcon={<PersonAddIcon />}
            onClick={handleOpenAddDialog}
            className="add-agent-button"
          >
            Add New Agent
          </Button>
        </Box>

        <Box className="agent-tabs-container">
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="agent management tabs"
            className="agent-tabs"
            variant="fullWidth"
          >
            <Tab icon={<GroupIcon />} label="Agents" id="agent-tab-0" />
            <Tab icon={<TrendingUpIcon />} label="Commission" id="agent-tab-1" />
          </Tabs>

          <TabPanel value={tabValue} index={0}>
            <TableContainer>
              <Table className="agents-table">
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Username</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Level</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Players</TableCell>
                    <TableCell>Commission</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {agents.map((agent) => (
                    <TableRow key={agent.id}>
                      <TableCell>{agent.id}</TableCell>
                      <TableCell>{agent.username}</TableCell>
                      <TableCell>{agent.name}</TableCell>
                      <TableCell>{agent.level}</TableCell>
                      <TableCell>
                        <Chip
                          label={agent.status.charAt(0).toUpperCase() + agent.status.slice(1)}
                          color={
                            agent.status === 'active'
                              ? 'success'
                              : agent.status === 'pending'
                              ? 'warning'
                              : 'error'
                          }
                          size="small"
                        />
                      </TableCell>
                      <TableCell>{agent.players}</TableCell>
                      <TableCell>{agent.commission}%</TableCell>
                      <TableCell>
                        <Box className="action-buttons">
                          <Tooltip title="View Details">
                            <IconButton
                              size="small"
                              onClick={() => handleOpenViewDialog(agent)}
                              color="primary"
                            >
                              <VisibilityIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Edit Agent">
                            <IconButton size="small" color="primary">
                              <EditIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title={agent.status === 'active' ? 'Suspend Agent' : 'Activate Agent'}>
                            <IconButton
                              size="small"
                              color={agent.status === 'active' ? 'error' : 'success'}
                            >
                              {agent.status === 'active' ? (
                                <BlockIcon fontSize="small" />
                              ) : (
                                <CheckCircleIcon fontSize="small" />
                              )}
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <TableContainer>
              <Table className="commission-table">
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Agent</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {commissionHistory.map((commission) => (
                    <TableRow key={commission.id}>
                      <TableCell>{commission.id}</TableCell>
                      <TableCell>{commission.agent}</TableCell>
                      <TableCell>₱{commission.amount.toLocaleString()}</TableCell>
                      <TableCell>{commission.date}</TableCell>
                      <TableCell>
                        <Chip
                          label={commission.status.charAt(0).toUpperCase() + commission.status.slice(1)}
                          color={commission.status === 'paid' ? 'success' : 'warning'}
                          size="small"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>
        </Box>
      </Paper>

      {/* Add Agent Dialog */}
      <Dialog open={openAddDialog} onClose={handleCloseAddDialog} maxWidth="md" fullWidth>
        <DialogTitle>Add New Agent</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid xs={12} md={6}>
              <TextField
                fullWidth
                label="Username"
                name="username"
                value={newAgentData.username}
                onChange={handleInputChange}
                error={!!errors.username}
                helperText={errors.username}
                margin="normal"
              />
            </Grid>
            <Grid xs={12} md={6}>
              <TextField
                fullWidth
                label="Full Name"
                name="name"
                value={newAgentData.name}
                onChange={handleInputChange}
                error={!!errors.name}
                helperText={errors.name}
                margin="normal"
              />
            </Grid>
            <Grid xs={12} md={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={newAgentData.email}
                onChange={handleInputChange}
                error={!!errors.email}
                helperText={errors.email}
                margin="normal"
              />
            </Grid>
            <Grid xs={12} md={6}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                value={newAgentData.phone}
                onChange={handleInputChange}
                error={!!errors.phone}
                helperText={errors.phone}
                margin="normal"
              />
            </Grid>
            <Grid xs={12}>
              <FormControl fullWidth margin="normal" error={!!errors.level}>
                <InputLabel id="agent-level-label">Agent Level</InputLabel>
                <Select
                  labelId="agent-level-label"
                  name="level"
                  value={newAgentData.level}
                  label="Agent Level"
                  onChange={handleSelectChange}
                >
                  <MenuItem value="master-agent">Master Agent</MenuItem>
                  <MenuItem value="sub-agent">Sub-Agent</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddDialog}>Cancel</Button>
          <Button onClick={handleAddAgent} variant="contained" color="primary">
            Add Agent
          </Button>
        </DialogActions>
      </Dialog>

      {/* View Agent Dialog */}
      <Dialog open={openViewDialog} onClose={handleCloseViewDialog} maxWidth="md" fullWidth>
        {selectedAgent && (
          <>
            <DialogTitle>Agent Details</DialogTitle>
            <DialogContent>
              <Grid container spacing={2}>
                <Grid xs={12} md={6}>
                  <Typography variant="subtitle2">ID</Typography>
                  <Typography variant="body1" gutterBottom>{selectedAgent.id}</Typography>
                </Grid>
                <Grid xs={12} md={6}>
                  <Typography variant="subtitle2">Username</Typography>
                  <Typography variant="body1" gutterBottom>{selectedAgent.username}</Typography>
                </Grid>
                <Grid xs={12} md={6}>
                  <Typography variant="subtitle2">Name</Typography>
                  <Typography variant="body1" gutterBottom>{selectedAgent.name}</Typography>
                </Grid>
                <Grid xs={12} md={6}>
                  <Typography variant="subtitle2">Email</Typography>
                  <Typography variant="body1" gutterBottom>{selectedAgent.email}</Typography>
                </Grid>
                <Grid xs={12} md={6}>
                  <Typography variant="subtitle2">Phone</Typography>
                  <Typography variant="body1" gutterBottom>{selectedAgent.phone}</Typography>
                </Grid>
                <Grid xs={12} md={6}>
                  <Typography variant="subtitle2">Level</Typography>
                  <Typography variant="body1" gutterBottom>{selectedAgent.level}</Typography>
                </Grid>
                <Grid xs={12} md={6}>
                  <Typography variant="subtitle2">Status</Typography>
                  <Chip
                    label={selectedAgent.status.charAt(0).toUpperCase() + selectedAgent.status.slice(1)}
                    color={
                      selectedAgent.status === 'active'
                        ? 'success'
                        : selectedAgent.status === 'pending'
                        ? 'warning'
                        : 'error'
                    }
                    size="small"
                  />
                </Grid>
                <Grid xs={12} md={6}>
                  <Typography variant="subtitle2">Players</Typography>
                  <Typography variant="body1" gutterBottom>{selectedAgent.players}</Typography>
                </Grid>
                <Grid xs={12} md={6}>
                  <Typography variant="subtitle2">Commission Rate</Typography>
                  <Typography variant="body1" gutterBottom>{selectedAgent.commission}%</Typography>
                </Grid>
                <Grid xs={12} md={6}>
                  <Typography variant="subtitle2">Total Earnings</Typography>
                  <Typography variant="body1" gutterBottom>₱{selectedAgent.earnings.toLocaleString()}</Typography>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseViewDialog}>Close</Button>
              <Button variant="contained" color="primary" startIcon={<EditIcon />}>
                Edit Agent
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </div>
  );
};

export default AgentManagement; 