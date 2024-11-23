import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('*', async () => {
    return HttpResponse.json('Response from server');
  }),
];
