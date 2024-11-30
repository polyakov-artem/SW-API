import { ChangeEvent, FC, useCallback, useState } from 'react';
import Select, { OptionsType } from '../../shared/select/select';
import Input from '../../shared/input/input';
import Button from '../../shared/button/button';
import SvgIcon from '../../shared/svg-icon/svg-icon';
import { SavedSearchType, SubmitHandlerType } from '../../../types/types';
import './search-header.scss';
import { SwCategory } from '../../../enums/enums';
import swService from '../../../services/sw-service';

interface SearchHeaderPropsType {
  options: OptionsType;
  initialCategory: SwCategory;
  initialSearch: string;
  onSubmit?: (searchState: SavedSearchType) => void;
}

const SearchHeader: FC<SearchHeaderPropsType> = ({
  options,
  initialCategory,
  initialSearch,
  onSubmit,
}) => {
  const [state, setState] = useState<SavedSearchType>({
    search: initialSearch || '',
    category: options.find((option) => option.value === initialCategory)
      ? initialCategory
      : (options[0].value as SwCategory),
  });

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.currentTarget;

    setState((prevState) => {
      if (name === 'category') {
        return { search: '', [name]: value as SwCategory };
      }
      return { ...prevState, [name]: value };
    });
  }, []);

  const handleSubmit: SubmitHandlerType = useCallback(
    (e) => {
      e.preventDefault();
      const { search, category } = state;
      const trimmedSearch = search.trim();
      const nextState = { search: trimmedSearch, category };
      setState(nextState);
      swService.saveSearch(nextState);
      onSubmit?.(nextState);
    },
    [onSubmit, state]
  );

  const { category, search } = state;

  return (
    <div className="search-header">
      <h1 className="search-header__heading">Enter your search request</h1>
      <form className="search-header__field" onSubmit={handleSubmit}>
        <Select
          options={options}
          classMods={{ view: 'primary' }}
          controlProps={{ onChange: handleChange, value: category, name: 'category' }}
        />
        <Input
          controlProps={{
            name: 'search',
            onChange: handleChange,
            value: search,
          }}
          classMods={{ view: 'primary' }}
          className="search-header__input"
        />
        <Button icon={<SvgIcon classMods={{ view: 'search' }} />} classMods={{ view: 'primary' }}>
          Search
        </Button>
      </form>
    </div>
  );
};

export default SearchHeader;
