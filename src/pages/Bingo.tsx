import React from 'react';
import { Typography, Container, Card, CardContent, CardMedia, Button } from '@mui/material';
import Filter9PlusIcon from '@mui/icons-material/Filter9Plus';
import '../styles/Bingo.css';

const Bingo: React.FC = () => {
  // Function to handle playing a game
  const handlePlayGame = (gameId: number) => {
    console.log(`Playing bingo game: ${gameId}`);
    // Here you would navigate to the game or launch the game in a modal/iframe
    alert(`Opening Bingo Game ${gameId}`);
  };

  // Function to handle playing a demo
  const handlePlayDemo = (gameId: number) => {
    console.log(`Playing demo for bingo game: ${gameId}`);
    // Here you would launch the demo version
    alert(`Opening demo for Bingo Game ${gameId}`);
  };

  return (
    <Container>
      <div className="page-header">
        <Filter9PlusIcon className="page-icon" />
        <Typography variant="h4" component="h1" className="page-title">
          Bingo Games
        </Typography>
      </div>

      <Typography variant="body1" paragraph>
        Enjoy our selection of exciting bingo games with various themes and prize pools.
      </Typography>

      <div className="game-grid">
        {[1, 2, 3, 4, 5, 6].map((game) => (
          <div key={game} className="game-item">
            <Card 
              className="game-card"
              onClick={() => handlePlayGame(game)}
              sx={{ cursor: 'pointer' }}
            >
              <CardMedia
                component="img"
                height="140"
                image={`https://via.placeholder.com/300x200?text=Bingo+Game+${game}`}
                alt={`Bingo Game ${game}`}
                className="game-image"
              />
              <CardContent>
                <Typography variant="h6" className="game-title">
                  Bingo Game {game}
                </Typography>
                <Typography variant="body2" color="textSecondary" className="game-category">
                  90-Ball Bingo
                </Typography>
                <div className="game-buttons">
                  <Button 
                    variant="outlined" 
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent triggering the card click
                      handlePlayDemo(game);
                    }}
                  >
                    Demo
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Bingo; 