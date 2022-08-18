// Libraries
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import useSWR from 'swr';

// Types
import { UserApp } from 'request/prisma/app/getUserApp';

// Request
import AxiosGetUserApp from 'request/local_next/app/AxiosGetUserApp';

const useApp = () => {
  const { data: session, status } = useSession();
  const [userLoaded, setUserLoaded] = useState(false);

  const {
    data: user,
    error,
    mutate,
  } = useSWR(
    status === 'authenticated'
      ? [`/api/users/${session.user!.id}`, session.user!.id]
      : null,
    AxiosGetUserApp
  );

  useEffect(() => {
    if (status === 'authenticated' && user) setUserLoaded(true);
  }, [session, user]);

  useEffect(() => {
    if (status === 'unauthenticated' || status === 'loading')
      setUserLoaded(false);
  }, [status]);

  return {
    user: user as UserApp,
    userLoaded,
    error,
    refreshUser: () => mutate(),
  };
};

export default useApp;
