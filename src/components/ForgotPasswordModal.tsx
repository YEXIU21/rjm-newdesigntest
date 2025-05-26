import React, { useState } from 'react';
import '../styles/AuthModals.css';

// Import icons
import CloseIcon from '@mui/icons-material/Close';
import EmailIcon from '@mui/icons-material/Email';

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
}

const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({ isOpen, onClose, onSwitchToLogin }) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle password reset logic here
    console.log('Password reset request for:', email);
    // For demo purposes, show success message
    setIsSubmitted(true);
  };

  return (
    <div className="auth-modal-overlay" onClick={onClose}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          <CloseIcon />
        </button>
        
        <div className="auth-modal-header">
          <h2>Forgot Password</h2>
          <p>Enter your email to reset your password</p>
        </div>
        
        {!isSubmitted ? (
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
            
            <button type="submit" className="btn btn-primary auth-submit">
              Reset Password
            </button>
          </form>
        ) : (
          <div className="reset-success">
            <p>If an account exists with the email <strong>{email}</strong>, you will receive password reset instructions.</p>
            <button 
              onClick={() => {
                setIsSubmitted(false);
                setEmail('');
              }}
              className="btn btn-secondary auth-submit"
            >
              Back to Reset Form
            </button>
          </div>
        )}
        
        <div className="auth-footer">
          <p>Remember your password? <button onClick={onSwitchToLogin}>Log In</button></p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordModal; 