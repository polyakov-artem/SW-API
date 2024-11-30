import { render, screen } from '@testing-library/react';
import { filmData } from '../../../../tests/mocks/constants';
import { FilmType } from '../../../types/types';
import Film from './film';

describe('Film', () => {
  describe('when data is passed', () => {
    test('should render data values', () => {
      const keysForRender = [
        'title',
        'episode_id',
        'opening_crawl',
        'director',
        'producer',
        'release_date',
      ];

      render(<Film {...filmData} />);

      keysForRender.forEach((key) => {
        let regExpText = `${filmData[key as keyof FilmType]}`;

        if (key === 'opening_crawl') regExpText = regExpText.slice(0, 10);

        const matches = screen.getAllByText(new RegExp(regExpText, 'i'));
        matches.forEach((el) => expect(el).toBeInTheDocument());
      });
    });
  });
});
