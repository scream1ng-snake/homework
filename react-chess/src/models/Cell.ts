import { Board } from "./Board";
import { Colors } from "./Colors";
import { Figure } from "./figures/figure";

export class Cell {
  readonly x: number;
  readonly y: number;
  readonly color: Colors;
  figure: Figure | null;
  board: Board;
  avaliable: boolean;
  id: number;

  constructor(board: Board, x: number, y: number, color: Colors, figure: Figure | null) {
    this.board = board;
    this.x = x;
    this.y = y;
    this.figure = figure;
    this.color = color;
    this.id =  Math.random();
    this.avaliable = false;
  }

  isEmpty(): boolean {
    return this.figure === null;
  }

  isEnemy(target: Cell): boolean {
    if(target.figure) {
      return this.figure?.color !== target.figure.color;
    }
    return false;
  }

  setFigure(figure: Figure) {
    this.figure = figure;
    this.figure.cell = this;
  }

  addLostFigure(figure: Figure) {
    if (figure?.color === Colors.BLACK) {
      this.board.lostBlackFigures.push(figure);
    } else {
      this.board.lostWhiteFigures.push(figure);
    }
  }

  movefigure(target: Cell) {
    if(this.figure && this.figure.canMove(target)) {
      this.figure.moveFigure(target);
      if (target.figure) {
        this.addLostFigure(target.figure);
      }
      target.setFigure(this.figure);
      this.figure = null;
    }
  }

  isEmptyVertical(target: Cell): boolean {
    if(target.x !== this.x) {
      return false
    }
    const min = Math.min(this.y, target.y);
    const max = Math.max(this.y, target.y);

    for(let y = min + 1; y < max; y++) {
      if(!this.board.getCells(this.x, y).isEmpty()) {
        return false;
      }
    }
    return true;
  }

  isEmptyHorisontal(target: Cell): boolean {
    if(target.y !== this.y) {
      return false
    }
    const min = Math.min(this.x, target.x);
    const max = Math.max(this.x, target.x);

    for(let x = min + 1; x < max; x++) {
      if(!this.board.getCells(x, this.y).isEmpty()) {
        return false;
      }
    }
    return true;
  }

  isEmptyDiagonal(target: Cell): boolean {
    const absX = Math.abs(target.x - this.x);
    const absY = Math.abs(target.y - this.y);

    if(absX !== absY) return false;

    const dx = target.x > this.x? 1 : -1
    const dy = target.y > this.y? 1 : -1

    for (let i = 1; i < absY; i++) {
      if(!this.board.getCells(this.x + i * dx, this.y + i * dy).isEmpty()) {
        return false
      }
    }
    return true
  }
}