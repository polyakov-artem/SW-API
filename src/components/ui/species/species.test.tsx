import { render, screen } from '@testing-library/react';
import { speciesData } from '../../../../tests/mocks/constants';
import { SpeciesType } from '../../../types/types';
import Species from './species';

describe('Species', () => {
  describe('when data is passed', () => {
    test('should render data values', () => {
      const keysForRender = [
        'name',
        'classification',
        'designation',
        'average_height',
        'average_lifespan',
        'eye_colors',
        'hair_colors',
        'skin_colors',
        'language',
      ];

      render(<Species {...speciesData} />);

      keysForRender.forEach((key) => {
        const matches = screen.getAllByText(
          new RegExp(`${speciesData[key as keyof SpeciesType]}`, 'i')
        );
        matches.forEach((el) => expect(el).toBeInTheDocument());
      });
    });
  });
});
