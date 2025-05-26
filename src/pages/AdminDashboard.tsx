import React, { useState } from 'react';
import '../styles/AdminDashboard.css';

// Import icons
import PeopleIcon from '@mui/icons-material/People';
import CasinoIcon from '@mui/icons-material/Casino';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CampaignIcon from '@mui/icons-material/Campaign';
import SettingsIcon from '@mui/icons-material/Settings';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import BarChartIcon from '@mui/icons-material/BarChart';
import DashboardIcon from '@mui/icons-material/Dashboard';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  
  const renderDashboardContent = () => {
    return (
      <>
        <div className="welcome-section">
          <h1>Welcome back, Admin! 👋</h1>
          <p>{formattedDate}</p>
        </div>
        
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon users">
              <PeopleIcon />
            </div>
            <div className="stat-info">
              <h2>1,234</h2>
              <p>Total Users</p>
            </div>
            <div className="stat-trend positive">
              +12%
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon games">
              <CasinoIcon />
            </div>
            <div className="stat-info">
              <h2>45</h2>
              <p>Active Games</p>
            </div>
            <div className="stat-trend positive">
              +5%
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon revenue">
              <MonetizationOnIcon />
            </div>
            <div className="stat-info">
              <h2>₱123,456</h2>
              <p>Total Revenue</p>
            </div>
            <div className="stat-trend positive">
              +18%
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon promotions">
              <LocalOfferIcon />
            </div>
            <div className="stat-info">
              <h2>12</h2>
              <p>Active Promotions</p>
            </div>
            <div className="stat-trend positive">
              +2
            </div>
          </div>
        </div>
        
        <h2 className="section-title">Quick Actions</h2>
        <div className="quick-actions-grid">
          <div className="action-card">
            <div className="action-icon add-game">
              <AddCircleOutlineIcon />
            </div>
            <p>Add New Game</p>
          </div>
          
          <div className="action-card">
            <div className="action-icon add-user">
              <PersonAddIcon />
            </div>
            <p>Add New User</p>
          </div>
          
          <div className="action-card">
            <div className="action-icon create-promo">
              <CampaignIcon />
            </div>
            <p>Create Promotion</p>
          </div>
          
          <div className="action-card">
            <div className="action-icon settings">
              <SettingsIcon />
            </div>
            <p>Settings</p>
          </div>
        </div>
      </>
    );
  };
  
  const renderUserManagement = () => {
    return (
      <>
        <h1>User Management</h1>
        
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-info">
              <h2>1,234</h2>
              <p>Total Users</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-info">
              <h2>892</h2>
              <p>Active Users</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-info">
              <h2>156</h2>
              <p>New Users (This Month)</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-info">
              <h2>15</h2>
              <p>Suspended Users</p>
            </div>
          </div>
        </div>
        
        <div className="table-container">
          <div className="table-header">
            <div className="search-bar">
              <SearchIcon />
              <input type="text" placeholder="Search users..." />
            </div>
            <button className="add-button">
              <AddIcon /> Add User
            </button>
          </div>
          
          <table className="data-table">
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Status</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>john_doe</td>
                <td>john@example.com</td>
                <td><span className="status active">Active</span></td>
                <td>₱10,500.00</td>
              </tr>
              <tr>
                <td>maria_garcia</td>
                <td>maria@example.com</td>
                <td><span className="status active">Active</span></td>
                <td>₱25,750.00</td>
              </tr>
              <tr>
                <td>alex_smith</td>
                <td>alex@example.com</td>
                <td><span className="status suspended">Suspended</span></td>
                <td>₱5,200.00</td>
              </tr>
              <tr>
                <td>sarah_wong</td>
                <td>sarah@example.com</td>
                <td><span className="status active">Active</span></td>
                <td>₱15,300.00</td>
              </tr>
              <tr>
                <td>mike_johnson</td>
                <td>mike@example.com</td>
                <td><span className="status inactive">Inactive</span></td>
                <td>₱800.00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </>
    );
  };
  
  const renderGameManagement = () => {
    return (
      <>
        <h1>Game Management</h1>
        
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-info">
              <h2>45</h2>
              <p>Total Games</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-info">
              <h2>1,567</h2>
              <p>Active Players</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-info">
              <h2>₱2.5M</h2>
              <p>Total Bets Today</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-info">
              <h2>2</h2>
              <p>In Maintenance</p>
            </div>
          </div>
        </div>
        
        <div className="table-container">
          <div className="table-header">
            <div className="search-bar">
              <SearchIcon />
              <input type="text" placeholder="Search games..." />
            </div>
            <button className="add-button">
              <AddIcon /> Add Game
            </button>
          </div>
          
          <table className="data-table">
            <thead>
              <tr>
                <th>Game Name</th>
                <th>Category</th>
                <th>Provider</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Slots Paradise</td>
                <td>Slots</td>
                <td>Evolution Gaming</td>
                <td><span className="status active">Active</span></td>
              </tr>
              <tr>
                <td>Blackjack Pro</td>
                <td>Table Games</td>
                <td>Pragmatic Play</td>
                <td><span className="status active">Active</span></td>
              </tr>
              <tr>
                <td>Mega Roulette</td>
                <td>Table Games</td>
                <td>Evolution Gaming</td>
                <td><span className="status maintenance">Maintenance</span></td>
              </tr>
              <tr>
                <td>Lucky Fortune</td>
                <td>Slots</td>
                <td>NetEnt</td>
                <td><span className="status active">Active</span></td>
              </tr>
              <tr>
                <td>Dragon Baccarat</td>
                <td>Table Games</td>
                <td>Pragmatic Play</td>
                <td><span className="status inactive">Inactive</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </>
    );
  };

  const renderPromotions = () => {
    return (
      <>
        <h1>Promotions Management</h1>
        
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-info">
              <h2>12</h2>
              <p>Active Promotions</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-info">
              <h2>5</h2>
              <p>Upcoming Promotions</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-info">
              <h2>8</h2>
              <p>Expired Promotions</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-info">
              <h2>₱50K</h2>
              <p>Promotion Budget</p>
            </div>
          </div>
        </div>
        
        <div className="table-container">
          <div className="table-header">
            <div className="search-bar">
              <SearchIcon />
              <input type="text" placeholder="Search promotions..." />
            </div>
            <button className="add-button">
              <AddIcon /> Add Promotion
            </button>
          </div>
          
          <table className="data-table">
            <thead>
              <tr>
                <th>Promotion Name</th>
                <th>Type</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Welcome Bonus</td>
                <td>Deposit Bonus</td>
                <td>Permanent</td>
                <td>Permanent</td>
                <td><span className="status active">Active</span></td>
              </tr>
              <tr>
                <td>Weekend Cashback</td>
                <td>Cashback</td>
                <td>Every Friday</td>
                <td>Every Sunday</td>
                <td><span className="status active">Active</span></td>
              </tr>
              <tr>
                <td>Summer Special</td>
                <td>Free Spins</td>
                <td>Jun 1, 2023</td>
                <td>Aug 31, 2023</td>
                <td><span className="status inactive">Expired</span></td>
              </tr>
              <tr>
                <td>Holiday Giveaway</td>
                <td>Raffle</td>
                <td>Dec 1, 2023</td>
                <td>Dec 25, 2023</td>
                <td><span className="status active">Active</span></td>
              </tr>
              <tr>
                <td>Lunar New Year</td>
                <td>Deposit Bonus</td>
                <td>Jan 22, 2024</td>
                <td>Feb 5, 2024</td>
                <td><span className="status maintenance">Upcoming</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </>
    );
  };

  const renderReports = () => {
    return (
      <>
        <h1>Reports & Analytics</h1>
        
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-info">
              <h2>₱123,456</h2>
              <p>Monthly Revenue</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-info">
              <h2>₱45,678</h2>
              <p>Weekly Revenue</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-info">
              <h2>₱9,876</h2>
              <p>Daily Revenue</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-info">
              <h2>18.5%</h2>
              <p>Growth Rate</p>
            </div>
          </div>
        </div>
        
        <div className="report-section">
          <h2 className="section-title">Report Types</h2>
          <div className="quick-actions-grid">
            <div className="action-card">
              <div className="action-icon">
                <BarChartIcon />
              </div>
              <p>Financial Reports</p>
            </div>
            
            <div className="action-card">
              <div className="action-icon">
                <PeopleIcon />
              </div>
              <p>User Activity</p>
            </div>
            
            <div className="action-card">
              <div className="action-icon">
                <CasinoIcon />
              </div>
              <p>Game Performance</p>
            </div>
            
            <div className="action-card">
              <div className="action-icon">
                <LocalOfferIcon />
              </div>
              <p>Promotion Results</p>
            </div>
          </div>
        </div>
      </>
    );
  };
  
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return renderDashboardContent();
      case 'users':
        return renderUserManagement();
      case 'games':
        return renderGameManagement();
      case 'promotions':
        return renderPromotions();
      case 'reports':
        return renderReports();
      default:
        return <p>Content for {activeTab} will be implemented soon.</p>;
    }
  };
  
  return (
    <div className="admin-dashboard">
      <div className="admin-tabs">
        <button 
          className={`tab-button ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          <DashboardIcon /> Dashboard
        </button>
        <button 
          className={`tab-button ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          <PeopleIcon /> Users
        </button>
        <button 
          className={`tab-button ${activeTab === 'games' ? 'active' : ''}`}
          onClick={() => setActiveTab('games')}
        >
          <CasinoIcon /> Games
        </button>
        <button 
          className={`tab-button ${activeTab === 'promotions' ? 'active' : ''}`}
          onClick={() => setActiveTab('promotions')}
        >
          <LocalOfferIcon /> Promotions
        </button>
        <button 
          className={`tab-button ${activeTab === 'reports' ? 'active' : ''}`}
          onClick={() => setActiveTab('reports')}
        >
          <BarChartIcon /> Reports
        </button>
      </div>
      
      <div className="admin-content">
        {renderContent()}
      </div>
      
      <button className="save-button">Save Changes</button>
    </div>
  );
};

export default AdminDashboard; 