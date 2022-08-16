import React, { FC, useEffect, useState } from 'react';
import { Board } from '../models/Board';
import { Cell } from '../models/Cell';
import { Player } from '../models/Player';
import CellComponent from './CellComponent';

interface boardProps {
  board: Board;
  setBoard: (board: Board) => void;
  currentPlayer: Player | null;
  swapPlayer: () => void
}

const BoardComponent: FC<boardProps> = ({ board: Board, setBoard, currentPlayer, swapPlayer }) => {
  const [selectedCell, setSelecteddCell] = useState<Cell | null>(null);

  useEffect(() => {
    highlightCells();
  }, [selectedCell])

  const click = (cell: Cell) => {
    if(selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
      selectedCell.movefigure(cell);
      setSelecteddCell(null);
      swapPlayer();
    } else {
      if(currentPlayer?.color === cell.figure?.color) {
        setSelecteddCell(cell);
      }
    }
  }

  function highlightCells() {
    Board.highlightCells(selectedCell);
    updateBoard();
  }

  function updateBoard() {
    const newBoard = Board.getCopyBoard();
    setBoard(newBoard);
  }

  return (
    <div>
      <h1>Current Player - {currentPlayer?.color}</h1>
      <div className='board'>
      {Board.cells.map((row: Cell[], index) =>
        <React.Fragment key={index}>
          {row.map((cell) => 
            <CellComponent 
              click={click}
              cell={cell}
              key={cell.id}
              selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
            />
          )}
        </React.Fragment>
      )}
    </div>
    </div>
  );
};

export default BoardComponent;


