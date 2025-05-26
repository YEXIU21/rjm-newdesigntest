import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/AdminSidebar.css';

// Import icons
import DashboardIcon from '@mui/icons-material/Dashboard';
import PaletteIcon from '@mui/icons-material/Palette';
import EditIcon from '@mui/icons-material/Edit';
import PeopleIcon from '@mui/icons-material/People';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import PaymentsIcon from '@mui/icons-material/Payments';
import InsightsIcon from '@mui/icons-material/Insights';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import CasinoIcon from '@mui/icons-material/Casino';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';

const AdminSidebar: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  const isActive = (path: string) => {
    return currentPath.includes(path);
  };
  
  const handleLogout = () => {
    // Handle logout logic here
    console.log('Logging out...');
  };
  
  return (
    <aside className="admin-sidebar">
      <div className="sidebar-header">
        <div className="logo-placeholder">
          MyCasino
        </div>
        <h2 className="admin-title">Admin Panel</h2>
      </div>
      
      <nav className="sidebar-nav">
        <ul className="nav-list">
          <li className={isActive('/admin/dashboard') ? 'active' : ''}>
            <Link to="/admin/dashboard">
              <DashboardIcon className="nav-icon" />
              <span>Dashboard</span>
            </Link>
          </li>
          <li className={isActive('/admin/appearance') ? 'active' : ''}>
            <Link to="/admin/appearance">
              <PaletteIcon className="nav-icon" />
              <span>Appearance</span>
            </Link>
          </li>
          <li className={isActive('/admin/content') ? 'active' : ''}>
            <Link to="/admin/content">
              <EditIcon className="nav-icon" />
              <span>Content Management</span>
            </Link>
          </li>
          <li className={isActive('/admin/users') ? 'active' : ''}>
            <Link to="/admin/users">
              <PeopleIcon className="nav-icon" />
              <span>User Management</span>
            </Link>
          </li>
          <li className={isActive('/admin/games') ? 'active' : ''}>
            <Link to="/admin/games">
              <SportsEsportsIcon className="nav-icon" />
              <span>Game Management</span>
            </Link>
          </li>
          <li className={isActive('/admin/casino') ? 'active' : ''}>
            <Link to="/admin/casino">
              <CasinoIcon className="nav-icon" />
              <span>Casino Games</span>
            </Link>
          </li>
          <li className={isActive('/admin/slots') ? 'active' : ''}>
            <Link to="/admin/slots">
              <VideogameAssetIcon className="nav-icon" />
              <span>Slots Management</span>
            </Link>
          </li>
          <li className={isActive('/admin/promotions') ? 'active' : ''}>
            <Link to="/admin/promotions">
              <LocalOfferIcon className="nav-icon" />
              <span>Promotions</span>
            </Link>
          </li>
          <li className={isActive('/admin/payments') ? 'active' : ''}>
            <Link to="/admin/payments">
              <PaymentsIcon className="nav-icon" />
              <span>Payment Settings</span>
            </Link>
          </li>
          <li className={isActive('/admin/reports') ? 'active' : ''}>
            <Link to="/admin/reports">
              <InsightsIcon className="nav-icon" />
              <span>Reports & Analytics</span>
            </Link>
          </li>
          <li className={isActive('/admin/agents') ? 'active' : ''}>
            <Link to="/admin/agents">
              <SupervisorAccountIcon className="nav-icon" />
              <span>Agent Management</span>
            </Link>
          </li>
          <li className={isActive('/admin/terms') ? 'active' : ''}>
            <Link to="/admin/terms">
              <MenuBookIcon className="nav-icon" />
              <span>Terms & Conditions</span>
            </Link>
          </li>
          <li className={isActive('/admin/settings') ? 'active' : ''}>
            <Link to="/admin/settings">
              <SettingsIcon className="nav-icon" />
              <span>System Settings</span>
            </Link>
          </li>
        </ul>
      </nav>
      
      <div className="sidebar-footer">
        <div className="version-info">Admin Version 1.0</div>
        <button className="logout-button" onClick={handleLogout}>
          <LogoutIcon className="logout-icon" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar; 