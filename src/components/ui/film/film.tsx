import { FC } from 'react';
import { FilmType } from '../../../types/types';

const Film: FC<FilmType> = ({
  title,
  episode_id,
  opening_crawl,
  director,
  producer,
  release_date,
}) => {
  return (
    <article>
      <h3>{title}</h3>
      <h4>Episode ID: {episode_id}</h4>
      <p>Description: {opening_crawl}</p>
      <p>Director: {director}</p>
      <p>Producer: {producer}</p>
      <p>Release Date: {release_date}</p>
    </article>
  );
};

export default Film;
