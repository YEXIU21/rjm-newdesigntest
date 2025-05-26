import React, { useState } from 'react';
import '../styles/Account.css';

const Account: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  
  // Mock user data
  const userData = {
    username: 'User123',
    email: 'user@example.com',
    balance: 0.00,
    joinDate: '2025-01-15',
    avatar: 'https://via.placeholder.com/100',
    lastLogin: '2025-05-01 14:30',
    level: 1,
    points: 25
  };

  return (
    <div className="account-page">
      <div className="account-header">
        <div className="user-avatar">
          <img src={userData.avatar} alt="User Avatar" />
        </div>
        <div className="user-info">
          <h1 className="username">{userData.username}</h1>
          <p className="user-email">{userData.email}</p>
          <div className="user-stats">
            <div className="stat-item">
              <span className="stat-label">Balance</span>
              <span className="stat-value">${userData.balance.toFixed(2)}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Level</span>
              <span className="stat-value">{userData.level}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Points</span>
              <span className="stat-value">{userData.points}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="account-tabs">
        <div 
          className={`account-tab ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          <i className="material-icons">person</i>
          <span>Profile</span>
        </div>
        <div 
          className={`account-tab ${activeTab === 'wallet' ? 'active' : ''}`}
          onClick={() => setActiveTab('wallet')}
        >
          <i className="material-icons">account_balance_wallet</i>
          <span>Wallet</span>
        </div>
        <div 
          className={`account-tab ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          <i className="material-icons">history</i>
          <span>History</span>
        </div>
        <div 
          className={`account-tab ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          <i className="material-icons">settings</i>
          <span>Settings</span>
        </div>
      </div>

      <div className="account-content">
        {activeTab === 'profile' && (
          <div className="profile-section">
            <div className="card">
              <h2 className="section-title">Personal Information</h2>
              <div className="profile-details">
                <div className="profile-item">
                  <span className="item-label">Username</span>
                  <span className="item-value">{userData.username}</span>
                </div>
                <div className="profile-item">
                  <span className="item-label">Email</span>
                  <span className="item-value">{userData.email}</span>
                </div>
                <div className="profile-item">
                  <span className="item-label">Joined</span>
                  <span className="item-value">{userData.joinDate}</span>
                </div>
                <div className="profile-item">
                  <span className="item-label">Last Login</span>
                  <span className="item-value">{userData.lastLogin}</span>
                </div>
              </div>
              <button className="btn btn-primary">Edit Profile</button>
            </div>
            
            <div className="card">
              <h2 className="section-title">Security</h2>
              <div className="security-options">
                <button className="btn btn-secondary">Change Password</button>
                <button className="btn btn-secondary">Enable 2FA</button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'wallet' && (
          <div className="wallet-section">
            <div className="card">
              <h2 className="section-title">Balance</h2>
              <div className="balance-display">
                <span className="balance-amount">${userData.balance.toFixed(2)}</span>
                <div className="balance-actions">
                  <button className="btn btn-primary">
                    <i className="material-icons">add</i>
                    Deposit
                  </button>
                  <button className="btn btn-secondary">
                    <i className="material-icons">call_made</i>
                    Withdraw
                  </button>
                </div>
              </div>
            </div>
            
            <div className="card">
              <h2 className="section-title">Payment Methods</h2>
              <div className="payment-methods-list">
                <div className="empty-state">
                  <i className="material-icons">credit_card</i>
                  <p>No payment methods added yet</p>
                  <button className="btn btn-primary">Add Payment Method</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="history-section">
            <div className="card">
              <h2 className="section-title">Bet History</h2>
              <div className="empty-state">
                <i className="material-icons">history</i>
                <p>No betting history available</p>
              </div>
            </div>
            
            <div className="card">
              <h2 className="section-title">Transaction History</h2>
              <div className="empty-state">
                <i className="material-icons">receipt_long</i>
                <p>No transactions yet</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="settings-section">
            <div className="card">
              <h2 className="section-title">Preferences</h2>
              <div className="setting-item">
                <div className="setting-info">
                  <span className="setting-name">Notifications</span>
                  <span className="setting-description">Receive updates about promotions and offers</span>
                </div>
                <label className="switch">
                  <input type="checkbox" defaultChecked />
                  <span className="slider"></span>
                </label>
              </div>
              
              <div className="setting-item">
                <div className="setting-info">
                  <span className="setting-name">Dark Mode</span>
                  <span className="setting-description">Toggle between light and dark theme</span>
                </div>
                <label className="switch">
                  <input type="checkbox" defaultChecked />
                  <span className="slider"></span>
                </label>
              </div>
              
              <div className="setting-item">
                <div className="setting-info">
                  <span className="setting-name">Language</span>
                  <span className="setting-description">Choose your preferred language</span>
                </div>
                <select className="language-select">
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                </select>
              </div>
            </div>
            
            <div className="card">
              <h2 className="section-title">Responsible Gaming</h2>
              <div className="responsible-gaming-options">
                <button className="btn btn-secondary">Set Deposit Limits</button>
                <button className="btn btn-secondary">Set Gaming Limits</button>
                <button className="btn btn-secondary">Self-Exclusion</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Account; 