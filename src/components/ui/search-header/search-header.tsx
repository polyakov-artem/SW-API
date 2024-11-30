import { ChangeEvent, Component } from 'react';
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

interface SearchHeaderStateType {
  search: string;
  category: SwCategory;
}

class SearchHeader extends Component<SearchHeaderPropsType, SearchHeaderStateType> {
  state = {
    search: this.props.initialSearch,
    category: this.props.initialCategory,
  };

  handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.currentTarget;
    this.setState((prevState) => {
      if (name === 'category') {
        return { search: '', [name]: value as SwCategory };
      }
      return { ...prevState, [name]: value };
    });
  };

  handleSubmit: SubmitHandlerType = (e) => {
    e.preventDefault();
    const { search, category } = this.state;
    const trimmedSearch = search.trim();
    const nextState = { search: trimmedSearch, category };
    this.setState(nextState);
    swService.saveSearch(nextState);
    this.props.onSubmit?.(nextState);
  };

  render() {
    const { options } = this.props;
    const { category, search } = this.state;

    return (
      <div className="search-header">
        <h1 className="search-header__heading">Enter your search request</h1>
        <form className="search-header__field" onSubmit={this.handleSubmit}>
          <Select
            options={options}
            classMods={{ view: 'primary' }}
            controlProps={{ onChange: this.handleChange, value: category, name: 'category' }}
          />
          <Input
            controlProps={{
              name: 'search',
              onChange: this.handleChange,
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
  }
}

export default SearchHeader;
