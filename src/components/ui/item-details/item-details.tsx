import './item-details.scss';
import { FC, useCallback, useMemo } from 'react';
import Button from '../../shared/button/button';
import { useLocation, useNavigate, useParams } from 'react-router';
import useItemLoader from '../../../hooks/use-item-loader';
import {
  FilmType,
  ManType,
  PlanetType,
  SpeciesType,
  StarshipType,
  VehicleType,
} from '../../../types/types';
import Loader from '../../shared/loader/loader';
import { SwCategory } from '../../../enums/enums';
import Film from '../film/film';
import Man from '../man/man';
import Planet from '../planet/planet';
import Species from '../species/species';
import Starship from '../starship/starship';
import Vehicle from '../vehicle/vehicle';
import { NOT_FOUND_MESSAGE } from '../../../utils/load-data';

const ItemDetails: FC = () => {
  const { category, itemId } = useParams();
  const itemLoader = useItemLoader(String(category) as SwCategory, String(itemId));
  const { status, error, data } = itemLoader;
  const navigate = useNavigate();
  const location = useLocation();

  const element = useMemo(() => {
    if (category && data) {
      const cases = {
        [SwCategory.films]: <Film {...(data as FilmType)} />,
        [SwCategory.people]: <Man {...(data as ManType)} />,
        [SwCategory.planets]: <Planet {...(data as PlanetType)} />,
        [SwCategory.species]: <Species {...(data as SpeciesType)} />,
        [SwCategory.starships]: <Starship {...(data as StarshipType)} />,
        [SwCategory.vehicles]: <Vehicle {...(data as VehicleType)} />,
      };

      return cases[category as SwCategory];
    }
  }, [category, data]);

  const content = useMemo(() => {
    const cases = {
      idle: null,
      loading: (
        <Loader classMods={{ ['full-space']: true, size: 'lg' }} className="item-details__loader" />
      ),
      error: <h2>Error occurred while loading: {error}</h2>,
      success: data ? <>{element}</> : <h2>No item was found</h2>,
    };

    return cases[status];
  }, [status, data, error, element]);

  const handleClick = useCallback(() => {
    navigate(`/${category}/${location.search}`, { relative: 'path' });
  }, [navigate, category, location]);

  if (itemLoader.error === NOT_FOUND_MESSAGE) throw new Error(NOT_FOUND_MESSAGE);

  return (
    <div className="item-details">
      <Button
        classMods={{ view: 'primary' }}
        onClick={handleClick}
        className="item-details__close-btn">
        Close
      </Button>
      {content}
    </div>
  );
};

export default ItemDetails;
