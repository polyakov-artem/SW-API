import './not-found-banner.scss';
import { FC } from 'react';
import Button from '../button/button';
import { useNavigate } from 'react-router';
import { PUBLIC_PATH } from '../../../constants/constants';

const NotFoundBanner: FC = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found-banner">
      <h1>The requested page was not found</h1>
      <Button classMods={{ view: 'primary' }} onClick={() => navigate(PUBLIC_PATH)}>
        Home
      </Button>
    </div>
  );
};

export default NotFoundBanner;
