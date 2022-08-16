import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureNames } from "./figure";
import blackLogo from "../../assets/black-pawn.png";
import whiteLogo from "../../assets/white-pawn.png";

export class Pawn extends Figure {
  constructor(cell: Cell, color: Colors) {
    super(color, cell);
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
    this.name = FigureNames.PAWN;
  }

  isfirstStep: boolean = true;

  canMove(target: Cell): boolean {
    if(!super.canMove(target)) {
      return false;
    }

    const direction = this.color === Colors.BLACK? 1 : -1;
    const firstStepDirection = this.color === Colors.BLACK? 2 : -2;

    if (((target.y === this.cell.y + direction) || (this.isfirstStep
      && (target.y === this.cell.y + firstStepDirection)))
      && target.x === this.cell.x
      && this.cell.board.getCells(target.x, target.y).isEmpty()) {
      return true;
    }

    if(target.y === this.cell.y + direction
    && (target.x === this.cell.x + 1 || target.x === this.cell.x - 1)
    && this.cell.isEnemy(target)) {
      return true;
    } // 56: 20
    return false;
  }

  movefigure(target: Cell) {
    super.moveFigure(target);
    this.isfirstStep = false;
  }
}