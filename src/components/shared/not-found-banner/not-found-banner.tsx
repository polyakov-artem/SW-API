import './not-found-banner.scss';
import { FC } from 'react';
import Button from '../button/button';
import { useNavigate } from 'react-router';

const NotFoundBanner: FC = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found-banner">
      <h1>The requested page was not found</h1>
      <Button onClick={() => navigate('/')}>Home</Button>
    </div>
  );
};

export default NotFoundBanner;
