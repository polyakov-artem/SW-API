import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { SwCategory } from '../enums/enums';
import {
  TFetchItemResponsesMap,
  TGetItemsResponsesMap,
  TItemQuery,
  TItemsQuery,
} from '../types/types';

export const BASE_URL = 'https://swapi.dev/api/';

const getItemsQueryFn = (itemsQuery: TItemsQuery) => {
  const { page, search, category } = itemsQuery;

  return {
    url: `${category}`,
    params: { page, search },
    method: 'GET',
  };
};

const fetchItemQueryFn = (itemQuery: TItemQuery) => {
  const { itemId, category } = itemQuery;

  return {
    url: `${category}/${itemId}`,
    method: 'GET',
  };
};

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getFilms: builder.query<TGetItemsResponsesMap[SwCategory.films], TItemsQuery>({
      query: getItemsQueryFn,
    }),
    getPeople: builder.query<TGetItemsResponsesMap[SwCategory.people], TItemsQuery>({
      query: getItemsQueryFn,
    }),
    getPlanets: builder.query<TGetItemsResponsesMap[SwCategory.planets], TItemsQuery>({
      query: getItemsQueryFn,
    }),
    getSpecies: builder.query<TGetItemsResponsesMap[SwCategory.species], TItemsQuery>({
      query: getItemsQueryFn,
    }),
    getStarships: builder.query<TGetItemsResponsesMap[SwCategory.starships], TItemsQuery>({
      query: getItemsQueryFn,
    }),
    getVehicles: builder.query<TGetItemsResponsesMap[SwCategory.vehicles], TItemsQuery>({
      query: getItemsQueryFn,
    }),
    fetchFilm: builder.query<TFetchItemResponsesMap[SwCategory.films], TItemQuery>({
      query: fetchItemQueryFn,
    }),
    fetchMan: builder.query<TFetchItemResponsesMap[SwCategory.people], TItemQuery>({
      query: fetchItemQueryFn,
    }),
    fetchPlanet: builder.query<TFetchItemResponsesMap[SwCategory.planets], TItemQuery>({
      query: fetchItemQueryFn,
    }),
    fetchSpecies: builder.query<TFetchItemResponsesMap[SwCategory.species], TItemQuery>({
      query: fetchItemQueryFn,
    }),
    fetchStarship: builder.query<TFetchItemResponsesMap[SwCategory.starships], TItemQuery>({
      query: fetchItemQueryFn,
    }),
    fetchVehicle: builder.query<TFetchItemResponsesMap[SwCategory.vehicles], TItemQuery>({
      query: fetchItemQueryFn,
    }),
  }),
});

export const {
  useGetFilmsQuery,
  useGetPeopleQuery,
  useGetPlanetsQuery,
  useGetSpeciesQuery,
  useGetStarshipsQuery,
  useGetVehiclesQuery,
  useFetchFilmQuery,
  useFetchManQuery,
  useFetchPlanetQuery,
  useFetchSpeciesQuery,
  useFetchStarshipQuery,
  useFetchVehicleQuery,
} = api;
