// Libraries
import { useSelector, useDispatch } from 'react-redux';

// Types
import { AppRedux } from 'types/AppRedux';

// Redux
import { updateApp, appSelector } from 'redux/appSlice';

const useApp = () => {
  const dispatch = useDispatch();
  const app = useSelector(appSelector);

  const updateAppRedux = (payload: AppRedux) => {
    dispatch(updateApp(payload));
  };

  return { app, updateAppRedux };
};

export default useApp;
