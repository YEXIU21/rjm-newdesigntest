import React from 'react';
import '../styles/Promotions.css';

const Promotions: React.FC = () => {
  const promos = [
    {
      id: 1,
      title: 'Welcome Bonus',
      description: 'Get 100% up to $500 on your first deposit!',
      image: 'https://via.placeholder.com/800x400',
      expiryDate: '2023-12-31',
      category: 'general'
    },
    {
      id: 2,
      title: 'Free Spins Tuesday',
      description: 'Get 50 free spins on our featured slot games every Tuesday when you deposit $20 or more.',
      image: 'https://via.placeholder.com/800x400',
      expiryDate: '2023-06-30',
      category: 'casino'
    },
    {
      id: 3,
      title: 'Sports Acca Boost',
      description: 'Get up to 50% extra on your accumulator bets with 5+ selections!',
      image: 'https://via.placeholder.com/800x400',
      expiryDate: '2023-12-31',
      category: 'sports'
    },
    {
      id: 4,
      title: 'Refer a Friend',
      description: 'Get $50 for each friend you refer who makes a deposit of $20 or more.',
      image: 'https://via.placeholder.com/800x400',
      expiryDate: null,
      category: 'general'
    },
    {
      id: 5,
      title: 'Live Dealer Cashback',
      description: 'Receive 10% cashback up to $200 on live dealer games every weekend.',
      image: 'https://via.placeholder.com/800x400',
      expiryDate: '2023-12-31',
      category: 'casino'
    }
  ];

  return (
    <div className="promotions-page">
      <div className="page-header">
        <h1 className="page-title">Promotions & Bonuses</h1>
        <p className="page-description">Check out our latest promotions and bonuses to enhance your gaming experience.</p>
      </div>

      <div className="promotions-grid">
        {promos.map((promo) => (
          <div key={promo.id} className="promo-card">
            <div className="promo-image-container">
              <img src={promo.image} alt={promo.title} className="promo-image" />
              <div className="promo-category">{promo.category}</div>
            </div>
            <div className="promo-content">
              <h2 className="promo-title">{promo.title}</h2>
              <p className="promo-description">{promo.description}</p>
              {promo.expiryDate && (
                <p className="promo-expiry">Valid until: {new Date(promo.expiryDate).toLocaleDateString()}</p>
              )}
              <button className="btn btn-primary promo-claim-btn">Claim Now</button>
            </div>
          </div>
        ))}
      </div>

      <div className="promo-terms">
        <h3>Terms and Conditions</h3>
        <p>All promotions are subject to our general terms and conditions. Players must be 18+ to participate. Play responsibly.</p>
        <ul>
          <li>Minimum deposit requirements apply.</li>
          <li>Wagering requirements may apply to bonus funds and free spins.</li>
          <li>Time limitations apply.</li>
          <li>Game restrictions may apply.</li>
        </ul>
        <p>Please read the full terms and conditions of each promotion before claiming.</p>
      </div>
    </div>
  );
};

export default Promotions; 