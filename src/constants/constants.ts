import { SwCategory } from '../enums/enums';
import { capitalizeWord } from '../utils/capitalize-word';

export const PUBLIC_PATH = '/SW-API/';

export const selectOptions = Object.values(SwCategory).map((category) => ({
  label: capitalizeWord(category),
  value: category,
}));
