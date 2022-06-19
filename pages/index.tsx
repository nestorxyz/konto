// Types
import type { NextPage, GetServerSideProps } from 'next';
import { GroupCardInfo } from 'request/groups/getAllGroups';

// Hooks
import { useSession } from 'next-auth/react';

// Components
import Landing from 'screens/landing';
import Dashboard from 'screens/dashboard';

// Request
import getAllGroups from 'request/groups/getAllGroups';

type HomeProps = {
  groups: GroupCardInfo[];
};

const Home: NextPage<HomeProps> = ({ groups }) => {
  const { status } = useSession();

  if (status === 'authenticated') {
    return <Dashboard />;
  }
  return <Landing groups={groups} />;
};

export const getServerSideProps: GetServerSideProps = async () => {
  const groups: GroupCardInfo[] = await getAllGroups();

  return {
    props: {
      groups: groups,
    },
  };
};

export default Home;
