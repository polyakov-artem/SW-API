import { FC } from 'react';
import { PlanetType } from '../../../types/types';

const Planet: FC<PlanetType> = ({
  name,
  diameter,
  rotation_period,
  orbital_period,
  gravity,
  population,
  climate,
  terrain,
  surface_water,
}) => {
  return (
    <article>
      <h3>{name}</h3>
      <p>Diameter: {diameter}</p>
      <p>Rotation Period: {rotation_period}</p>
      <p>Orbital Period: {orbital_period}</p>
      <p>Gravity: {gravity}</p>
      <p>Population: {population}</p>
      <p>Climate: {climate}</p>
      <p>Terrain: {terrain}</p>
      <p>Surface Water: {surface_water}</p>
    </article>
  );
};

export default Planet;
