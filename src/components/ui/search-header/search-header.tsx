import { ChangeEvent, FC, useCallback, useState } from 'react';
import Select, { TOptions } from '../../shared/select/select';
import Input from '../../shared/input/input';
import Button from '../../shared/button/button';
import SvgIcon from '../../shared/svg-icon/svg-icon';
import { TSavedSearch, TSubmitHandler } from '../../../types/types';
import './search-header.scss';
import { SwCategory } from '../../../enums/enums';
import swService from '../../../services/sw-service';
import { useNavigate } from 'react-router';
import { PUBLIC_PATH } from '../../../constants/constants';
import { useAppDispatch } from '../../../hooks/store-hooks';
import { removeDownloadItems } from '../../../store/download-items-slice';

export interface TSearchHeaderProps {
  options: TOptions;
  initialCategory: SwCategory;
  initialSearch: string;
  className?: string;
}

const SearchHeader: FC<TSearchHeaderProps> = ({
  options,
  initialCategory,
  initialSearch,
  className,
}) => {
  const [state, setState] = useState<TSavedSearch>({
    search: initialSearch || '',
    category: options.find((option) => option.value === initialCategory)
      ? initialCategory
      : (options[0].value as SwCategory),
  });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.currentTarget;

    setState((prevState) => {
      if (name === 'category') {
        return { search: '', [name]: value as SwCategory };
      }
      return { ...prevState, [name]: value };
    });
  }, []);

  const handleSubmit: TSubmitHandler = useCallback(
    (e) => {
      e.preventDefault();
      const { search, category } = state;
      const trimmedSearch = search.trim();
      const nextState = { search: trimmedSearch, category };
      setState(nextState);
      swService.saveSearch(nextState);
      navigate(`${PUBLIC_PATH}${category}/?search=${trimmedSearch}&page=1`, { relative: 'path' });
      dispatch(removeDownloadItems());
    },
    [state, navigate, dispatch]
  );

  const { category, search } = state;

  return (
    <div className={`search-header${className ? ' ' + className : ''}`}>
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
