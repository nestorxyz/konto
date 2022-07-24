// Types
import type { NextPage, GetServerSideProps } from 'next';
import { GroupCardInfo } from 'request/prisma/groups/getAllGroups';
import { Plan } from 'request/prisma/plans/getAllPlans';

// Hooks
import { useSession } from 'next-auth/react';

// Helpers
import mixpanel from 'lib/mixpanel';

// Request
import getAllGroups from 'request/prisma/groups/getAllGroups';
import getAllPlans from 'request/prisma/plans/getAllPlans';

// Components
import Landing from 'screens/landing';
import Dashboard from 'screens/dashboard';
import MetaDefault from 'components/seo/MetaDefault';
import PageLoading from 'components/loaders/PageLoading';
import { useEffect } from 'react';

type HomeProps = {
  groups: GroupCardInfo[];
  plans: Plan[];
};

const Home: NextPage<HomeProps> = ({ groups, plans }) => {
  const { status } = useSession();

  useEffect(() => {
    if (status === 'unauthenticated') mixpanel.track('Landing Hit');
    if (status === 'authenticated') mixpanel.track('Dashboard Hit');
  }, []);

  if (status === 'authenticated') {
    return (
      <>
        <MetaDefault />
        <Dashboard />
      </>
    );
  }

  if (status === 'unauthenticated') {
    return (
      <>
        <MetaDefault />
        <Landing groups={groups} plans={plans} />
      </>
    );
  }

  return <PageLoading />;
};

export const getServerSideProps: GetServerSideProps = async () => {
  const groups: GroupCardInfo[] = await getAllGroups();
  const plans = await getAllPlans();

  return {
    props: {
      groups: groups,
      plans: plans,
    },
  };
};

export default Home;
