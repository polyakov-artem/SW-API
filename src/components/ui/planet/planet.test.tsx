import { render, screen } from '@testing-library/react';
import { planetData } from '../../../../tests/mocks/constants';
import { PlanetType } from '../../../types/types';
import Planet from './planet';

describe('Planet', () => {
  describe('when data is passed', () => {
    test('should render data values', () => {
      const keysForRender = [
        'name',
        'diameter',
        'rotation_period',
        'orbital_period',
        'gravity',
        'population',
        'climate',
        'terrain',
        'surface_water',
      ];

      render(<Planet {...planetData} />);

      keysForRender.forEach((key) => {
        const matches = screen.getAllByText(
          new RegExp(`${planetData[key as keyof PlanetType]}`, 'i')
        );
        matches.forEach((el) => expect(el).toBeInTheDocument());
      });
    });
  });
});
