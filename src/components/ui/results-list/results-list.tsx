import { FC, PropsWithChildren } from 'react';
import Film from '../film/film';
import Man from '../man/man';
import Planet from '../planet/planet';
import Species from '../species/species';
import Starship from '../starship/starship';
import Vehicle from '../vehicle/vehicle';
import './results-list.scss';
import {
  CorrectResponseResultsType,
  FilmType,
  ManType,
  PlanetType,
  SpeciesType,
  StarshipType,
  VehicleType,
} from '../../../types/types';
import { SwCategory } from '../../../enums/enums';

type ResultListPropsType = {
  items: CorrectResponseResultsType | undefined;
  category: SwCategory;
};

const LIST_CLASS_NAME = 'results-list';
const LIST_ITEM_CLASS_NAME = 'results-list__item';

const ResultsList: FC<ResultListPropsType> = ({ items, category }) => {
  switch (category) {
    case SwCategory.films:
      return (
        <List>
          {items?.map((item) => (
            <ListItem key={item.url}>
              <Film {...(item as FilmType)} />
            </ListItem>
          ))}
        </List>
      );

    case SwCategory.people:
      return (
        <List>
          {items?.map((item) => (
            <ListItem key={item.url}>
              <Man {...(item as ManType)} />
            </ListItem>
          ))}
        </List>
      );

    case SwCategory.planets:
      return (
        <List>
          {items?.map((item) => (
            <ListItem key={item.url}>
              <Planet {...(item as PlanetType)} />
            </ListItem>
          ))}
        </List>
      );

    case SwCategory.species:
      return (
        <List>
          {items?.map((item) => (
            <ListItem key={item.url}>
              <Species {...(item as SpeciesType)} />
            </ListItem>
          ))}
        </List>
      );

    case SwCategory.starships:
      return (
        <List>
          {items?.map((item) => (
            <ListItem key={item.url}>
              <Starship {...(item as StarshipType)} />
            </ListItem>
          ))}
        </List>
      );

    case SwCategory.vehicles:
      return (
        <List>
          {items?.map((item) => (
            <ListItem key={item.url}>
              <Vehicle {...(item as VehicleType)} />
            </ListItem>
          ))}
        </List>
      );
  }
};

const List: FC<PropsWithChildren> = ({ children }) => {
  return <ul className={LIST_CLASS_NAME}>{children}</ul>;
};

const ListItem: FC<PropsWithChildren> = ({ children }) => {
  return <li className={LIST_ITEM_CLASS_NAME}>{children}</li>;
};

export default ResultsList;
