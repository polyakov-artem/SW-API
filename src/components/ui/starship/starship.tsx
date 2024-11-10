import { FC } from 'react';
import { StarshipType } from '../../../types/types';

const Starship: FC<StarshipType> = ({
  name,
  model,
  starship_class,
  manufacturer,
  cost_in_credits,
  length,
  crew,
  passengers,
  max_atmosphering_speed,
  hyperdrive_rating,
  MGLT,
  cargo_capacity,
  consumables,
}) => {
  return (
    <article>
      <h3>{name}</h3>
      <h4>Model: {model}</h4>
      <p>Starship Class: {starship_class}</p>
      <p>Manufacturer: {manufacturer}</p>
      <p>Cost in Credits: {cost_in_credits}</p>
      <p>Length: {length}</p>
      <p>Crew: {crew}</p>
      <p>Passengers: {passengers}</p>
      <p>Max Atmosphering Speed: {max_atmosphering_speed}</p>
      <p>Hyperdrive Rating: {hyperdrive_rating}</p>
      <p>MGLT: {MGLT}</p>
      <p>Cargo Capacity: {cargo_capacity}</p>
      <p>Consumables: {consumables}</p>
    </article>
  );
};

export default Starship;
