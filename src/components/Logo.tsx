import React, { useState, useEffect } from 'react';
import vipLogo from '../assets/VIP LOGO.png';

const Logo: React.FC<{ className?: string }> = ({ className }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return (
    <div 
      className={`casino-logo ${className || ''}`}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: isMobile ? 'flex-start' : 'flex-start',
        height: '100%',
        minWidth: isMobile ? '160px' : '220px',
        backgroundColor: '#161b22',
        padding: isMobile ? '5px' : '8px',
        borderRadius: '4px',
        position: 'relative',
      }}
    >
      <img 
        src={vipLogo} 
        alt="VIP Logo" 
        style={{
          height: isMobile ? '60px' : '80px',
          maxWidth: '100%',
          objectFit: 'contain',
          marginLeft: isMobile ? '-5px' : '0',
        }}
      />
    </div>
  );
};

export default Logo; 