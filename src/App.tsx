import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import './App.css';

// Pages
import Home from './pages/Home';
import Casino from './pages/Casino';
import Slots from './pages/Slots';
import Promotions from './pages/Promotions';
import NotFound from './pages/NotFound';
import Account from './pages/Account';
import Registration from './pages/Registration';
import KYC from './pages/KYC';
import Wallet from './pages/Wallet';
import AgentManagement from './pages/AgentManagement';
import GameProviders from './pages/GameProviders';
import Reports from './pages/Reports';
import Bingo from './pages/Bingo';
import FAQ from './pages/FAQ';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import Download from './pages/Download';
import Support from './pages/Support';

// Admin Pages
import AdminLayout from './pages/AdminLayout';
import AdminDashboard from './pages/AdminDashboard';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import ConsentPopup from './components/ConsentPopup';

// Context
import { ConsentProvider, useConsent } from './contexts/ConsentContext';

// Icons
import HomeIcon from '@mui/icons-material/Home';
import CasinoIcon from '@mui/icons-material/Casino';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import PersonIcon from '@mui/icons-material/Person';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import GroupIcon from '@mui/icons-material/Group';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import GetAppIcon from '@mui/icons-material/GetApp';
import ShareIcon from '@mui/icons-material/Share';

// Mobile Navigation Component
const MobileNav = () => {
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false);
  
  const handleShare = () => {
    const title = 'Join MyCasino';
    const text = 'Join MyCasino and earn 50% commission on all players you refer! Start earning passive income today.';
    const url = window.location.origin + '?ref=' + Math.random().toString(36).substring(2, 10);
    
    if (navigator.share) {
      navigator.share({
        title: title,
        text: text,
        url: url,
      })
      .catch(error => console.log('Error sharing:', error));
    } else {
      // Fallback for browsers that don't support the Web Share API
      const shareText = encodeURIComponent(text + ' ' + url);
      
      // Try to detect mobile platforms for app-specific sharing
      const userAgent = navigator.userAgent.toLowerCase();
      
      if (userAgent.includes('android')) {
        // Android devices - primarily WhatsApp
        window.open(`https://wa.me/?text=${shareText}`, '_blank');
      } else if (userAgent.includes('iphone') || userAgent.includes('ipad')) {
        // iOS devices
        // Create a temporary input element to allow copying to clipboard
        const input = document.createElement('input');
        input.style.position = 'fixed';
        input.style.opacity = '0';
        input.value = text + ' ' + url;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
        
        alert('Link copied to clipboard! Share it with your friends to earn 50% commission on all their deposits.');
      } else {
        // Desktop fallback
        window.open(`https://web.whatsapp.com/send?text=${shareText}`, '_blank');
      }
    }
  };
  
  return (
    <>
      <div className="mobile-nav">
        <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
          <HomeIcon />
          <span>Home</span>
        </Link>
        <Link to="/slots" className={location.pathname.includes('/slots') ? 'active' : ''}>
          <VideogameAssetIcon />
          <span>Slots</span>
        </Link>
        <Link to="/casino" className={location.pathname.includes('/casino') ? 'active' : ''}>
          <CasinoIcon />
          <span>Casino</span>
        </Link>
        <Link to="/download" className={location.pathname.includes('/download') ? 'active' : ''}>
          <GetAppIcon />
          <span>Download</span>
        </Link>
        <button onClick={handleShare} className="share-button">
          <ShareIcon />
          <span>Share</span>
        </button>
      </div>
    </>
  );
};

// AppContent component to use the consent context
const AppContent = () => {
  const { showConsentPopup, setShowConsentPopup, setHasConsented } = useConsent();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const location = useLocation();

  // Check if the current route is an auth page or admin page
  const isAuthPage = ['/login', '/signup', '/forgot-password'].includes(location.pathname);
  const isAdminPage = location.pathname.startsWith('/admin');

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleProceed = () => {
    setHasConsented(true);
    setShowConsentPopup(false);
  };

  const handleExit = () => {
    // Redirect to another site or close the window
    window.location.href = 'https://www.google.com';
  };

  // Don't render the standard layout for admin pages
  if (isAdminPage) {
    return (
      <Routes>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="appearance" element={<div>Appearance Management</div>} />
          <Route path="content" element={<div>Content Management</div>} />
          <Route path="users" element={<div>User Management</div>} />
          <Route path="games" element={<div>Game Management</div>} />
          <Route path="casino" element={<div>Casino Games Management</div>} />
          <Route path="slots" element={<div>Slots Management</div>} />
          <Route path="promotions" element={<div>Promotions Management</div>} />
          <Route path="payments" element={<div>Payment Settings</div>} />
          <Route path="reports" element={<div>Reports & Analytics</div>} />
          <Route path="agents" element={<div>Agent Management</div>} />
          <Route path="terms" element={<div>Terms & Conditions</div>} />
          <Route path="settings" element={<div>System Settings</div>} />
        </Route>
      </Routes>
    );
  }

  return (
    <div className="app-container">
      {!isAuthPage && <Header />}
      <div className={`content-container ${isAuthPage ? 'auth-page' : ''}`}>
        {!isAuthPage && <Sidebar />}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/casino" element={<Casino />} />
            <Route path="/casino/:category" element={<Casino />} />
            <Route path="/slots" element={<Slots />} />
            <Route path="/bingo" element={<Bingo />} />
            <Route path="/poker" element={<NotFound />} />
            <Route path="/fishing" element={<NotFound />} />
            <Route path="/sport" element={<NotFound />} />
            <Route path="/specialty-game" element={<NotFound />} />
            <Route path="/promotions" element={<Promotions />} />
            <Route path="/account" element={<Account />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/kyc" element={<KYC />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/agent-management" element={<AgentManagement />} />
            <Route path="/game-providers" element={<GameProviders />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/support" element={<Support />} />
            <Route path="/download" element={<Download />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
      {!isAuthPage && (isMobile ? <MobileNav /> : <Footer />)}
      
      {/* Consent Popup */}
      {showConsentPopup && (
        <ConsentPopup onProceed={handleProceed} onExit={handleExit} />
      )}
    </div>
  );
};

function App() {
  return (
    <Router>
      <ConsentProvider>
        <AppContent />
      </ConsentProvider>
    </Router>
  );
}

export default App;
