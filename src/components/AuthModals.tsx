import React, { useState } from 'react';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';
import ForgotPasswordModal from './ForgotPasswordModal';

type ModalType = 'login' | 'signup' | 'forgotPassword' | null;

interface AuthModalsProps {
  initialModal?: ModalType;
  onClose: () => void;
}

const AuthModals: React.FC<AuthModalsProps> = ({ initialModal = null, onClose }) => {
  const [activeModal, setActiveModal] = useState<ModalType>(initialModal);

  const handleClose = () => {
    setActiveModal(null);
    onClose();
  };

  const switchToLogin = () => {
    setActiveModal('login');
  };

  const switchToSignup = () => {
    setActiveModal('signup');
  };

  const switchToForgotPassword = () => {
    setActiveModal('forgotPassword');
  };

  return (
    <>
      <LoginModal 
        isOpen={activeModal === 'login'} 
        onClose={handleClose}
        onSwitchToSignup={switchToSignup}
        onForgotPassword={switchToForgotPassword}
      />
      
      <SignupModal 
        isOpen={activeModal === 'signup'} 
        onClose={handleClose}
        onSwitchToLogin={switchToLogin}
      />
      
      <ForgotPasswordModal 
        isOpen={activeModal === 'forgotPassword'} 
        onClose={handleClose}
        onSwitchToLogin={switchToLogin}
      />
    </>
  );
};

export default AuthModals; 