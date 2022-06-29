// Libraries
import { useEffect, useState } from 'react';

// Types
import { User } from '@prisma/client';

// Request
import AxiosGetUserInfo from 'request/local_next/users/AxiosGetUserInfo';

// Hooks
import { useSession } from 'next-auth/react';

const useUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const { status, data: session } = useSession();

  const getUser = async () => {
    setLoading(true);
    const user = await AxiosGetUserInfo(session!.user!.id);
    setLoading(false);
    setUser(user);
  };

  useEffect(() => {
    if (status === 'unauthenticated') {
      setUser(null);
    } else if (status === 'authenticated') {
      getUser();
    }
  }, [status]);

  return { user, loading };
};

export default useUser;
