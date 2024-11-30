import { ComponentProps } from 'react';
import { SwCategory } from '../enums/enums';

export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xlg';
export type ClassModsType = Record<string, string | boolean | undefined>;

export type InputChangeHandlerType = NonNullable<ComponentProps<'input'>['onChange']>;
export type SelectChangeHandlerType = NonNullable<ComponentProps<'select'>['onChange']>;
export type SubmitHandlerType = NonNullable<ComponentProps<'form'>['onSubmit']>;

export type SavedSearchType = {
  search: string;
  category: SwCategory;
};

export type ResponseDataType<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<T>;
};

export type EndpointsResponsesType = {
  [SwCategory.films]: ResponseDataType<FilmType>;
  [SwCategory.people]: ResponseDataType<ManType>;
  [SwCategory.planets]: ResponseDataType<PlanetType>;
  [SwCategory.species]: ResponseDataType<SpeciesType>;
  [SwCategory.starships]: ResponseDataType<StarshipType>;
  [SwCategory.vehicles]: ResponseDataType<VehicleType>;
};

export type CorrectResponseDataType = EndpointsResponsesType[SwCategory];
export type CorrectResponseResultsType = CorrectResponseDataType['results'];

export interface ManType {
  name: string;
  birth_year: string;
  eye_color: string;
  gender: string;
  hair_color: string;
  height: string;
  mass: string;
  skin_color: string;
  homeworld: string;
  films: string[];
  species: string[];
  starships: string[];
  vehicles: string[];
  url: string;
  created: string;
  edited: string;
}

export interface FilmType {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  species: string[];
  starships: string[];
  vehicles: string[];
  characters: string[];
  planets: string[];
  url: string;
  created: string;
  edited: string;
}

export interface VehicleType {
  name: string;
  model: string;
  vehicle_class: string;
  manufacturer: string;
  length: string;
  cost_in_credits: string;
  crew: string;
  passengers: string;
  max_atmosphering_speed: string;
  cargo_capacity: string;
  consumables: string;
  films: string[];
  pilots: string[];
  url: string;
  created: string;
  edited: string;
}

export interface StarshipType {
  name: string;
  model: string;
  starship_class: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  crew: string;
  passengers: string;
  max_atmosphering_speed: string;
  hyperdrive_rating: string;
  MGLT: string;
  cargo_capacity: string;
  consumables: string;
  films: string[];
  pilots: string[];
  url: string;
  created: string;
  edited: string;
}

export interface SpeciesType {
  name: string;
  classification: string;
  designation: string;
  average_height: string;
  average_lifespan: string;
  eye_colors: string;
  hair_colors: string;
  skin_colors: string;
  language: string;
  homeworld: string;
  people: string[];
  films: string[];
  url: string;
  created: string;
  edited: string;
}

export interface PlanetType {
  name: string;
  diameter: string;
  rotation_period: string;
  orbital_period: string;
  gravity: string;
  population: string;
  climate: string;
  terrain: string;
  surface_water: string;
  residents: string;
  films: string;
  url: string;
  created: string;
  edited: string;
}
