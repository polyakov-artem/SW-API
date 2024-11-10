import { FC } from 'react';
import { VehicleType } from '../../../types/types';

const Vehicle: FC<VehicleType> = ({
  name,
  model,
  vehicle_class,
  manufacturer,
  length,
  cost_in_credits,
  crew,
  passengers,
  max_atmosphering_speed,
  cargo_capacity,
  consumables,
}) => {
  return (
    <article>
      <h3>{name}</h3>
      <h4>Model: {model}</h4>
      <p>Vehicle Class: {vehicle_class}</p>
      <p>Manufacturer: {manufacturer}</p>
      <p>Length: {length}</p>
      <p>Cost in Credits: {cost_in_credits}</p>
      <p>Crew: {crew}</p>
      <p>Passengers: {passengers}</p>
      <p>Max Atmosphering Speed: {max_atmosphering_speed}</p>
      <p>Cargo Capacity: {cargo_capacity}</p>
      <p>Consumables: {consumables}</p>
    </article>
  );
};

export default Vehicle;
