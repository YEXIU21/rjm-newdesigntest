import React from 'react';
import '../styles/LiveBets.css';
import CasinoIcon from '@mui/icons-material/Casino';

interface BetData {
  id: number;
  game: string;
  user: string;
  wager: number;
  win: number | null;
  icon: string;
}

const LiveBets: React.FC = () => {
  // Mock data for live bets
  const liveBets: BetData[] = [
    { id: 1, game: 'Gates of Olympus 1000', user: 'User76****', wager: 580.00, win: 251.00, icon: '🎮' },
    { id: 2, game: 'Sugar Rush 1000', user: 'User49****', wager: 279.00, win: 125.00, icon: '🍭' },
    { id: 3, game: 'Sweet Bonanza 1000', user: 'User13****', wager: 449.00, win: null, icon: '🍬' },
    { id: 4, game: 'Cash Bonanza', user: 'User3****', wager: 686.00, win: null, icon: '💰' },
    { id: 5, game: 'Starlight Princess 1000', user: 'User21****', wager: 93.00, win: 785.00, icon: '👸' },
    { id: 6, game: 'Wisdom of Athena', user: 'User41****', wager: 509.00, win: 790.00, icon: '🏛️' },
    { id: 7, game: 'Sticky Bees', user: 'User68****', wager: 891.00, win: null, icon: '🐝' },
    { id: 8, game: 'Sweet Bonanza', user: 'User22****', wager: 932.00, win: null, icon: '🍬' },
    { id: 9, game: 'Sugar Rush', user: 'User39****', wager: 726.00, win: 872.00, icon: '🍭' },
    { id: 10, game: 'Super Ace', user: 'User85****', wager: 67.00, win: 997.00, icon: '🃏' }
  ];

  return (
    <div className="live-bets-container">
      <div className="section-header">
        <h2 className="section-title"><CasinoIcon className="section-icon" /> Live Bets</h2>
      </div>
      
      <div className="live-bets-table">
        <div className="live-bets-header">
          <div className="live-bets-cell game-cell">Game</div>
          <div className="live-bets-cell wager-cell">Wager</div>
          <div className="live-bets-cell win-cell">Win</div>
        </div>
        
        <div className="live-bets-body">
          {liveBets.map((bet) => (
            <div key={bet.id} className="live-bets-row">
              <div className="live-bets-cell game-cell">
                <div className="game-icon">{bet.icon}</div>
                <div className="game-info">
                  <div className="game-name">{bet.game}</div>
                  <div className="user-name">{bet.user}</div>
                </div>
              </div>
              <div className="live-bets-cell wager-cell">
                PHP {bet.wager.toFixed(2)}
              </div>
              <div className={`live-bets-cell win-cell ${bet.win === null ? 'zero-win' : 'positive-win'}`}>
                {bet.win !== null ? `PHP ${bet.win.toFixed(2)}` : 'PHP 0.00'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LiveBets; 