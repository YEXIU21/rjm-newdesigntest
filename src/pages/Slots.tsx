import React, { useState } from 'react';
import '../styles/Slots.css';

const Slots: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  // Function to handle playing a game
  const handlePlayGame = (gameId: number, gameTitle: string) => {
    console.log(`Playing slot: ${gameTitle} (ID: ${gameId})`);
    // Here you would navigate to the game or launch the game in a modal/iframe
    alert(`Opening slot game: ${gameTitle}`);
  };

  // Function to handle playing a demo
  const handlePlayDemo = (gameId: number, gameTitle: string) => {
    console.log(`Playing demo for slot: ${gameTitle} (ID: ${gameId})`);
    // Here you would launch the demo version
    alert(`Opening demo for slot: ${gameTitle}`);
  };

  const categories = [
    { id: 'all', name: 'All Slots' },
    { id: 'popular', name: 'Popular' },
    { id: 'new', name: 'New Games' },
    { id: 'jackpot', name: 'Jackpots' },
    { id: 'classic', name: 'Classic' },
  ];

  const slots = [
    { id: 1, title: 'Mega Fortune', category: ['popular', 'jackpot'], image: 'https://via.placeholder.com/300x180', provider: 'NetEnt', isNew: false, hasJackpot: true },
    { id: 2, title: 'Starburst', category: ['popular', 'classic'], image: 'https://via.placeholder.com/300x180', provider: 'NetEnt', isNew: false, hasJackpot: false },
    { id: 3, title: 'Gonzo\'s Quest', category: ['popular'], image: 'https://via.placeholder.com/300x180', provider: 'NetEnt', isNew: false, hasJackpot: false },
    { id: 4, title: 'Book of Dead', category: ['popular'], image: 'https://via.placeholder.com/300x180', provider: 'Play\'n GO', isNew: false, hasJackpot: false },
    { id: 5, title: 'Divine Fortune', category: ['jackpot'], image: 'https://via.placeholder.com/300x180', provider: 'NetEnt', isNew: false, hasJackpot: true },
    { id: 6, title: 'Reactoonz', category: ['popular'], image: 'https://via.placeholder.com/300x180', provider: 'Play\'n GO', isNew: false, hasJackpot: false },
    { id: 7, title: 'Sweet Bonanza', category: ['popular', 'new'], image: 'https://via.placeholder.com/300x180', provider: 'Pragmatic Play', isNew: true, hasJackpot: false },
    { id: 8, title: 'Wolf Gold', category: ['jackpot'], image: 'https://via.placeholder.com/300x180', provider: 'Pragmatic Play', isNew: false, hasJackpot: true },
    { id: 9, title: 'Fruit Shop', category: ['classic'], image: 'https://via.placeholder.com/300x180', provider: 'NetEnt', isNew: false, hasJackpot: false },
    { id: 10, title: 'Big Bass Bonanza', category: ['new'], image: 'https://via.placeholder.com/300x180', provider: 'Pragmatic Play', isNew: true, hasJackpot: false },
    { id: 11, title: 'Gates of Olympus', category: ['new', 'popular'], image: 'https://via.placeholder.com/300x180', provider: 'Pragmatic Play', isNew: true, hasJackpot: false },
    { id: 12, title: 'Mega Moolah', category: ['jackpot'], image: 'https://via.placeholder.com/300x180', provider: 'Microgaming', isNew: false, hasJackpot: true },
    { id: 13, title: 'Book of Ra', category: ['classic'], image: 'https://via.placeholder.com/300x180', provider: 'Novomatic', isNew: false, hasJackpot: false },
    { id: 14, title: 'Dead or Alive 2', category: ['popular'], image: 'https://via.placeholder.com/300x180', provider: 'NetEnt', isNew: false, hasJackpot: false },
    { id: 15, title: 'Immortal Romance', category: ['classic'], image: 'https://via.placeholder.com/300x180', provider: 'Microgaming', isNew: false, hasJackpot: false },
    { id: 16, title: 'Money Train 2', category: ['new', 'popular'], image: 'https://via.placeholder.com/300x180', provider: 'Relax Gaming', isNew: true, hasJackpot: false },
  ];

  const filteredSlots = activeCategory === 'all' 
    ? slots 
    : slots.filter(slot => slot.category.includes(activeCategory));

  return (
    <div className="slots-page">
      <div className="slots-banner">
        <img src="https://via.placeholder.com/1200x300" alt="Slots Banner" />
        <div className="banner-content">
          <h1>Slot Games</h1>
          <p>Spin the reels and win big with our extensive collection of slot games!</p>
        </div>
      </div>

      <div className="mobile-page-header">
        <h1 className="page-title">Slot Games</h1>
        <p className="page-description">Spin the reels on our incredible collection of slot games featuring amazing graphics, exciting bonus features, and huge jackpots.</p>
      </div>

      <div className="slots-providers">
        <span>Filter by Provider:</span>
        <select className="provider-select">
          <option value="all">All Providers</option>
          <option value="netent">NetEnt</option>
          <option value="pragmatic">Pragmatic Play</option>
          <option value="microgaming">Microgaming</option>
          <option value="playtech">Playtech</option>
          <option value="playngo">Play'n GO</option>
        </select>
      </div>

      <div className="category-tabs">
        {categories.map(category => (
          <button 
            key={category.id}
            className={`category-tab ${activeCategory === category.id ? 'active' : ''}`}
            onClick={() => setActiveCategory(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="slots-container">
        <div className="slots-grid">
          {filteredSlots.map(slot => (
            <div 
              key={slot.id} 
              className="game-card"
              onClick={() => handlePlayGame(slot.id, slot.title)}
            >
              <div className="game-image-container">
                <img src={slot.image} alt={slot.title} className="game-image" />
                {slot.isNew && <div className="game-badge new">NEW</div>}
                {slot.hasJackpot && <div className="game-badge jackpot">JACKPOT</div>}
                <div className="game-overlay">
                  <button 
                    className="play-btn"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent triggering the card click
                      handlePlayGame(slot.id, slot.title);
                    }}
                  >
                    Play Now
                  </button>
                  <button 
                    className="demo-btn"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent triggering the card click
                      handlePlayDemo(slot.id, slot.title);
                    }}
                  >
                    Demo
                  </button>
                </div>
              </div>
              <div className="game-info">
                <h3 className="game-title">{slot.title}</h3>
                <p className="game-provider">{slot.provider}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slots; 