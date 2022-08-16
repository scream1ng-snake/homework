import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureNames } from "./figure";
import blackLogo from "../../assets/black-queen.png";
import whiteLogo from "../../assets/white-queen.png";

export class Queen extends Figure {
  constructor(cell: Cell, color: Colors) {
    super(color, cell);
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
    this.name = FigureNames.QUEEN;
  }

  canMove(target: Cell): boolean {
    if(!super.canMove(target)) {
      return false;
    }
    if(this.cell.isEmptyVertical(target)) {
      return true;
    }
    if(this.cell.isEmptyHorisontal(target)) {
      return true;
    }
    if(this.cell.isEmptyDiagonal(target)) {
      return true;
    }
    return false;
  }
}