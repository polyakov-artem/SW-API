import { FC } from 'react';
import { SpeciesType } from '../../../types/types';

const Species: FC<SpeciesType> = ({
  name,
  classification,
  designation,
  average_height,
  average_lifespan,
  eye_colors,
  hair_colors,
  skin_colors,
  language,
}) => {
  return (
    <article>
      <h3>{name}</h3>
      <h4>Classification: {classification}</h4>
      <p>Designation: {designation}</p>
      <p>Average Height: {average_height}</p>
      <p>Average Lifespan: {average_lifespan}</p>
      <p>Eye Colors: {eye_colors}</p>
      <p>Hair Colors: {hair_colors}</p>
      <p>Skin Colors: {skin_colors}</p>
      <p>Language: {language}</p>
    </article>
  );
};

export default Species;
