import { http, HttpResponse } from 'msw';
import {
  filmData,
  manData,
  planetData,
  responses,
  speciesData,
  starshipData,
  vehicleData,
} from '../mocks/constants';
import { BASE_URL } from '../../src/services/http-service';

export const handlers = [
  http.get(`${BASE_URL}films/`, ({ request }) => {
    const url = new URL(request.url);
    const page = url.searchParams.get('page');
    const search = url.searchParams.get('search');

    if (!search) {
      if (page === '1') {
        return HttpResponse.json(responses.emptySearch.category.films[0]);
      }
    }

    if (search === 'a') {
      return HttpResponse.json(responses.notEmptySearch.category.films[0]);
    }
  }),

  http.get(`${BASE_URL}people/`, ({ request }) => {
    const url = new URL(request.url);
    const page = url.searchParams.get('page');
    const search = url.searchParams.get('search');

    if (!search) {
      if (page === '1') {
        return HttpResponse.json(responses.emptySearch.category.people[0]);
      }
      if (page === '2') {
        return HttpResponse.json(responses.emptySearch.category.people[1]);
      }
    }

    if (search === 'a') {
      if (page === '1') {
        return HttpResponse.json(responses.notEmptySearch.category.people[0]);
      }
      if (page === '2') {
        return HttpResponse.json(responses.notEmptySearch.category.people[1]);
      }
    }
  }),

  http.get(`${BASE_URL}films/1`, () => {
    return HttpResponse.json(filmData);
  }),

  http.get(`${BASE_URL}people/1`, () => {
    return HttpResponse.json(manData);
  }),

  http.get(`${BASE_URL}planets/1`, () => {
    return HttpResponse.json(planetData);
  }),

  http.get(`${BASE_URL}species/1`, () => {
    return HttpResponse.json(speciesData);
  }),

  http.get(`${BASE_URL}starships/1`, () => {
    return HttpResponse.json(starshipData);
  }),

  http.get(`${BASE_URL}vehicles/1`, () => {
    return HttpResponse.json(vehicleData);
  }),

  http.get('*', async () => {
    return new HttpResponse(null, {
      status: 404,
      statusText: 'Not found',
    });
  }),
];
