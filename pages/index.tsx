// Types
import type { NextPage, GetServerSideProps } from 'next';
import { GroupCardInfo } from 'request/prisma/groups/getAllGroups';
import { Plan } from 'request/prisma/plans/getAllPlans';

// Hooks
import { useSession } from 'next-auth/react';

// Components
import Landing from 'screens/landing';
import Dashboard from 'screens/dashboard';
import MetaDefault from 'components/seo/MetaDefault';

// Request
import getAllGroups from 'request/prisma/groups/getAllGroups';
import getAllPlans from 'request/prisma/plans/getAllPlans';

type HomeProps = {
  groups: GroupCardInfo[];
  plans: Plan[];
};

const Home: NextPage<HomeProps> = ({ groups, plans }) => {
  const { status } = useSession();

  if (status === 'authenticated') {
    return (
      <>
        <MetaDefault />
        <Dashboard />
      </>
    );
  }

  return (
    <>
      <MetaDefault />
      <Landing groups={groups} plans={plans} />
    </>
  );
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
