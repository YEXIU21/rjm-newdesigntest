import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../styles/Casino.css';

// Import game images
import sweetBonanza from '../assets/sweetbonaza.png';
import superAce from '../assets/superace.png';
import sugarRush from '../assets/sugarrush.jpg';
import luckyFortunes from '../assets/luckyfortunes.png';
import gatesOfOlympus from '../assets/gatesofolympus.jpg';
import fortuneGems from '../assets/fortunegems.jpg';
import cashBonanza from '../assets/cashbonanza.png';
import banner2 from '../assets/banner2.jpg';

// Import icons
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';
import SearchIcon from '@mui/icons-material/Search';
import StarIcon from '@mui/icons-material/Star';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import CloseIcon from '@mui/icons-material/Close';
import RefreshIcon from '@mui/icons-material/Refresh';

// Sample data (in a real app, this would come from an API)
const gameProviders = [
  { id: 'pragmatic', name: 'Pragmatic Play', gamesCount: 200 },
  { id: 'evolution', name: 'Evolution', gamesCount: 150 },
  { id: 'netent', name: 'NetEnt', gamesCount: 180 },
  { id: 'playtech', name: 'Playtech', gamesCount: 160 },
  { id: 'microgaming', name: 'Microgaming', gamesCount: 220 },
];

const gameCategories = [
  { id: 'slots', name: 'Slots', count: 500 },
  { id: 'table', name: 'Table Games', count: 50 },
  { id: 'live', name: 'Live Casino', count: 100 },
  { id: 'jackpot', name: 'Jackpots', count: 30 },
  { id: 'new', name: 'New Games', count: 25 },
];

const games = [
  {
    id: 1,
    name: 'Sweet Bonanza',
    provider: 'Pragmatic Play',
    category: 'Slots',
    image: '/assets/games/sweet_bonanza.jpg',
    isHot: true,
    isNew: false,
    rtp: 96.5,
    volatility: 'High',
    minBet: 0.20,
    maxBet: 100
  },
  {
    id: 2,
    name: 'Gates of Olympus',
    provider: 'Pragmatic Play',
    category: 'Slots',
    image: '/assets/games/gates_of_olympus.jpg',
    isHot: true,
    isNew: false,
    rtp: 96.2,
    volatility: 'High',
    minBet: 0.20,
    maxBet: 125
  },
  // ... more games would be added here
];

