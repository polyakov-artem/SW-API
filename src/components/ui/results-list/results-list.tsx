import { FC, useCallback, useMemo } from 'react';
import './results-list.scss';
import { TGetItemsResponsesMap, TItemsQuery } from '../../../types/types';
import ResultsItem, { ResultsItemProps } from '../results-item/results-item';
import { SwCategory } from '../../../enums/enums';
import { useAppDispatch, useAppSelector } from '../../../hooks/store-hooks';
import {
  addDownloadItem,
  deleteDownloadItem,
  selectDownloadItems,
} from '../../../store/download-items-slice';

export type TResultListProps = {
  items: TGetItemsResponsesMap[SwCategory]['results'];
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
  const sorted = useMemo(() => [...items].sort(compareFn), [items]);
  const dispatch = useAppDispatch();
  const downloadItems = useAppSelector(selectDownloadItems);

  const handleChange = useCallback<ResultsItemProps['onChange']>(
    (item) => {
      const { url } = item;

      if (downloadItems[url]) {
        dispatch(deleteDownloadItem(url));
      } else {
        dispatch(addDownloadItem(item));
      }
    },
    [dispatch, downloadItems]
  );

  return (
    <ul className={BASE_CLASS_NAME}>
      {sorted.map((item) => {
        const title = getTitle(item);
        return (
          <ResultsItem
            key={item.url}
            title={title}
            item={item}
            searchQuery={searchQuery}
            onChange={handleChange}
            checkboxIsChecked={item.url in downloadItems}
          />
        );
      })}
    </ul>
  );
};

export default ResultsList;
