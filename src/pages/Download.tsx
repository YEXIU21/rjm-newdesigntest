import React, { useState, useEffect, useCallback, useRef } from 'react';
import '../styles/Download.css';
import AndroidIcon from '@mui/icons-material/Android';
import AppleIcon from '@mui/icons-material/Apple';
import GetAppIcon from '@mui/icons-material/GetApp';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import DownloadIcon from '@mui/icons-material/Download';
import DevicesIcon from '@mui/icons-material/Devices';
import QrCodeIcon from '@mui/icons-material/QrCode';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CircularProgress from '@mui/material/CircularProgress';

// Extend Window interface to include our custom properties
declare global {
  interface Window {
    deferredPrompt: any;
    PWAInstallDebug?: boolean;
  }
}

// Add interface for iOS navigator
interface NavigatorWithStandalone extends Navigator {
  standalone?: boolean;
}

const Download: React.FC = () => {
  const [isAndroid, setIsAndroid] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [installStatus, setInstallStatus] = useState('');
  const [showIOSInstructions, setShowIOSInstructions] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);

  // Debug logger
  const debugLog = useCallback((message: string, data?: any) => {
    if (window.PWAInstallDebug) {
      if (data) {
        console.log(`[PWA Install] ${message}`, data);
      } else {
        console.log(`[PWA Install] ${message}`);
      }
    }
  }, []);

  // Scroll to top when redirected from home page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Function to ensure service worker is registered
  const ensureServiceWorkerRegistered = useCallback(async () => {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.register('/service-worker.js', {
          scope: '/',
          updateViaCache: 'none'
        });
        debugLog('Service Worker registered with scope:', registration.scope);
        
        // Force update the service worker
        registration.update();
        
        return true;
      } catch (error) {
        console.error('Service Worker registration failed:', error);
        return false;
      }
    }
    return false;
  }, [debugLog]);

  useEffect(() => {
    // Check device type
    const userAgent = navigator.userAgent || navigator.vendor;
    const isAndroidDevice = /android/i.test(userAgent);
    const isIOSDevice = /iPad|iPhone|iPod/.test(userAgent);
    
    setIsAndroid(isAndroidDevice);
    setIsIOS(isIOSDevice);

    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches || 
        (window.navigator as NavigatorWithStandalone).standalone === true) {
      setInstallStatus('installed');
      debugLog('App is already installed (standalone mode)');
    }

    // Ensure service worker is registered
    ensureServiceWorkerRegistered();

    // Check if we already have a stored prompt
    if (window.deferredPrompt) {
      setInstallStatus('available');
      debugLog('Existing deferred prompt found');
    }

    // Listen for appinstalled event
    const handleAppInstalled = () => {
      debugLog('App was installed successfully');
      setInstallStatus('installed');
      setIsInstalling(false);
    };

    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, [ensureServiceWorkerRegistered, debugLog]);

  const handleInstallApp = async () => {
    debugLog('Install button clicked', { 
      deferredPrompt: !!window.deferredPrompt, 
      isIOS, 
      installStatus 
    });
    
    // For iOS devices, show iOS-specific instructions
    if (isIOS) {
      setShowIOSInstructions(true);
      return;
    }
    
    // If already installed, don't do anything
    if (installStatus === 'installed') {
      return;
    }
    
    setIsInstalling(true);
    
    // Check if browser's PWA installation is available via global deferredPrompt
    if (window.deferredPrompt) {
      try {
        debugLog('Showing installation prompt');
        
        // Show the install prompt
        window.deferredPrompt.prompt();
        setInstallStatus('prompting');
        
        // Wait for the user to respond to the prompt
        const { outcome } = await window.deferredPrompt.userChoice;
        debugLog('Installation choice:', outcome);
        
        if (outcome === 'accepted') {
          setInstallStatus('installing');
          debugLog('User accepted the install prompt');
          
          // Add a small delay to allow the installation to complete
          setTimeout(() => {
            setInstallStatus('installed');
            setIsInstalling(false);
          }, 2000);
        } else {
          setInstallStatus('rejected');
          setIsInstalling(false);
          debugLog('User dismissed the install prompt');
        }
        
        // Clear the saved prompt since it can't be used again
        window.deferredPrompt = null;
      } catch (error) {
        console.error('Installation error:', error);
        setIsInstalling(false);
        setInstallStatus('manual');
      }
    } else {
      // No installation prompt available, show manual instructions
      debugLog('No installation prompt available, showing manual instructions');
      setIsInstalling(false);
      setInstallStatus('manual');
    }
  };

  const renderInstallStatus = () => {
    switch (installStatus) {
      case 'installed':
        return (
          <div className="install-status success">
            <CheckCircleIcon className="status-icon" />
            <p>App is already installed on your device!</p>
            <p>You can access it from your home screen.</p>
          </div>
        );
      case 'installing':
        return (
          <div className="install-status info">
            <CircularProgress size={24} className="status-icon" />
            <p>Installing app...</p>
            <p>The app will be available on your home screen once installation completes.</p>
          </div>
        );
      case 'rejected':
        return (
          <div className="install-status warning">
            <p>⚠️ Installation was cancelled.</p>
            <p>You can try again when you're ready.</p>
          </div>
        );
      case 'manual':
        return (
          <div className="install-instructions-modal">
            <div className="install-instructions-content">
              <h3>Manual Installation</h3>
              {isAndroid ? (
                <>
                  <div className="steps-container">
                    <div className="step">
                      <div className="step-number">1</div>
                      <p>Tap the menu button (three dots) in your browser</p>
                    </div>
                    <div className="step">
                      <div className="step-number">2</div>
                      <p>Select "Install App" or "Add to Home Screen"</p>
                    </div>
                    <div className="step">
                      <div className="step-number">3</div>
                      <p>Follow the on-screen instructions to complete installation</p>
                    </div>
                  </div>
                  <button className="ok-button" onClick={() => setInstallStatus('')}>OK</button>
                </>
              ) : (
                <>
                  <div className="steps-container">
                    <div className="step">
                      <div className="step-number">1</div>
                      <p>Tap the Share button at the bottom of your browser</p>
                    </div>
                    <div className="step">
                      <div className="step-number">2</div>
                      <p>Scroll down and select "Add to Home Screen"</p>
                    </div>
                    <div className="step">
                      <div className="step-number">3</div>
                      <p>Tap "Add" in the top right corner to complete installation</p>
                    </div>
                  </div>
                  <button className="ok-button" onClick={() => setInstallStatus('')}>OK</button>
                </>
              )}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  // iOS instructions modal
  const renderIOSInstructions = () => {
    if (!showIOSInstructions) return null;
    
    return (
      <div className="install-instructions-modal">
        <div className="install-instructions-content ios">
          <h3>Install on iOS</h3>
          <div className="steps-container">
            <div className="step">
              <div className="step-number">1</div>
              <p>Tap the Share button <span className="ios-share-icon">⎙</span> at the bottom of your browser</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <p>Scroll down and select "Add to Home Screen"</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <p>Tap "Add" in the top right corner to complete installation</p>
            </div>
          </div>
          <div className="ios-note">
            <InfoOutlinedIcon className="info-icon" />
            <p>iOS requires these steps to install web apps. Once installed, the app will appear on your home screen.</p>
          </div>
          <button className="ok-button" onClick={() => setShowIOSInstructions(false)}>OK</button>
        </div>
      </div>
    );
  };

  return (
    <div className="download-page">
      <div className="download-header">
        <GetAppIcon className="download-icon" />
        <h1>Download RJM Casino App</h1>
        <p>Get the best gaming experience with our mobile app</p>
      </div>

      <div className="download-unified">
        <div className="download-card unified">
          <DevicesIcon className="platform-icon unified" />
          <h2>Install App</h2>
          <p>Download our app for your device</p>
          <button 
            className={`download-button unified-button ${isInstalling ? 'installing' : ''}`}
            onClick={handleInstallApp}
            disabled={installStatus === 'installing' || installStatus === 'installed'}
          >
            {isInstalling ? (
              <CircularProgress size={24} color="inherit" className="button-icon" />
            ) : installStatus === 'installed' ? (
              <CheckCircleIcon className="button-icon" />
            ) : (
              <DownloadIcon className="button-icon" />
            )}
            {installStatus === 'installed' 
              ? 'Installed' 
              : isInstalling 
                ? 'Installing...' 
                : 'Download App'}
          </button>
          
          {installStatus === 'installed' && (
            <p className="success-message">
              <CheckCircleIcon fontSize="small" /> 
              Successfully installed! Open from your home screen
            </p>
          )}
          
          {installStatus === '' && !isIOS && !window.deferredPrompt && (
            <p className="browser-support-note">
              <InfoOutlinedIcon fontSize="small" className="info-icon" />
              Your browser may require manual installation
            </p>
          )}
        </div>
      </div>

      {/* Installation status message */}
      {renderInstallStatus()}
      {renderIOSInstructions()}

      {/* Device info section - keep existing */}
      <div className="device-info-section">
        <div className="device-info-card">
          <AndroidIcon className="platform-icon android" />
          <h3>Android</h3>
          <div className="device-info-content">
            <p>Works on Chrome, Edge, Samsung Internet and other Android browsers</p>
            <p>Install directly from your browser to get the full app experience</p>
          </div>
        </div>

        <div className="device-info-card">
          <AppleIcon className="platform-icon ios" />
          <h3>iOS</h3>
          <div className="device-info-content">
            <p>Works on Safari browser on iOS 13 and above</p>
            <p>Follow the simple instructions to add to your home screen</p>
          </div>
        </div>
      </div>

      <div className="download-benefits">
        <h3>Benefits of our App</h3>
        <ul>
          <li>Faster loading times</li>
          <li>Smoother gaming experience</li>
          <li>Quick access from your home screen</li>
          <li>Native app-like experience</li>
          <li>Receive notifications for promotions</li>
          <li>Better performance than browser version</li>
        </ul>
      </div>
    </div>
  );
};

export default Download;