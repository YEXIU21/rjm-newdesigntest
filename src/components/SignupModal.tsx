import React, { useState } from 'react';
import '../styles/AuthModals.css';

// Import icons
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import PhoneIcon from '@mui/icons-material/Phone';

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
}

const SignupModal: React.FC<SignupModalProps> = ({ isOpen, onClose, onSwitchToLogin }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate passwords match
    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    
    // Handle signup logic here
    console.log('Signup attempt:', { username, email, phone, password, agreeTerms });
    // For demo purposes only - would integrate with authentication service
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="auth-modal-overlay" onClick={onClose}>
      <div className="auth-modal signup-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          <CloseIcon />
        </button>
        
        <div className="auth-modal-header">
          <h2>Create Account</h2>
          <p>Join our casino community today</p>
        </div>
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <div className="input-icon">
              <PersonIcon />
            </div>
            <input
              type="text"
              placeholder="Username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          
          <div className="form-group">
            <div className="input-icon">
              <EmailIcon />
            </div>
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div className="form-group">
            <div className="input-icon">
              <PhoneIcon />
            </div>
            <input
              type="tel"
              placeholder="Phone Number"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="phone-input"
              style={{ color: 'var(--text-primary)' }}
            />
          </div>
          
          <div className="form-group">
            <div className="input-icon">
              <LockIcon />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button 
              type="button" 
              className="toggle-password"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </button>
          </div>
          
          <div className="form-group">
            <div className="input-icon">
              <LockIcon />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Confirm Password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          
          <div className="form-options">
            <label className="checkbox-container">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={() => setAgreeTerms(!agreeTerms)}
                required
              />
              <span className="checkmark"></span>
              I agree to the <a href="#" className="terms-link">Terms & Conditions</a>
            </label>
          </div>
          
          <button type="submit" className="btn btn-primary auth-submit">
            Create Account
          </button>
        </form>
        
        <div className="auth-separator">
          <span>OR</span>
        </div>
        
        <div className="social-login">
          <button className="social-btn google">
            <GoogleIcon /> Sign up with Google
          </button>
          <button className="social-btn facebook">
            <FacebookIcon /> Sign up with Facebook
          </button>
        </div>
        
        <div className="auth-footer">
          <p>Already have an account? <button onClick={onSwitchToLogin}>Log In</button></p>
        </div>
      </div>
    </div>
  );
};

export default SignupModal; 