import './item-details.scss';
import { FC, useMemo } from 'react';
import Button from '../../shared/button/button';
import { useParams } from 'react-router';
import useItemLoader from '../../../hooks/use-item-loader';
import Loader from '../../shared/loader/loader';
import { SwCategory } from '../../../enums/enums';

const ItemDetails: FC = () => {
  const { category, itemId } = useParams();
  const itemLoader = useItemLoader(String(category) as SwCategory, String(itemId));
  const { status, error, data } = itemLoader;

  const content = useMemo(() => {
    const cases = {
      idle: null,
      loading: <Loader className="search-results__loader" />,
      error: <h2>Error occurred while loading: {error}</h2>,
      success: data ? <>{JSON.stringify(data)}</> : <h2>No item was found</h2>,
    };

    return cases[status];
  }, [status, data, error]);

  return (
    <div className="item-details">
      <Button classMods={{ view: 'primary' }} className="item-details__close-btn">
        Close
      </Button>
      {content}
    </div>
  );
};

export default ItemDetails;
