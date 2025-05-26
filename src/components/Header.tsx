import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Header.css';

// Import icons
import HomeIcon from '@mui/icons-material/Home';
import CasinoIcon from '@mui/icons-material/Casino';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import TableBarIcon from '@mui/icons-material/TableBar';
import StreamIcon from '@mui/icons-material/Stream';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

// Import components
import Logo from './Logo';
import AuthModals from './AuthModals';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
  const [showAuth, setShowAuth] = useState(false);
  const [initialModal, setInitialModal] = useState<'login' | 'signup' | 'forgotPassword' | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation();
  const profileDropdownRef = useRef<HTMLDivElement>(null);
  
  // Mock user data - in a real app, this would come from your auth context
  const userData = {
    isLoggedIn: true,
    username: 'User',
    vipLevel: 'Player VIP',
    balance: '$1,250.00',
    avatar: null // Could be a URL to the user's avatar image
  };
  
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 1024);
      if (width > 1024) {
        setIsSearchOpen(false);
        setIsMenuOpen(false);
      }
    };
    
    // Call it once on mount
    handleResize();
    
    window.addEventListener('resize', handleResize);
    
    // Close dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousedown', handleClickOutside);
    }
  }, []);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsSearchOpen(false);
    setIsProfileOpen(false);
    
    // Toggle the sidebar active class
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
      sidebar.classList.toggle('active', !isMenuOpen);
    }
  };
  
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    setIsProfileOpen(false);
  };
  
  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
    setIsSearchOpen(false);
  };
  
  const closeMenu = () => {
    setIsMenuOpen(false);
    
    // Remove active class from sidebar
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
      sidebar.classList.remove('active');
    }
  };
  
  const isActive = (path: string) => {
    if (path === '/casino' && (location.pathname.includes('/slots') || location.pathname.includes('/casino'))) {
      return true;
    }
    return location.pathname === path;
  };

  const handleLogin = () => {
    setInitialModal('login');
    setShowAuth(true);
    closeMenu();
  };

  const handleSignup = () => {
    setInitialModal('signup');
    setShowAuth(true);
    closeMenu();
  };

  const closeAuth = () => {
    setShowAuth(false);
    setInitialModal(null);
  };

  const handleLogout = () => {
    // Handle logout logic here
    console.log('Logging out...');
    setIsProfileOpen(false);
  };

  return (
    <>
      <header className="header">
        <div className="header-container">
          {/* Left section with VIP Logo */}
          <div className="left-section">
            <div className="vip-logo-container">
              <Logo className="logo" />
            </div>
          </div>

          {/* Center section with YOUR LOGO - Now clickable to return home */}
          <div className="center-section">
            <Link to="/" className="center-logo-link">
              <div className="center-logo-text">
                YOUR LOGO
              </div>
            </Link>
          </div>

          {/* Right section with search and actions */}
          <div className="right-section">
            <div className={`search-toggle ${isSearchOpen ? 'active' : ''}`}>
              <button className="search-icon-btn" onClick={toggleSearch}>
                <SearchIcon />
              </button>
              <div className="search-container">
                <SearchIcon className="search-icon" />
                <input type="text" placeholder="Search games..." className="search-input" />
                <button className="search-button">Search</button>
              </div>
            </div>

            <div className="user-actions">
              {userData.isLoggedIn ? (
                <div className="profile-dropdown" ref={profileDropdownRef}>
                  <button 
                    className={`account-link profile-toggle ${isProfileOpen ? 'active' : ''}`} 
                    onClick={toggleProfile}
                  >
                    {userData.avatar ? (
                      <img 
                        src={userData.avatar} 
                        alt={userData.username} 
                        className="user-avatar-img" 
                      />
                    ) : (
                      <div className="profile-icon-wrapper">
                        <PersonIcon />
                        <span className="status-indicator online"></span>
                      </div>
                    )}
                  </button>
                  
                  {isProfileOpen && (
                    <div className="profile-dropdown-menu">
                      <div className="profile-header">
                        <div className="profile-avatar">
                          {userData.avatar ? (
                            <img src={userData.avatar} alt={userData.username} />
                          ) : (
                            <span className="avatar-placeholder">{userData.username.charAt(0)}</span>
                          )}
                        </div>
                        <div className="profile-info">
                          <div className="profile-name">{userData.username}</div>
                          <div className="profile-vip-status">{userData.vipLevel}</div>
                        </div>
                      </div>
                      
                      <div className="profile-balance">
                        <div className="balance-info">
                          <span className="balance-label">Balance</span>
                          <span className="balance-amount">{userData.balance}</span>
                        </div>
                        <button className="deposit-button">
                          <AddCircleOutlineIcon fontSize="small" />
                          <span>Deposit</span>
                        </button>
                      </div>
                      
                      <div className="profile-menu-items">
                        <Link to="/account" className="profile-menu-item" onClick={() => setIsProfileOpen(false)}>
                          <PersonIcon fontSize="small" />
                          <span>My Account</span>
                        </Link>
                        <Link to="/wallet" className="profile-menu-item" onClick={() => setIsProfileOpen(false)}>
                          <AccountBalanceWalletIcon fontSize="small" />
                          <span>My Wallet</span>
                        </Link>
                        <Link to="/rewards" className="profile-menu-item" onClick={() => setIsProfileOpen(false)}>
                          <EmojiEventsIcon fontSize="small" />
                          <span>My Rewards</span>
                        </Link>
                        <Link to="/settings" className="profile-menu-item" onClick={() => setIsProfileOpen(false)}>
                          <SettingsIcon fontSize="small" />
                          <span>Settings</span>
                        </Link>
                        <button className="profile-menu-item logout-button" onClick={handleLogout}>
                          <ExitToAppIcon fontSize="small" />
                          <span>Logout</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <button className="btn btn-text" onClick={handleLogin}>Log In</button>
                  <button className="btn btn-primary" onClick={handleSignup}>Sign Up</button>
                </>
              )}
              
              <Link to="/support" className="support-link">
                <HelpOutlineIcon />
              </Link>
              
              <button className="mobile-menu-toggle" onClick={toggleMenu}>
                {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Search Bar */}
        <div className={`mobile-search-container ${isSearchOpen ? 'active' : ''}`}>
          <div className="search-wrapper">
            <SearchIcon className="search-icon" />
            <input type="text" placeholder="Search games..." className="search-input" />
            <button className="search-button">Search</button>
            <button className="close-search" onClick={toggleSearch}>
              <CloseIcon />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && isMobile && (
        <div className="mobile-menu-overlay" onClick={closeMenu}></div>
      )}

      {/* Auth Modals */}
      {showAuth && (
        <AuthModals
          initialModal={initialModal}
          onClose={closeAuth}
        />
      )}
    </>
  );
};

export default Header;