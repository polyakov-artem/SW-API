import './item-details.scss';
import { FC, useCallback, useMemo } from 'react';
import Button from '../../shared/button/button';
import { useLocation, useNavigate } from 'react-router';
import useItemLoader from '../../../hooks/use-item-loader';
import { TFilm, TMan, TPlanet, TSpecies, TStarship, TVehicle } from '../../../types/types';
import Loader from '../../shared/loader/loader';
import { SwCategory } from '../../../enums/enums';
import Film from '../film/film';
import Man from '../man/man';
import Planet from '../planet/planet';
import Species from '../species/species';
import Starship from '../starship/starship';
import Vehicle from '../vehicle/vehicle';
import { NOT_FOUND_MESSAGE } from '../../../utils/load-data';
import { PUBLIC_PATH } from '../../../constants/constants';
import useParamsForItemFetch from '../../../hooks/use-params-for-item-fetch';

const ItemDetails: FC = () => {
  const { category, itemId } = useParamsForItemFetch();
  const itemLoader = useItemLoader(String(category) as SwCategory, String(itemId));
  const { status, error, data } = itemLoader;
  const navigate = useNavigate();
  const location = useLocation();

  const element = useMemo(() => {
    if (category && data) {
      const cases = {
        [SwCategory.films]: <Film {...(data as TFilm)} />,
        [SwCategory.people]: <Man {...(data as TMan)} />,
        [SwCategory.planets]: <Planet {...(data as TPlanet)} />,
        [SwCategory.species]: <Species {...(data as TSpecies)} />,
        [SwCategory.starships]: <Starship {...(data as TStarship)} />,
        [SwCategory.vehicles]: <Vehicle {...(data as TVehicle)} />,
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
    navigate(`${PUBLIC_PATH}${category}/${location.search}`, { relative: 'path' });
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
