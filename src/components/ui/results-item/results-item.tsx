import { FC } from 'react';
import { Link } from 'react-router-dom';
import './results-item.scss';
import { ItemsSearchQueryType } from '../../../types/types';

export interface ResultsItemProps {
  title: string;
  url: string;
  searchQuery: ItemsSearchQueryType;
}

const BASE_CLASS_NAME = 'results-item';
const itemLink = `${BASE_CLASS_NAME}__link`;

const ResultsItem: FC<ResultsItemProps> = ({ title, url, searchQuery }) => {
  const id = url.match(/\/(\d+)\/$/)?.[1] || '';
  const { search, category, page } = searchQuery;

  return (
    <li className={BASE_CLASS_NAME}>
      <Link
        className={itemLink}
        to={`/${category}/${id}/?search=${search}&page=${page}`}
        relative="path">
        {title}
      </Link>
    </li>
  );
};

export default ResultsItem;
