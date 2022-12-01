// Libraries
import { useEffect, useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import useSWR from 'swr';

// Request
import AxiosGetUserApp from 'request/local_next/app/AxiosGetUserApp';

const useApp = () => {
  const { data: session, status } = useSession();
  const [userLoaded, setUserLoaded] = useState(false);

  const {
    data: app,
    error,
    mutate,
  } = useSWR(
    status === 'authenticated'
      ? [`/app/getUserApp/${session.user!.id}`, session.user!.id]
      : null,
    AxiosGetUserApp
  );

  useEffect(() => {
    if (error) {
      signOut();
    }
  }, [error]);

  useEffect(() => {
    if (status === 'authenticated' && app) {
      setUserLoaded(true);
    } else {
      setUserLoaded(false);
    }
  }, [status, app]);

  console.log('session status', status);
  console.log('userLoaded', userLoaded);

  return {
    user: app?.user,
    movements: app?.movements,
    userLoaded,
    error,
    refreshUser: () => mutate(),
  };
};

export default useApp;
