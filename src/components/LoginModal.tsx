import React, { useState } from 'react';
import '../styles/AuthModals.css';

// Import icons
import CloseIcon from '@mui/icons-material/Close';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToSignup: () => void;
  onForgotPassword: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onSwitchToSignup, onForgotPassword }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login attempt:', { email, password, rememberMe });
    // For demo purposes only - would integrate with authentication service
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="auth-modal-overlay" onClick={onClose}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          <CloseIcon />
        </button>
        
        <div className="auth-modal-header">
          <h2>Welcome Back</h2>
          <p>Sign in to continue to your account</p>
        </div>
        
        <form onSubmit={handleSubmit} className="auth-form">
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
          
          <div className="form-options">
            <label className="checkbox-container">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              <span className="checkmark"></span>
              Remember me
            </label>
            <a href="#" className="forgot-password" onClick={(e) => {
              e.preventDefault();
              onForgotPassword();
            }}>Forgot Password?</a>
          </div>
          
          <button type="submit" className="btn btn-primary auth-submit">
            Sign In
          </button>
        </form>
        
        <div className="auth-separator">
          <span>OR</span>
        </div>
        
        <div className="social-login">
          <button className="social-btn google">
            <GoogleIcon /> Sign in with Google
          </button>
          <button className="social-btn facebook">
            <FacebookIcon /> Sign in with Facebook
          </button>
        </div>
        
        <div className="auth-footer">
          <p>Don't have an account? <button onClick={onSwitchToSignup}>Sign Up</button></p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal; 