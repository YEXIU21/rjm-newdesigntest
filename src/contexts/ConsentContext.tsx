import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

interface ConsentContextType {
  hasConsented: boolean;
  setHasConsented: (value: boolean) => void;
  showConsentPopup: boolean;
  setShowConsentPopup: (value: boolean) => void;
}

const ConsentContext = createContext<ConsentContextType | undefined>(undefined);

interface ConsentProviderProps {
  children: ReactNode;
}

export const ConsentProvider: React.FC<ConsentProviderProps> = ({ children }) => {
  const [hasConsented, setHasConsented] = useState<boolean>(false);
  const [showConsentPopup, setShowConsentPopup] = useState<boolean>(false);
  
  // Check if user has already consented
  useEffect(() => {
    const consentStatus = localStorage.getItem('userConsent');
    if (consentStatus === 'true') {
      setHasConsented(true);
    } else {
      // Show popup on first visit or if consent was not given
      setShowConsentPopup(true);
    }
  }, []);
  
  // Save consent status to localStorage when it changes
  useEffect(() => {
    if (hasConsented) {
      localStorage.setItem('userConsent', 'true');
    }
  }, [hasConsented]);
  
  return (
    <ConsentContext.Provider 
      value={{ 
        hasConsented, 
        setHasConsented, 
        showConsentPopup, 
        setShowConsentPopup 
      }}
    >
      {children}
    </ConsentContext.Provider>
  );
};

export const useConsent = (): ConsentContextType => {
  const context = useContext(ConsentContext);
  if (context === undefined) {
    throw new Error('useConsent must be used within a ConsentProvider');
  }
  return context;
}; 