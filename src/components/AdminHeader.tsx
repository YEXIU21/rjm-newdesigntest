import React, { useState } from 'react';
import '../styles/AdminHeader.css';

// Import icons
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import HelpIcon from '@mui/icons-material/Help';
import SearchIcon from '@mui/icons-material/Search';
import CasinoIcon from '@mui/icons-material/Casino';

interface AdminHeaderProps {
  toggleSidebar: () => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ toggleSidebar }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  
  const notifications = [
    { id: 1, message: 'New user registration', time: '2 minutes ago' },
    { id: 2, message: 'Casino deposit processed', time: '1 hour ago' },
    { id: 3, message: 'New jackpot winner!', time: '3 hours ago' },
    { id: 4, message: 'System update available', time: '6 hours ago' }
  ];
  
  const handleNotificationsToggle = () => {
    setShowNotifications(!showNotifications);
  };
  
  const handleSearchToggle = () => {
    setShowSearch(!showSearch);
  };
  
  return (
    <header className="admin-header">
      <div className="header-left">
        <button className="menu-toggle" onClick={toggleSidebar}>
          <MenuIcon />
        </button>
        <div className="header-title">
          <h1><CasinoIcon /> MyCasino Admin</h1>
          <p>Casino Management System</p>
        </div>
      </div>
      
      <div className="header-actions">
        <button className="header-action-button" onClick={handleSearchToggle}>
          <SearchIcon />
        </button>
        
        {showSearch && (
          <div className="search-dropdown">
            <div className="global-search-bar">
              <SearchIcon />
              <input type="text" placeholder="Search anything..." autoFocus />
            </div>
          </div>
        )}
        
        <div className="notification-container">
          <button 
            className="notification-button" 
            onClick={handleNotificationsToggle}
          >
            <NotificationsIcon />
            <span className="notification-badge">4</span>
          </button>
          
          {showNotifications && (
            <div className="notification-dropdown">
              <h3>Notifications</h3>
              <ul className="notification-list">
                {notifications.map(notification => (
                  <li key={notification.id} className="notification-item">
                    <p className="notification-message">{notification.message}</p>
                    <span className="notification-time">{notification.time}</span>
                  </li>
                ))}
              </ul>
              <button className="mark-all-read">Mark all as read</button>
            </div>
          )}
        </div>
        
        <button className="header-action-button">
          <HelpIcon />
        </button>
        
        <button className="header-action-button">
          <SettingsIcon />
        </button>
        
        <div className="admin-profile">
          <button className="profile-button">
            <PersonIcon />
            <span>Admin</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader; 