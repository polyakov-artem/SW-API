import './search.scss';
import { FC, useEffect } from 'react';
import SearchHeader from '../search-header/search-header';
import SearchResults from '../search-results/search-results';
import { Outlet, useParams } from 'react-router';
import { selectOptions } from '../../../constants/constants';
import useParamsForItemsSearch from '../../../hooks/use-params-for-items-search';
import classNames from 'classnames';
import { SwCategory } from '../../../enums/enums';
import {
  useGetFilmsQuery,
  useGetPeopleQuery,
  useGetPlanetsQuery,
  useGetSpeciesQuery,
  useGetStarshipsQuery,
} from '../../../store/api';
import { useAppDispatch } from '../../../hooks/store-hooks';
import {
  itemsLoadingFailed,
  itemsLoadingFinished,
  itemsLoadingStarted,
} from '../../../store/items-loader-slice';

const BASE_CLASS_NAME = 'search';
const searchWithDetailsClassName = `${BASE_CLASS_NAME}_has-details`;
const searchHeaderClassName = `${BASE_CLASS_NAME}__search-header`;

const Search: FC = () => {
  const paramsForItemsSearch = useParamsForItemsSearch();
  const { search, category } = paramsForItemsSearch;
  const { itemId } = useParams();
  const dispatch = useAppDispatch();

  const filmsLoader = useGetFilmsQuery(paramsForItemsSearch, {
    skip: category !== SwCategory.films,
  });
  const peopleLoader = useGetPeopleQuery(paramsForItemsSearch, {
    skip: category !== SwCategory.people,
  });
  const planetsLoader = useGetPlanetsQuery(paramsForItemsSearch, {
    skip: category !== SwCategory.planets,
  });
  const speciesLoader = useGetSpeciesQuery(paramsForItemsSearch, {
    skip: category !== SwCategory.species,
  });
  const starshipsLoader = useGetStarshipsQuery(paramsForItemsSearch, {
    skip: category !== SwCategory.starships,
  });

  const vehiclesLoader = useGetStarshipsQuery(paramsForItemsSearch, {
    skip: category !== SwCategory.vehicles,
  });

  const loaders = {
    [SwCategory.films]: filmsLoader,
    [SwCategory.people]: peopleLoader,
    [SwCategory.planets]: planetsLoader,
    [SwCategory.species]: speciesLoader,
    [SwCategory.starships]: starshipsLoader,
    [SwCategory.vehicles]: vehiclesLoader,
  };

  const { isUninitialized, isFetching, isError, isSuccess, error, data } = loaders[category];
  const isLoading = isUninitialized || isFetching;

  useEffect(() => {
    if (isLoading) {
      dispatch(itemsLoadingStarted());
      return;
    }

    if (isError) {
      dispatch(itemsLoadingFailed(error));
      return;
    }

    if (isSuccess) {
      dispatch(itemsLoadingFinished(data));
      return;
    }
  }, [isLoading, isError, error, isSuccess, data, dispatch]);

  const searchClassNames = classNames(BASE_CLASS_NAME, 'container', {
    [searchWithDetailsClassName]: !!itemId,
  });

  return (
    <div className={searchClassNames}>
      <SearchHeader
        className={searchHeaderClassName}
        options={selectOptions}
        initialCategory={category}
        initialSearch={search}
      />
      <SearchResults />
      <Outlet />
    </div>
  );
};

export default Search;
