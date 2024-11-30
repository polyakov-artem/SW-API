import { render, screen } from '@testing-library/react';
import { starshipData } from '../../../../tests/mocks/constants';
import { StarshipType } from '../../../types/types';
import Starship from './starship';

describe('Starship', () => {
  describe('when data is passed', () => {
    test('should render data values', () => {
      const keysForRender = [
        'name',
        'model',
        'starship_class',
        'manufacturer',
        'cost_in_credits',
        'length',
        'crew',
        'passengers',
        'max_atmosphering_speed',
        'hyperdrive_rating',
        'MGLT',
        'cargo_capacity',
        'consumables',
      ];

      render(<Starship {...starshipData} />);

      keysForRender.forEach((key) => {
        const matches = screen.getAllByText(
          new RegExp(`${starshipData[key as keyof StarshipType]}`, 'i')
        );
        matches.forEach((el) => expect(el).toBeInTheDocument());
      });
    });
  });
});
