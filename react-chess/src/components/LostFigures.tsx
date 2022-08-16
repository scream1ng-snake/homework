import React, { FC } from "react";
import { Figure } from "../models/figures/figure";

interface LostProps {
  title: string;
  figures: Figure[]
}

const LostFigures: FC<LostProps> = ({title, figures}) => {
  return(
    <div className="lost">
      <h3>{title}</h3>
      {figures.map((figure) => {
        return(
          <div key={figure.id}>
            {figure.name} {figure.logo && <img src={figure.logo} alt=""/>}
          </div>
        )
      })}
    </div>
  )
}

export default LostFigures;