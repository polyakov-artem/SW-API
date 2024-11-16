import { ChangeEvent, Component, ReactNode } from 'react';
import Select, { OptionsType } from '../../shared/select/select';
import Input from '../../shared/input/input';
import Button from '../../shared/button/button';
import SvgIcon from '../../shared/svg-icon/svg-icon';
import { SubmitHandlerType } from '../../../types/types';
import './search-header.scss';

interface SearchHeaderPropsType {
  options: OptionsType;
  children?: ReactNode;
  initialCategory?: string;
  initialSearch?: string;
  onSubmit?: (category: string, search: string) => void;
}

interface SearchHeaderStateType {
  search: string;
  category: string;
}

class SearchHeader extends Component<SearchHeaderPropsType, SearchHeaderStateType> {
  state = { search: this.props.initialSearch || '', category: this.props.initialCategory || '' };

  handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.currentTarget;
    this.setState((prevState) => ({ ...prevState, [name]: value }));
  };

  handleSubmit: SubmitHandlerType = (e) => {
    e.preventDefault();
    this.props?.onSubmit?.(this.state.category, this.state.search);
  };

  render() {
    const { options } = this.props;
    const { category, search } = this.state;

    return (
      <div className="search-header">
        <h1 className="search-header__heading">Enter your search request</h1>
        <form className="search-header__field" onSubmit={this.handleSubmit}>
          <Select name="category" options={options} onChange={this.handleChange} value={category} />
          <Input
            name="search"
            onChange={this.handleChange}
            value={search}
            className="search-header__input"
          />
          <Button icon={<SvgIcon view="search" />}>Search</Button>
        </form>
      </div>
    );
  }
}

export default SearchHeader;
