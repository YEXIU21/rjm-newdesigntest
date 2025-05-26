import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/GameNav.css';

// Import icons
import BingoIcon from '@mui/icons-material/Filter9Plus';
import PokerIcon from '@mui/icons-material/Style';
import SlotsIcon from '@mui/icons-material/VideogameAsset';
import CasinoIcon from '@mui/icons-material/Casino';
import FishingIcon from '@mui/icons-material/Waves';
import SportIcon from '@mui/icons-material/SportsSoccer';
import SpecialtyGameIcon from '@mui/icons-material/EmojiEvents';

const GameNav: React.FC = () => {
  const location = useLocation();
  
  const gameCategories = [
    { name: 'Bingo', path: '/bingo', icon: <BingoIcon /> },
    { name: 'Poker', path: '/poker', icon: <PokerIcon /> },
    { name: 'Slot', path: '/slots', icon: <SlotsIcon /> },
    { name: 'Casino', path: '/casino', icon: <CasinoIcon /> },
    { name: 'Fishing', path: '/fishing', icon: <FishingIcon /> },
    { name: 'Sport', path: '/sport', icon: <SportIcon /> },
    { name: 'Specialty Game', path: '/specialty-game', icon: <SpecialtyGameIcon /> },
  ];

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  return (
    <nav className="game-nav">
      <div className="game-nav-container">
        <ul className="game-nav-list">
          {gameCategories.map((category) => (
            <li key={category.name} className="game-nav-item">
              <Link 
                to={category.path} 
                className={`game-nav-link ${isActive(category.path) ? 'active' : ''}`}
              >
                <span className="game-nav-icon">{category.icon}</span>
                <span className="game-nav-text">{category.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default GameNav; 