import { FC } from 'react';
import { Link } from 'react-router-dom';
import './results-item.scss';
import { TItem, TItemsQuery } from '../../../types/types';
import { PUBLIC_PATH } from '../../../constants/constants';
import Checkbox from '../../shared/checkbox/checkbox';

export interface ResultsItemProps {
  title: string;
  item: TItem;
  searchQuery: TItemsQuery;
  checkboxIsChecked: boolean;
  onChange: (item: TItem) => void;
}

export const BASE_CLASS_NAME = 'results-item';
export const itemLink = `${BASE_CLASS_NAME}__link`;

const ResultsItem: FC<ResultsItemProps> = ({
  checkboxIsChecked,
  title,
  item,
  searchQuery,
  onChange,
}) => {
  const id = item.url.match(/\/(\d+)\/$/)?.[1] || '';
  const { search, category, page } = searchQuery;

  const handleChange = () => {
    onChange(item);
  };

  return (
    <li className={BASE_CLASS_NAME}>
      <Link
        className={itemLink}
        to={`${PUBLIC_PATH}${category}/${id}/?search=${search}&page=${page}`}
        relative="path">
        {title}
      </Link>
      <Checkbox
        classMods={{ view: 'primary' }}
        controlProps={{ checked: checkboxIsChecked, onChange: handleChange }}></Checkbox>
    </li>
  );
};

export default ResultsItem;
