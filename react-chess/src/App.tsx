import React, { useEffect, useState } from 'react';
import './App.css';
import BoardComponent from './components/BoardComponent';
import LostFigures from './components/LostFigures';
import { Board } from './models/Board';
import { Colors } from './models/Colors';
import { Player } from './models/Player';

const App = () => {
  const [board, setBoard] = useState(new Board());
  const blackPlayer = new Player(Colors.BLACK);
  const whitePlayer = new Player(Colors.WHITE);
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null); 

  useEffect(() => {
    restart();
  }, [])

  function swapPlayer() {
    setCurrentPlayer(currentPlayer?.color === Colors.BLACK? whitePlayer : blackPlayer);
  }

  function restart() {
    setCurrentPlayer(whitePlayer);
    const newBoard = new Board();
    newBoard.initCells();
    newBoard.addFigures();
    setBoard(newBoard);
  }

  return (
    <div className='App'>
      <BoardComponent
        board={board}
        setBoard={setBoard}
        currentPlayer={currentPlayer}
        swapPlayer={swapPlayer}
      />
      <div>
        <LostFigures 
          title='Black Figures'
          figures={board.lostBlackFigures}
        />
        <LostFigures 
          title='White Figures'
          figures={board.lostWhiteFigures}
        />
      </div>
    </div>
  );
};

export default App;
