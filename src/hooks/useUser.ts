// Libraries
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Types
import { User } from '@prisma/client';

// Request
import AxiosGetUserInfo from 'request/local_next/users/AxiosGetUserInfo';

// Redux
import { userSelector, updateUser, initialState } from 'redux/userSlice';

// Hooks
import { useSession } from 'next-auth/react';

const useUser = () => {
  const dispatch = useDispatch();
  const user = useSelector(userSelector);
  const [loading, setLoading] = useState(false);
  const { status, data: session } = useSession();

  const getUser = async () => {
    setLoading(true);
    const user = await AxiosGetUserInfo(session!.user!.id);
    setUser(user);
    setLoading(false);
  };

  const setUser = (user: User) => {
    dispatch(updateUser(user));
  };

  useEffect(() => {
    if (status === 'unauthenticated') {
      setUser(initialState);
    } else if (status === 'authenticated') {
      getUser();
    }
  }, [status]);

  return { user, loading, setUser };
};

export default useUser;
