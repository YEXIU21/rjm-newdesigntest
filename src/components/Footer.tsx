import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

// Import Material UI icons
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import PaymentIcon from '@mui/icons-material/Payment';
import SecurityIcon from '@mui/icons-material/Security';
import HelpIcon from '@mui/icons-material/Help';
import InfoIcon from '@mui/icons-material/Info';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
        <div className="footer-section">
            <h3 className="footer-heading">Casino</h3>
          <ul className="footer-links">
              <li><Link to="/slots">Slots</Link></li>
              <li><Link to="/casino/table-games">Table Games</Link></li>
              <li><Link to="/casino/live-casino">Live Casino</Link></li>
              <li><Link to="/casino/poker">Poker</Link></li>
              <li><Link to="/casino/jackpots">Jackpots</Link></li>
          </ul>
        </div>

        <div className="footer-section">
            <h3 className="footer-heading">Account</h3>
          <ul className="footer-links">
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
              <li><Link to="/account">My Account</Link></li>
              <li><Link to="/account/wallet">Wallet</Link></li>
              <li><Link to="/account/history">History</Link></li>
          </ul>
        </div>

        <div className="footer-section">
            <h3 className="footer-heading">Support</h3>
          <ul className="footer-links">
              <li><Link to="/support"><HelpIcon className="footer-icon" /> Help Center</Link></li>
              <li><Link to="/faq"><InfoIcon className="footer-icon" /> FAQ</Link></li>
              <li><Link to="/contact"><EmailIcon className="footer-icon" /> Contact Us</Link></li>
              <li><Link to="/terms"><SecurityIcon className="footer-icon" /> Terms & Conditions</Link></li>
              <li><Link to="/responsible-gaming"><VerifiedUserIcon className="footer-icon" /> Responsible Gaming</Link></li>
          </ul>
        </div>

        <div className="footer-section">
            <h3 className="footer-heading">Connect With Us</h3>
            <div className="social-links">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <FacebookIcon className="social-icon" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <TwitterIcon className="social-icon" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <InstagramIcon className="social-icon" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                <YouTubeIcon className="social-icon" />
              </a>
            </div>
            
            <div className="contact-info">
              <p><EmailIcon className="contact-icon" /> support@example.com</p>
              <p><PhoneIcon className="contact-icon" /> +1 (888) 123-4567</p>
            </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="payment-methods">
            <h4><PaymentIcon className="payment-icon" /> Payment Methods</h4>
            <div className="payment-icons">
              <span className="payment-icon">Visa</span>
              <span className="payment-icon">MasterCard</span>
              <span className="payment-icon">PayPal</span>
              <span className="payment-icon">Bitcoin</span>
              <span className="payment-icon">Skrill</span>
            </div>
          </div>
          
          <div className="footer-disclaimer">
            <p>© 2025 Your Company. All rights reserved. This site is licensed and regulated. Gambling can be addictive, please play responsibly.</p>
            <p>18+ Only. Terms and Conditions apply.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 