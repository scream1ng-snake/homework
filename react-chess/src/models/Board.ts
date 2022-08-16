import { Cell } from "./Cell";
import { Colors } from "./Colors";
import { Bishop } from "./figures/Bishop";
import { Figure } from "./figures/figure";
import { King } from "./figures/King";
import { Knight } from "./figures/Knight";
import { Pawn } from "./figures/Pawn";
import { Queen } from "./figures/Queen";
import { Rook } from "./figures/Rook";

export class Board {
  cells: Cell[][] = []
  lostBlackFigures: Figure[] = [];
  lostWhiteFigures: Figure[] = [];

  public initCells() {
    for(let i = 0; i < 8; i++) {
      const row: Cell[] = [];
      for(let j = 0; j < 8; j++) {
        if((i + j) % 2 !== 0) {
          row.push(new Cell(this, j, i, Colors.BLACK, null)) // black
        } else {
          row.push(new Cell(this, j, i, Colors.WHITE, null)) // white
        }
      }
      this.cells.push(row);
    }
  }

  public getCells(x: number, y: number) {
    return this.cells[y][x];
  }

  private addPawns() {
    for(let i = 0; i < 8; i++) {
      new Pawn(this.getCells(i, 1), Colors.BLACK);
      new Pawn(this.getCells(i, 6), Colors.WHITE);
    }
  }
  private addKings() {
    new King(this.getCells(4, 0), Colors.BLACK);
    new King(this.getCells(4, 7), Colors.WHITE);
  }
  private addQueens() {
    new Queen(this.getCells(3, 0), Colors.BLACK);
    new Queen(this.getCells(3, 7), Colors.WHITE);
  }
  private addBishops() {
    new Bishop(this.getCells(2, 0), Colors.BLACK);
    new Bishop(this.getCells(5, 0), Colors.BLACK);
    new Bishop(this.getCells(2, 7), Colors.WHITE);
    new Bishop(this.getCells(5, 7), Colors.WHITE);
  }
  private addRooks() {
    new Rook(this.getCells(0, 0), Colors.BLACK);
    new Rook(this.getCells(7, 0), Colors.BLACK);
    new Rook(this.getCells(0, 7), Colors.WHITE);
    new Rook(this.getCells(7, 7), Colors.WHITE);
  }
  private addKnights() {
    new Knight(this.getCells(1, 0), Colors.BLACK);
    new Knight(this.getCells(6, 0), Colors.BLACK);
    new Knight(this.getCells(1, 7), Colors.WHITE);
    new Knight(this.getCells(6, 7), Colors.WHITE);
  }

  public addFigures() {
    this.addPawns();
    this.addKings();
    this.addKnights();
    this.addBishops();
    this.addQueens();
    this.addRooks();
  }

  public highlightCells(selectedCell: Cell | null) {
    for(let i = 0; i < this.cells.length; i++) {
      const row = this.cells[i];
      for(let j = 0; j < row.length; j++) {
        const target = row[j];
        target.avaliable = !!selectedCell?.figure?.canMove(target);
      }
    }
  }

  public getCopyBoard(): Board {
    const newBoard = new Board();
    newBoard.cells = this.cells;
    newBoard.lostBlackFigures = this.lostBlackFigures;
    newBoard.lostWhiteFigures = this.lostWhiteFigures;
    return newBoard;
  }
} // доделать фичи