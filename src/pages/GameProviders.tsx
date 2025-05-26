import React, { useState } from 'react';
import {
  Typography,
  Paper,
  Box,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Divider,
  SelectChangeEvent,
  Tabs,
  Tab,
  InputAdornment,
  CardActions
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import AddIcon from '@mui/icons-material/Add';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import CasinoIcon from '@mui/icons-material/Casino';
import SearchIcon from '@mui/icons-material/Search';
import CheckIcon from '@mui/icons-material/Check';
import PauseIcon from '@mui/icons-material/Pause';
import '../styles/GameProviders.css';

interface GameProvider {
  id: string;
  name: string;
  logo: string;
  status: 'active' | 'inactive' | 'pending' | 'maintenance';
  gamesCount: number;
  apiKey?: string;
  secretKey?: string;
  endpoint?: string;
  integration: {
    wallet: boolean;
    authentication: boolean;
    reporting: boolean;
  };
}

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
      id={`provider-tabpanel-${index}`}
      aria-labelledby={`provider-tab-${index}`}
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

const GameProviders = () => {
  const [tabValue, setTabValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [providers, setProviders] = useState<GameProvider[]>([
    {
      id: 'provider1',
      name: 'Evolution Gaming',
      logo: 'https://via.placeholder.com/200x100?text=Evolution',
      status: 'active',
      gamesCount: 87,
      apiKey: 'evo_live_12345abcde',
      secretKey: '********',
      endpoint: 'https://api.evolution.com/v2',
      integration: {
        wallet: true,
        authentication: true,
        reporting: true
      }
    },
    {
      id: 'provider2',
      name: 'Pragmatic Play',
      logo: 'https://via.placeholder.com/200x100?text=Pragmatic',
      status: 'active',
      gamesCount: 156,
      apiKey: 'pp_slots_67890fghij',
      secretKey: '********',
      endpoint: 'https://api.pragmaticplay.com/v1',
      integration: {
        wallet: true,
        authentication: true,
        reporting: true
      }
    },
    {
      id: 'provider3',
      name: 'Microgaming',
      logo: 'https://via.placeholder.com/200x100?text=Microgaming',
      status: 'inactive',
      gamesCount: 0,
      integration: {
        wallet: false,
        authentication: false,
        reporting: false
      }
    },
    {
      id: 'provider4',
      name: 'NetEnt',
      logo: 'https://via.placeholder.com/200x100?text=NetEnt',
      status: 'pending',
      gamesCount: 0,
      apiKey: 'netent_98765zyxwv',
      endpoint: 'https://api.netent.com/v3',
      integration: {
        wallet: true,
        authentication: false,
        reporting: false
      }
    }
  ]);

  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openConfigDialog, setOpenConfigDialog] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<GameProvider | null>(null);
  const [newProvider, setNewProvider] = useState({
    name: '',
    logo: '',
    apiKey: '',
    secretKey: '',
    endpoint: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleOpenAddDialog = () => {
    setOpenAddDialog(true);
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
    setNewProvider({
      name: '',
      logo: '',
      apiKey: '',
      secretKey: '',
      endpoint: ''
    });
  };

  const handleOpenConfigDialog = (provider: GameProvider) => {
    setSelectedProvider(provider);
    setOpenConfigDialog(true);
  };

  const handleCloseConfigDialog = () => {
    setOpenConfigDialog(false);
    setSelectedProvider(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProvider({
      ...newProvider,
      [name]: value
    });
  };

  const handleAddProvider = () => {
    const newProviderData: GameProvider = {
      id: `provider${providers.length + 1}`,
      name: newProvider.name,
      logo: newProvider.logo || `https://via.placeholder.com/200x100?text=${newProvider.name}`,
      status: 'pending',
      gamesCount: 0,
      apiKey: newProvider.apiKey,
      secretKey: newProvider.secretKey,
      endpoint: newProvider.endpoint,
      integration: {
        wallet: false,
        authentication: false,
        reporting: false
      }
    };
    
    setProviders([...providers, newProviderData]);
    handleCloseAddDialog();
    setShowSuccess(true);
    
    // Hide success message after 5 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 5000);
  };

  const handleToggleStatus = (providerId: string) => {
    setProviders(
      providers.map(provider => {
        if (provider.id === providerId) {
          const newStatus = provider.status === 'active' ? 'inactive' : 'active';
          return {
            ...provider,
            status: newStatus
          };
        }
        return provider;
      })
    );
  };

  const handleIntegrationToggle = (
    providerId: string,
    feature: 'wallet' | 'authentication' | 'reporting'
  ) => {
    setProviders(
      providers.map(provider => {
        if (provider.id === providerId) {
          return {
            ...provider,
            integration: {
              ...provider.integration,
              [feature]: !provider.integration[feature]
            }
          };
        }
        return provider;
      })
    );
  };

  const featuredProviders = providers.filter(provider => provider.status === 'active');
  const maintenanceProviders = providers.filter(provider => provider.status === 'maintenance');
  const pendingProviders = providers.filter(provider => provider.status === 'pending');

  const getProvidersByTab = (tabIndex: number) => {
    switch (tabIndex) {
      case 0:
        return featuredProviders;
      case 1:
        return maintenanceProviders;
      case 2:
        return pendingProviders;
      default:
        return providers;
    }
  };

  const filteredProviders = getProvidersByTab(tabValue)
    .filter(provider => 
      provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      provider.status.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckIcon className="status-icon active" />;
      case 'maintenance':
        return <PauseIcon className="status-icon maintenance" />;
      default:
        return undefined;
    }
  };

  const getStatusLabel = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <div className="game-providers-container">
      <Paper elevation={3} className="game-providers-paper">
        <Box className="game-providers-header">
          <CasinoIcon className="game-providers-icon" />
          <Typography variant="h4" component="h1" className="game-providers-title">
            Game Providers
          </Typography>
        </Box>

        <Box className="search-and-tabs">
          <TextField
            className="provider-search"
            placeholder="Search providers or games"
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />

          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="provider tabs"
            className="provider-tabs"
          >
            <Tab label="Featured" />
            <Tab label="Active" />
            <Tab label="Maintenance" />
            <Tab label="Coming Soon" />
          </Tabs>
        </Box>

        <Box className="providers-container">
          <Grid container spacing={3} className="providers-grid">
            {filteredProviders.map(provider => (
              <Grid xs={12} sm={6} md={4} key={provider.id}>
                <Card className={`provider-card ${provider.status}`}>
                  <CardMedia
                    component="img"
                    height="100"
                    image={provider.logo}
                    alt={provider.name}
                    className="provider-logo"
                  />
                  <CardContent>
                    <Box className="provider-header">
                      <Typography variant="h6" component="h2">
                        {provider.name}
                      </Typography>
                      <Chip
                        label={getStatusLabel(provider.status)}
                        size="small"
                        className={`status-chip ${provider.status}`}
                        icon={getStatusIcon(provider.status)}
                      />
                    </Box>
                    <Typography variant="body2" color="text.secondary" className="provider-description">
                      {provider.status === 'active' ? 'Leading provider of mobile-focused, innovative casino games.' : ''}
                    </Typography>
                    <Box className="provider-stats">
                      <Typography variant="body2">
                        <strong>{provider.gamesCount}</strong> games
                      </Typography>
                    </Box>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      variant="contained"
                      disabled={provider.status !== 'active'}
                      fullWidth
                    >
                      View Games
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
          
          {filteredProviders.length === 0 && (
            <Box className="no-results">
              <Typography variant="h6">
                No providers found matching your search
              </Typography>
              <Button variant="outlined" onClick={() => setSearchQuery('')}>
                Clear Search
              </Button>
            </Box>
          )}
        </Box>
      </Paper>

      {/* Add Provider Dialog */}
      <Dialog open={openAddDialog} onClose={handleCloseAddDialog} maxWidth="md" fullWidth>
        <DialogTitle>Add New Game Provider</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Provider Name"
            name="name"
            value={newProvider.name}
            onChange={handleInputChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Logo URL"
            name="logo"
            value={newProvider.logo}
            onChange={handleInputChange}
            margin="normal"
            helperText="Leave blank to use a placeholder logo"
          />
          <TextField
            fullWidth
            label="API Key"
            name="apiKey"
            value={newProvider.apiKey}
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Secret Key"
            name="secretKey"
            value={newProvider.secretKey}
            onChange={handleInputChange}
            margin="normal"
            type="password"
          />
          <TextField
            fullWidth
            label="API Endpoint"
            name="endpoint"
            value={newProvider.endpoint}
            onChange={handleInputChange}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddDialog}>Cancel</Button>
          <Button
            onClick={handleAddProvider}
            variant="contained"
            color="primary"
            disabled={!newProvider.name}
          >
            Add Provider
          </Button>
        </DialogActions>
      </Dialog>

      {/* Configure Provider Dialog */}
      {selectedProvider && (
        <Dialog open={openConfigDialog} onClose={handleCloseConfigDialog} maxWidth="md" fullWidth>
          <DialogTitle>Configure {selectedProvider.name}</DialogTitle>
          <DialogContent>
            <Typography variant="subtitle1" gutterBottom>
              API Configuration
            </Typography>
            <TextField
              fullWidth
              label="API Key"
              value={selectedProvider.apiKey || ''}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Secret Key"
              value={selectedProvider.secretKey ? '********' : ''}
              margin="normal"
              type="password"
            />
            <TextField
              fullWidth
              label="API Endpoint"
              value={selectedProvider.endpoint || ''}
              margin="normal"
            />
            
            <Typography variant="subtitle1" gutterBottom sx={{ mt: 3 }}>
              Integration Features
            </Typography>
            <Box className="integration-toggles">
              <Box className="integration-toggle">
                <Typography>Wallet Integration:</Typography>
                <Button
                  variant={selectedProvider.integration.wallet ? 'contained' : 'outlined'}
                  color={selectedProvider.integration.wallet ? 'success' : 'primary'}
                  onClick={() => handleIntegrationToggle(selectedProvider.id, 'wallet')}
                >
                  {selectedProvider.integration.wallet ? 'Enabled' : 'Disabled'}
                </Button>
              </Box>
              <Box className="integration-toggle">
                <Typography>Authentication:</Typography>
                <Button
                  variant={selectedProvider.integration.authentication ? 'contained' : 'outlined'}
                  color={selectedProvider.integration.authentication ? 'success' : 'primary'}
                  onClick={() => handleIntegrationToggle(selectedProvider.id, 'authentication')}
                >
                  {selectedProvider.integration.authentication ? 'Enabled' : 'Disabled'}
                </Button>
              </Box>
              <Box className="integration-toggle">
                <Typography>Reporting:</Typography>
                <Button
                  variant={selectedProvider.integration.reporting ? 'contained' : 'outlined'}
                  color={selectedProvider.integration.reporting ? 'success' : 'primary'}
                  onClick={() => handleIntegrationToggle(selectedProvider.id, 'reporting')}
                >
                  {selectedProvider.integration.reporting ? 'Enabled' : 'Disabled'}
                </Button>
              </Box>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseConfigDialog}>Close</Button>
            <Button variant="contained" color="primary" onClick={handleCloseConfigDialog}>
              Save Changes
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default GameProviders; 