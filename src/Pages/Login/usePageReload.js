import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const usePageReload = () => {
  const location = useLocation();

  useEffect(() => {
    window.location.reload();
  }, [location]);
};

export default usePageReload;
