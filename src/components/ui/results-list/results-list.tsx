import { FC, useMemo } from 'react';
import './results-list.scss';
import { TGetItemsResponseResults, TItemsQuery } from '../../../types/types';
import ResultsItem from '../results-item/results-item';

export type TResultListProps = {
  items: TGetItemsResponseResults;
  searchQuery: TItemsQuery;
};

type TItem = { name: string } | { title: string };

const BASE_CLASS_NAME = 'results-list';

const getTitle = (item: TItem) => {
  if ('title' in item) {
    return item.title;
  }

  return item.name;
};

const compareFn = (item1: TItem, item2: TItem) => {
  return getTitle(item1).localeCompare(getTitle(item2));
};

const ResultsList: FC<TResultListProps> = ({ items, searchQuery }) => {
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
