import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Home.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import RefreshIcon from '@mui/icons-material/Refresh';
import StarIcon from '@mui/icons-material/Star';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LiveBets from '../components/LiveBets';

// Import images
import banner1 from '../assets/banner1.png';
import banner2 from '../assets/banner2.jpg';
import banner3 from '../assets/banner3.png';

// Import game images
import sweetBonanza from '../assets/sweetbonaza.png';
import superAce from '../assets/superace.png';
import sugarRush from '../assets/sugarrush.jpg';
import luckyFortunes from '../assets/luckyfortunes.png';
import gatesOfOlympus from '../assets/gatesofolympus.jpg';
import fortuneGems from '../assets/fortunegems.jpg';
import cashBonanza from '../assets/cashbonanza.png';

// Import icons
import CasinoIcon from '@mui/icons-material/Casino';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import FiberNewIcon from '@mui/icons-material/FiberNew';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import TableBarIcon from '@mui/icons-material/TableBar';
import StreamIcon from '@mui/icons-material/Stream';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';

// Sample data for featured games
const featuredGames = [
  {
    id: 1,
    name: 'Sweet Bonanza',
    provider: 'Pragmatic Play',
    category: 'Slots',
    image: sweetBonanza,
    features: ['Free Spins', 'Multipliers', 'Scatter Pays'],
    isHot: true,
    isNew: false
  },
  {
    id: 2,
    name: 'Gates of Olympus',
    provider: 'Pragmatic Play',
    category: 'Slots',
    image: gatesOfOlympus,
    features: ['Free Spins', 'Multipliers', 'Tumble Feature'],
    isHot: true,
    isNew: false
  },
  {
    id: 3,
    name: 'Cash Bonanza',
    provider: 'Pragmatic Play',
    category: 'Slots',
    image: cashBonanza,
    features: ['Free Spins', 'Progressive Multipliers'],
    isHot: false,
    isNew: true
  },
  {
    id: 4,
    name: 'Super Ace',
    provider: 'Evolution',
    category: 'Table Games',
    image: superAce,
    features: ['Live Dealer', 'Multi-hand'],
    isHot: false,
    isNew: false
  },
  {
    id: 5,
    name: 'Fortune Gems',
    provider: 'NetEnt',
    category: 'Slots',
    image: fortuneGems,
    features: ['Free Spins', 'Expanding Wilds'],
    isHot: false,
    isNew: true
  },
  {
    id: 6,
    name: 'Lucky Fortunes',
    provider: 'Playtech',
    category: 'Slots',
    image: luckyFortunes,
    features: ['Jackpot', 'Bonus Game'],
    isHot: false,
    isNew: true
  },
  {
    id: 7,
    name: 'Sugar Rush',
    provider: 'Pragmatic Play',
    category: 'Slots',
    image: sugarRush,
    features: ['Cluster Pays', 'Multipliers'],
    isHot: false,
    isNew: true
  }
];

// Sample data for live bets
const liveBets = [
  {
    id: 1,
    game: 'Gates of Olympus 1000',
    user: 'User76****',
    wager: 'PHP 580.00',
    win: 'PHP 251.00',
    isWin: true
  },
  {
    id: 2,
    game: 'Sugar Rush 1000',
    user: 'User49****',
    wager: 'PHP 279.00',
    win: 'PHP 125.00',
    isWin: true
  },
  {
    id: 3,
    game: 'Sweet Bonanza 1000',
    user: 'User13****',
    wager: 'PHP 449.00',
    win: 'PHP 0.00',
    isWin: false
  },
  {
    id: 4,
    game: 'Cash Bonanza',
    user: 'User3****',
    wager: 'PHP 686.00',
    win: 'PHP 0.00',
    isWin: false
  },
  {
    id: 5,
    game: 'Starlight Princess 1000',
    user: 'User21****',
    wager: 'PHP 93.00',
    win: 'PHP 785.00',
    isWin: true
  },
  {
    id: 6,
    game: 'Super Ace',
    user: 'User85****',
    wager: 'PHP 67.00',
    win: 'PHP 997.00',
    isWin: true
  }
];

