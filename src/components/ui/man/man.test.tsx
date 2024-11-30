import { render, screen } from '@testing-library/react';
import { manData } from '../../../../tests/mocks/constants';
import { ManType } from '../../../types/types';
import Man from './man';

describe('Man', () => {
  describe('when data is passed', () => {
    test('should render data values', () => {
      const keysForRender = [
        'name',
        'birth_year',
        'eye_color',
        'gender',
        'hair_color',
        'height',
        'mass',
        'skin_color',
      ];

      render(<Man {...manData} />);

      keysForRender.forEach((key) => {
        const matches = screen.getAllByText(new RegExp(`${manData[key as keyof ManType]}`, 'i'));
        matches.forEach((el) => expect(el).toBeInTheDocument());
      });
    });
  });
});
