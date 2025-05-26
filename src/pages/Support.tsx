import React from 'react';
import '../styles/Support.css';
import { Link } from 'react-router-dom';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import EmailIcon from '@mui/icons-material/Email';
import ChatIcon from '@mui/icons-material/Chat';
import PhoneIcon from '@mui/icons-material/Phone';
import ArticleIcon from '@mui/icons-material/Article';

const Support: React.FC = () => {
  const openMessenger = () => {
    window.open('https://m.me/yourcasinopagename', '_blank');
  };

  return (
    <div className="support-container">
      <h1 className="support-title">Customer Support</h1>
      <p className="support-description">We're here to help you with any questions or issues you may have.</p>
      
      <div className="support-options">
        <div className="support-card">
          <div className="support-icon">
            <HelpOutlineIcon />
          </div>
          <h3>Frequently Asked Questions</h3>
          <p>Find answers to the most common questions about our services.</p>
          <Link to="/faq" className="btn btn-outline">View FAQs</Link>
        </div>
        
        <div className="support-card">
          <div className="support-icon">
            <ChatIcon />
          </div>
          <h3>Live Chat</h3>
          <p>Chat with our support team in real-time for immediate assistance.</p>
          <button onClick={openMessenger} className="btn btn-primary">Start Chat</button>
        </div>
        
        <div className="support-card">
          <div className="support-icon">
            <EmailIcon />
          </div>
          <h3>Email Support</h3>
          <p>Send us an email and we'll get back to you within 24 hours.</p>
          <a href="mailto:support@mycasino.com" className="btn btn-outline">Email Us</a>
        </div>
        
        <div className="support-card">
          <div className="support-icon">
            <PhoneIcon />
          </div>
          <h3>Phone Support</h3>
          <p>Call us directly for personalized assistance with your account.</p>
          <a href="tel:+1234567890" className="btn btn-outline">Call Us</a>
        </div>
        
        <div className="support-card">
          <div className="support-icon">
            <ArticleIcon />
          </div>
          <h3>Terms & Conditions</h3>
          <p>Read our terms of service and privacy policy.</p>
          <Link to="/terms" className="btn btn-outline">View Terms</Link>
        </div>
      </div>
      
      <div className="support-hours">
        <h2>Support Hours</h2>
        <p>Our customer support team is available 24/7 to assist you.</p>
        <p>Live Chat & Phone: 24/7</p>
        <p>Email Response: Within 24 hours</p>
      </div>
    </div>
  );
};

export default Support; 