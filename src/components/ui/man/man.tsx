import { FC } from 'react';
import { ManType } from '../../../types/types';

const Man: FC<ManType> = ({
  name,
  birth_year,
  eye_color,
  gender,
  hair_color,
  height,
  mass,
  skin_color,
}) => {
  return (
    <article>
      <h3>{name}</h3>
      <h4>Birth Year: {birth_year}</h4>
      <p>Eye Color: {eye_color}</p>
      <p>Gender: {gender}</p>
      <p>Hair Color: {hair_color}</p>
      <p>Height: {height}</p>
      <p>Mass: {mass}</p>
      <p>Skin Color: {skin_color}</p>
    </article>
  );
};

export default Man;