const Casino: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProviders, setSelectedProviders] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('popularity');
  const [filteredGames, setFilteredGames] = useState(games);
  
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Apply filters and sorting
    let result = [...games];
    
    // Category filter
    if (activeCategory !== 'all') {
      result = result.filter(game => {
        if (activeCategory === 'hot') return game.isHot;
        if (activeCategory === 'new') return game.isNew;
        return game.category.toLowerCase() === activeCategory;
      });
    }
    
    // Provider filter
    if (selectedProviders.length > 0) {
      result = result.filter(game => 
        selectedProviders.includes(game.provider.toLowerCase())
      );
    }
    
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(game => 
        game.name.toLowerCase().includes(query) ||
        game.provider.toLowerCase().includes(query)
      );
    }
    
    // Sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'provider':
          return a.provider.localeCompare(b.provider);
        case 'rtp':
          return b.rtp - a.rtp;
        default: // 'popularity'
          return (b.isHot ? 1 : 0) - (a.isHot ? 1 : 0);
      }
    });
    
    setFilteredGames(result);
  }, [activeCategory, selectedProviders, searchQuery, sortBy]);

  const toggleProvider = (providerId: string) => {
    setSelectedProviders(prev => {
      if (prev.includes(providerId)) {
        return prev.filter(id => id !== providerId);
      }
      return [...prev, providerId];
    });
  };

  const clearFilters = () => {
    setActiveCategory('all');
    setSelectedProviders([]);
    setSearchQuery('');
    setSortBy('popularity');
  };

  return (
    <div className="casino-page">
      <div className="page-header">
        <h1 className="page-title">Casino Games</h1>
        <p className="page-description">Explore our wide selection of premium casino games from top providers worldwide.</p>
      </div>

      <div className="featured-banner">
        <img src={banner2} alt="Casino Games" className="banner-image" />
        <div className="banner-content">
          <h2 className="banner-title">WEEKLY TOURNAMENTS</h2>
          <p className="banner-text">Compete for the top prizes in our exclusive weekly tournaments.</p>
          <button className="btn btn-primary join-now-btn">JOIN NOW</button>
        </div>
      </div>

      {/* Search and Filter Header */}
      <div className="casino-header">
        <div className="search-bar">
          <SearchIcon />
          <input
            type="text"
            placeholder="Search games..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className="clear-search" onClick={() => setSearchQuery('')}>
              <CloseIcon />
            </button>
          )}
        </div>
        
        <div className="header-actions">
          <button 
            className="filter-button"
            onClick={() => setShowFilters(!showFilters)}
          >
            <FilterListIcon />
            Filters
          </button>
          
          <select 
            className="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="popularity">Popularity</option>
            <option value="name">Name</option>
            <option value="provider">Provider</option>
            <option value="rtp">RTP</option>
          </select>
        </div>
      </div>

      {/* Game Categories */}
      <div className="game-categories">
        <button 
          className={`category-button ${activeCategory === 'all' ? 'active' : ''}`}
          onClick={() => setActiveCategory('all')}
        >
          All Games
        </button>
        <button 
          className={`category-button ${activeCategory === 'hot' ? 'active' : ''}`}
          onClick={() => setActiveCategory('hot')}
        >
          <StarIcon /> Hot Games
        </button>
        <button 
          className={`category-button ${activeCategory === 'new' ? 'active' : ''}`}
          onClick={() => setActiveCategory('new')}
        >
          <NewReleasesIcon /> New
        </button>
        {gameCategories.map(category => (
          <button
            key={category.id}
            className={`category-button ${activeCategory === category.id ? 'active' : ''}`}
            onClick={() => setActiveCategory(category.id)}
          >
            {category.name}
            <span className="count">{category.count}</span>
          </button>
        ))}
      </div>

      {/* Filter Sidebar */}
      <div className={`filter-sidebar ${showFilters ? 'active' : ''}`}>
        <div className="filter-header">
          <h3>Filters</h3>
          <button className="close-filters" onClick={() => setShowFilters(false)}>
            <CloseIcon />
          </button>
        </div>

        <div className="filter-section">
          <h4>Game Providers</h4>
          <div className="provider-list">
            {gameProviders.map(provider => (
              <label key={provider.id} className="provider-item">
                <input
                  type="checkbox"
                  checked={selectedProviders.includes(provider.id)}
                  onChange={() => toggleProvider(provider.id)}
                />
                <span className="provider-name">{provider.name}</span>
                <span className="provider-count">{provider.gamesCount}</span>
              </label>
            ))}
          </div>
        </div>

        <button className="clear-filters" onClick={clearFilters}>
          <RefreshIcon />
          Clear All Filters
        </button>
      </div>

      {/* Game Grid */}
      <div className="game-grid">
        {filteredGames.map(game => (
          <div key={game.id} className="game-card">
            <div className="game-image-container">
              <img src={game.image} alt={game.name} className="game-image" />
              <div className="game-overlay">
                <button className="play-btn">Play Now</button>
                <button className="demo-btn">Demo</button>
              </div>
              {game.isHot && <div className="game-badge hot"><StarIcon /> HOT</div>}
              {game.isNew && <div className="game-badge new"><NewReleasesIcon /> NEW</div>}
            </div>
            <div className="game-info">
              <h3 className="game-title">{game.name}</h3>
              <p className="game-provider">{game.provider}</p>
              <div className="game-details">
                <span className="detail">RTP: {game.rtp}%</span>
                <span className="detail">Volatility: {game.volatility}</span>
              </div>
              <div className="bet-limits">
                <span>Min: ${game.minBet}</span>
                <span>Max: ${game.maxBet}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No Results Message */}
      {filteredGames.length === 0 && (
        <div className="no-results">
          <p>No games found matching your criteria</p>
          <button className="clear-filters" onClick={clearFilters}>
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default Casino; 