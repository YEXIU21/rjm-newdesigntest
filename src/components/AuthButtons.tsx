import React, { useState } from 'react';
import AuthModals from './AuthModals';

const AuthButtons: React.FC = () => {
  const [showAuth, setShowAuth] = useState(false);
  const [initialModal, setInitialModal] = useState<'login' | 'signup' | 'forgotPassword' | null>(null);

  const handleLoginClick = () => {
    setInitialModal('login');
    setShowAuth(true);
  };

  const handleSignupClick = () => {
    setInitialModal('signup');
    setShowAuth(true);
  };

  const handleCloseAuth = () => {
    setShowAuth(false);
    setInitialModal(null);
  };

  return (
    <>
      <div className="auth-buttons">
        <button className="btn btn-text" onClick={handleLoginClick}>
          Log In
        </button>
        <button className="btn btn-primary" onClick={handleSignupClick}>
          Sign Up
        </button>
      </div>
      
      {showAuth && (
        <AuthModals
          initialModal={initialModal}
          onClose={handleCloseAuth}
        />
      )}
    </>
  );
};

export default AuthButtons; 