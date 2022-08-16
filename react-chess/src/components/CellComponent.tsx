import React, { FC } from 'react';
import { Cell } from '../models/Cell';

interface cellProps {
  cell: Cell;
  selected: boolean;
  click: (cell: Cell) => void;
}

const CellComponent: FC<cellProps> = ({cell, selected, click}) => {
  return (
    <div 
      onClick={() => click(cell)}
      className={['cell', cell.color, selected? "selected" : "", cell.avaliable && cell.figure? "opened" : ""].join(' ')}
    >
      {cell.avaliable && !cell.figure && <div className='available'></div>}
      {cell.figure?.logo && <img src={cell.figure.logo}  alt=""/>}
    </div>
  );
};

export default CellComponent;




