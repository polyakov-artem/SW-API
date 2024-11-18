import { FC, useMemo } from 'react';
import './results-list.scss';
import { CorrectResponseResultsType, ItemsSearchQueryType } from '../../../types/types';
import ResultsItem from '../results-item/results-item';

type ResultListPropsType = {
  items: CorrectResponseResultsType;
  searchQuery: ItemsSearchQueryType;
};

type ItemType = { name: string } | { title: string };

const BASE_CLASS_NAME = 'results-list';

const getTitle = (item: ItemType) => {
  if ('title' in item) {
    return item.title;
  }

  return item.name;
};

const compareFn = (item1: ItemType, item2: ItemType) => {
  return getTitle(item1).localeCompare(getTitle(item2));
};

const ResultsList: FC<ResultListPropsType> = ({ items, searchQuery }) => {
  const sorted = useMemo(() => items.sort(compareFn), [items]);

  return (
    <ul className={BASE_CLASS_NAME}>
      {sorted.map((item) => {
        const title = getTitle(item);
        return (
          <ResultsItem key={item.url} title={title} url={item.url} searchQuery={searchQuery} />
        );
      })}
    </ul>
  );
};

export default ResultsList;
