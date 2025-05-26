import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Auth.css';

// Import icons
import EmailIcon from '@mui/icons-material/Email';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateEmail = () => {
    if (!email) {
      setError('Email is required');
      return false;
    }
    
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Email is invalid');
      return false;
    }
    
    setError(null);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail()) return;
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message
      setIsSubmitted(true);
      
    } catch (error) {
      console.error('Password reset request failed:', error);
      setError('Failed to send password reset email. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Reset Password</h2>
          <p>Enter your email to receive a password reset link</p>
        </div>
        
        {!isSubmitted ? (
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className={`form-group ${error ? 'error' : ''}`}>
              <div className="input-icon-wrapper">
                <EmailIcon className="input-icon" />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError(null);
                  }}
                />
              </div>
              {error && <span className="error-message">{error}</span>}
            </div>
            
            <button 
              type="submit" 
              className={`auth-button ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>
        ) : (
          <div className="reset-success">
            <div className="success-message">
              <p>If an account exists with the email <strong>{email}</strong>, you will receive a password reset link shortly.</p>
              <p>Please check your email and follow the instructions.</p>
            </div>
          </div>
        )}
        
        <div className="auth-footer">
          <Link to="/login" className="back-to-login">
            <ArrowBackIcon fontSize="small" style={{ marginRight: '5px' }} />
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword; 