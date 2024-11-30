import { render, screen } from '@testing-library/react';
import { vehicleData } from '../../../../tests/mocks/constants';
import Vehicle from './vehicle';
import { VehicleType } from '../../../types/types';

describe('Vehicle', () => {
  describe('when data is passed', () => {
    test('should render data values', () => {
      const keysForRender = [
        'name',
        'model',
        'vehicle_class',
        'manufacturer',
        'length',
        'cost_in_credits',
        'crew',
        'passengers',
        'max_atmosphering_speed',
        'cargo_capacity',
        'consumables',
      ];

      render(<Vehicle {...vehicleData} />);

      keysForRender.forEach((key) => {
        const matches = screen.getAllByText(
          new RegExp(`${vehicleData[key as keyof VehicleType]}`, 'i')
        );
        matches.forEach((el) => expect(el).toBeInTheDocument());
      });
    });
  });
});
