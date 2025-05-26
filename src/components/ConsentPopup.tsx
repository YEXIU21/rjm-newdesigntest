import React, { useState } from 'react';
import '../styles/ConsentPopup.css';
import { Link } from 'react-router-dom';
import { ReactComponent as PagcorLogo } from '../assets/pagcor.svg';

interface ConsentPopupProps {
  onProceed: () => void;
  onExit: () => void;
}

const ConsentPopup: React.FC<ConsentPopupProps> = ({ onProceed, onExit }) => {
  const [checkboxes, setCheckboxes] = useState({
    age: false,
    government: false,
    license: false,
    terms: false
  });

  const allChecked = Object.values(checkboxes).every(value => value === true);

  const handleCheckboxChange = (key: keyof typeof checkboxes) => {
    setCheckboxes(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="consent-overlay">
      <div className="consent-popup">
        <div className="consent-logo">
          YOUR LOGO
        </div>
        
        <p className="consent-text">
          Please read our <Link to="/responsible-gaming" className="consent-link">Responsible Gaming</Link> guidelines carefully:
        </p>
        
        <div className="consent-checklist">
          <div className="consent-item">
            <label className="checkbox-container">
              <input 
                type="checkbox" 
                checked={checkboxes.age} 
                onChange={() => handleCheckboxChange('age')}
              />
              <span className="checkmark"></span>
              <span className="checkbox-label">I am over 21 years of age.</span>
            </label>
          </div>
          
          <div className="consent-item">
            <label className="checkbox-container">
              <input 
                type="checkbox" 
                checked={checkboxes.government} 
                onChange={() => handleCheckboxChange('government')}
              />
              <span className="checkmark"></span>
              <span className="checkbox-label">
                I am not a government official, or employee connected directly with the operation of the Government or any of its agencies, member of the Armed Forces, including the Army, Navy, Air Force, or the National Police.
              </span>
            </label>
          </div>
          
          <div className="consent-item">
            <label className="checkbox-container">
              <input 
                type="checkbox" 
                checked={checkboxes.license} 
                onChange={() => handleCheckboxChange('license')}
              />
              <span className="checkmark"></span>
              <span className="checkbox-label">I am not a Gaming Employment License (GEL) holder.</span>
            </label>
          </div>
          
          <div className="consent-item">
            <label className="checkbox-container">
              <input 
                type="checkbox" 
                checked={checkboxes.terms} 
                onChange={() => handleCheckboxChange('terms')}
              />
              <span className="checkmark"></span>
              <span className="checkbox-label">
                I have read and agree to <Link to="/terms" className="consent-link">Terms & Conditions</Link>
              </span>
            </label>
          </div>
        </div>
        
        <div className="consent-actions">
          <button 
            className={`consent-proceed ${!allChecked ? 'disabled' : ''}`}
            onClick={onProceed}
            disabled={!allChecked}
          >
            Proceed
          </button>
          
          <button className="consent-exit" onClick={onExit}>
            Exit
          </button>
        </div>
        
        <div className="consent-footer">
          <div className="consent-regulator">
            <div className="regulator-badge pagcor">
              <PagcorLogo className="pagcor-logo" />
            </div>
            <div className="regulator-badge age">21+</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsentPopup; 