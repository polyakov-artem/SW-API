import './item-details.scss';
import { FC, useCallback, useEffect, useMemo } from 'react';
import Button from '../../shared/button/button';
import { useLocation, useNavigate } from 'react-router';
import { TFilm, TMan, TPlanet, TSpecies, TStarship, TVehicle } from '../../../types/types';
import Loader from '../../shared/loader/loader';
import { SwCategory } from '../../../enums/enums';
import Film from '../film/film';
import Man from '../man/man';
import Planet from '../planet/planet';
import Species from '../species/species';
import Starship from '../starship/starship';
import Vehicle from '../vehicle/vehicle';
import { PUBLIC_PATH } from '../../../constants/constants';
import useParamsForItemFetch from '../../../hooks/use-params-for-item-fetch';
import {
  useFetchFilmQuery,
  useFetchManQuery,
  useFetchPlanetQuery,
  useFetchSpeciesQuery,
  useFetchStarshipQuery,
  useFetchVehicleQuery,
} from '../../../store/api';
import { useAppDispatch } from '../../../hooks/store-hooks';
import {
  itemFetchBegan,
  itemFetchFailed,
  itemFetchSucceeded,
} from '../../../store/item-fetcher-slice';
import { getFetchBaseQueryErrorMsg } from '../../../utils/getFetchBaseQueryErrorMsg';

const ItemDetails: FC = () => {
  const paramsForItemFetch = useParamsForItemFetch();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { category } = paramsForItemFetch;

  const filmFetcher = useFetchFilmQuery(paramsForItemFetch, {
    skip: category !== SwCategory.films,
  });
  const manFetcher = useFetchManQuery(paramsForItemFetch, {
    skip: category !== SwCategory.people,
  });
  const planetFetcher = useFetchPlanetQuery(paramsForItemFetch, {
    skip: category !== SwCategory.planets,
  });
  const speciesFetcher = useFetchSpeciesQuery(paramsForItemFetch, {
    skip: category !== SwCategory.species,
  });
  const starshipFetcher = useFetchStarshipQuery(paramsForItemFetch, {
    skip: category !== SwCategory.starships,
  });

  const vehicleFetcher = useFetchVehicleQuery(paramsForItemFetch, {
    skip: category !== SwCategory.vehicles,
  });

  const fetchers = {
    [SwCategory.films]: filmFetcher,
    [SwCategory.people]: manFetcher,
    [SwCategory.planets]: planetFetcher,
    [SwCategory.species]: speciesFetcher,
    [SwCategory.starships]: starshipFetcher,
    [SwCategory.vehicles]: vehicleFetcher,
  };

  const { isUninitialized, isFetching, isError, isSuccess, error, data } = fetchers[category];
  const isLoading = isUninitialized || isFetching;

  useEffect(() => {
    if (isLoading) {
      dispatch(itemFetchBegan());
      return;
    }

    if (isError) {
      dispatch(itemFetchFailed(error));
      return;
    }

    if (isSuccess) {
      dispatch(itemFetchSucceeded(data));
      return;
    }
  }, [isLoading, isError, error, isSuccess, data, dispatch]);

  const element = useMemo(() => {
    const cases = {
      [SwCategory.films]: <Film {...(data as TFilm)} />,
      [SwCategory.people]: <Man {...(data as TMan)} />,
      [SwCategory.planets]: <Planet {...(data as TPlanet)} />,
      [SwCategory.species]: <Species {...(data as TSpecies)} />,
      [SwCategory.starships]: <Starship {...(data as TStarship)} />,
      [SwCategory.vehicles]: <Vehicle {...(data as TVehicle)} />,
    };

    return cases[category as SwCategory];
  }, [category, data]);

  const handleClick = useCallback(() => {
    navigate(`${PUBLIC_PATH}${category}/${location.search}`, { relative: 'path' });
  }, [navigate, category, location]);

  return (
    <div className="item-details">
      <Button
        classMods={{ view: 'primary' }}
        onClick={handleClick}
        className="item-details__close-btn">
        Close
      </Button>
      {isLoading ? (
        <Loader classMods={{ ['full-space']: true, size: 'lg' }} className="item-details__loader" />
      ) : isError ? (
        <h2>Error occurred while loading: {getFetchBaseQueryErrorMsg(error)}</h2>
      ) : (
        element
      )}
    </div>
  );
};

export default ItemDetails;