const Home = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [visibleGames, setVisibleGames] = useState(featuredGames);
  const [showAll, setShowAll] = useState(false);
  const location = useLocation();

  // Banner data for the slideshow
  const banners = [
    { 
      id: 1, 
      image: banner1, 
      title: 'ELEVATE YOUR GAMEPLAY', 
      description: 'Experience the thrill of our premium casino games.',
      primaryBtn: 'EXPLORE GAMES',
      secondaryBtn: 'CLAIM BONUS'
    },
    { 
      id: 2, 
      image: banner2, 
      title: 'WEEKLY TOURNAMENTS', 
      description: 'Compete for the top prizes in our exclusive weekly tournaments.',
      primaryBtn: 'JOIN NOW',
      secondaryBtn: 'LEARN MORE'
    },
    { 
      id: 3, 
      image: banner3, 
      title: 'VIP REWARDS', 
      description: 'Join our VIP program for exclusive bonuses and personalized offers.',
      primaryBtn: 'BECOME VIP',
      secondaryBtn: 'VIEW BENEFITS'
    },
  ];

  // Only show VIP badge on homepage
  const shouldShowVipBadge = location.pathname === '/';

  // Mock user data - in a real app, this would come from your auth context
  const userData = {
    isLoggedIn: true,
    username: 'User',
    vipLevel: 'Player VIP',
    balance: '$1,250.00',
    avatar: null // Could be a URL to the user's avatar image
  };

  useEffect(() => {
    if (activeCategory === 'all') {
      setVisibleGames(featuredGames);
    } else if (activeCategory === 'hot') {
      setVisibleGames(featuredGames.filter(game => game.isHot));
    } else if (activeCategory === 'new') {
      setVisibleGames(featuredGames.filter(game => game.isNew));
    } else {
      setVisibleGames(featuredGames.filter(game => game.category.toLowerCase() === activeCategory));
    }
  }, [activeCategory]);

  return (
    <div className="home-page">
      {/* Enhanced Hero Banner with Slideshow */}
      <div className="hero-banner">
        <Swiper
          spaceBetween={0}
          centeredSlides={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="hero-swiper"
        >
          {banners.map((banner) => (
            <SwiperSlide key={banner.id}>
              <div className="hero-slide" style={{ backgroundImage: `url(${banner.image})` }}>
                <div className="hero-overlay"></div>
                <div className="hero-content">
                  {/* Left side with main content */}
                  <div className="hero-main-content">
                    <div className="hero-text">
                      <h1>{banner.title}</h1>
                      <p>{banner.description}</p>
                      <div className="hero-cta">
                        <button className="btn btn-primary">{banner.primaryBtn}</button>
                        <button className="btn btn-secondary">{banner.secondaryBtn}</button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Right side with bonus card and VIP badge */}
                  <div className="hero-side-content">
                    {shouldShowVipBadge && userData.isLoggedIn && (
                      <div className="hero-vip-badge">
                        <div className="vip-badge-avatar">
                          {userData.avatar ? (
                            <img src={userData.avatar} alt={userData.username} />
                          ) : (
                            <span>{userData.username.charAt(0)}</span>
                          )}
                        </div>
                        <div className="vip-badge-info">
                          <span className="vip-badge-status">{userData.vipLevel}</span>
                          <span className="vip-badge-balance">{userData.balance}</span>
                        </div>
                      </div>
                    )}
                    
                    <div className="hero-bonus">
                      <div className="bonus-card">
                        <div className="bonus-header">WELCOME BONUS</div>
                        <div className="bonus-amount">UP TO $300</div>
                        <div className="bonus-info">+ 100 Free Spins</div>
                        <Link to="/promotions" className="bonus-link">
                          <span>Claim Now</span>
                          <ArrowForwardIcon />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Featured Games Section with Improved UI */}
      <section className="section">
        <div className="section-header">
          <div className="section-title-container">
            <div className="section-icon">🏆</div>
            <h2 className="section-title">Featured Games</h2>
          </div>
          <div className="game-categories">
            <button 
              className={`category-button ${activeCategory === 'all' ? 'active' : ''}`}
              onClick={() => setActiveCategory('all')}
            >
              All
            </button>
            <button 
              className={`category-button ${activeCategory === 'hot' ? 'active' : ''}`}
              onClick={() => setActiveCategory('hot')}
            >
              <StarIcon fontSize="small" />
              Hot
            </button>
            <button 
              className={`category-button ${activeCategory === 'new' ? 'active' : ''}`}
              onClick={() => setActiveCategory('new')}
            >
              <NewReleasesIcon fontSize="small" />
              New
            </button>
            <button 
              className={`category-button ${activeCategory === 'slots' ? 'active' : ''}`}
              onClick={() => setActiveCategory('slots')}
            >
              Slots
            </button>
            <button 
              className={`category-button ${activeCategory === 'table games' ? 'active' : ''}`}
              onClick={() => setActiveCategory('table games')}
            >
              Table Games
            </button>
          </div>
          <Link to="/casino" className="view-all">
            View All
          </Link>
        </div>

        <div className="game-grid">
          {visibleGames.map(game => (
            <div className="game-card" key={game.id}>
              <div className="game-image-container">
                <img src={game.image} alt={game.name} className="game-image" />
                <div className="game-overlay">
                  <button className="play-btn">Play Now!</button>
                  <button className="demo-btn">Demo</button>
                </div>
                {game.isHot && <div className="game-badge hot"><StarIcon fontSize="small" /> HOT</div>}
                {game.isNew && <div className="game-badge new"><NewReleasesIcon fontSize="small" /> NEW</div>}
              </div>
              <div className="game-info">
                <h3 className="game-title">{game.name}</h3>
                <p className="game-provider">{game.provider}</p>
                <div className="game-features">
                  {game.features.map((feature, index) => (
                    <span key={index} className="feature-tag">{feature}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Live Activity Section - Social Proof */}
      <section className="section live-activity-section">
        <div className="section-header">
          <div className="section-title-container">
            <div className="section-icon">🔥</div>
            <h2 className="section-title">Live Bets</h2>
          </div>
          <button className="refresh-button">
            <RefreshIcon />
            Refresh
          </button>
        </div>

        <div className="live-activity-table">
          <div className="table-header">
            <div className="table-cell game-column">Game</div>
            <div className="table-cell wager-column">Wager</div>
            <div className="table-cell win-column">Win</div>
          </div>
          <div className="table-body">
            {liveBets.map(bet => (
              <div className="table-row" key={bet.id}>
                <div className="table-cell game-column">
                  <div className="game-info-cell">
                    <div className="game-icon">
                      {bet.game.includes('Gates of Olympus') && <img src={gatesOfOlympus} alt={bet.game} />}
                      {bet.game.includes('Sugar Rush') && <img src={sugarRush} alt={bet.game} />}
                      {bet.game.includes('Sweet Bonanza') && <img src={sweetBonanza} alt={bet.game} />}
                      {bet.game.includes('Cash Bonanza') && <img src={cashBonanza} alt={bet.game} />}
                      {bet.game.includes('Super Ace') && <img src={superAce} alt={bet.game} />}
                      {bet.game.includes('Starlight Princess') && <img src={fortuneGems} alt={bet.game} />}
                    </div>
                    <div className="game-details">
                      <div className="game-name">{bet.game}</div>
                      <div className="user-name">{bet.user}</div>
                    </div>
                  </div>
                </div>
                <div className="table-cell wager-column">{bet.wager}</div>
                <div className={`table-cell win-column ${bet.isWin ? 'win' : 'loss'}`}>
                  {bet.win}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Promotional Banners */}
      <section className="section promotional-section">
        <div className="section-header">
          <div className="section-title-container">
            <div className="section-icon">🎁</div>
            <h2 className="section-title">Latest Promotions</h2>
          </div>
          <Link to="/promotions" className="view-all">
            All Promotions
          </Link>
        </div>

        <div className="promo-container">
          <div className="promo-card">
            <div className="promo-image">
              <img src={banner1} alt="100% Welcome Bonus" />
            </div>
            <div className="promo-content">
              <h3 className="promo-title">100% Welcome Bonus</h3>
              <p className="promo-description">Get up to $500 on your first deposit!</p>
              <button className="promo-button">Claim Now</button>
            </div>
          </div>

          <div className="promo-card">
            <div className="promo-image">
              <img src={banner2} alt="Weekly Cashback" />
            </div>
            <div className="promo-content">
              <h3 className="promo-title">Weekly Cashback</h3>
              <p className="promo-description">Get 10% cashback on losses every week!</p>
              <button className="promo-button">Learn More</button>
            </div>
          </div>
        </div>
      </section>

      {/* App Download Banner */}
      <section className="app-download-banner">
        <div className="app-content">
          <div className="app-text">
            <h2>Download Our App</h2>
            <p>Play your favorite casino games anytime, anywhere!</p>
            <Link to="/download" className="download-now-btn">
              Download Now
            </Link>
            <div className="device-compatibility">
              <span>Available for iOS and Android devices</span>
            </div>
          </div>
          <div className="app-image">
            <img src={banner3} alt="Casino App" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 