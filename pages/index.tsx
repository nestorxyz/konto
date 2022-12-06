// Types
import type { NextPage, GetServerSideProps, GetStaticProps } from 'next';
import { GroupCardInfo } from 'request/prisma/groups/getAllGroups';
import { Plan } from 'request/prisma/plans/getAllPlans';

// Hooks
import { useSession } from 'next-auth/react';
import useApp from 'hooks/useApp';

// Request
import getAllGroups from 'request/prisma/groups/getAllGroups';
import getAllPlans from 'request/prisma/plans/getAllPlans';

// Components
import Landing from 'screens/landing';
import Dashboard from 'screens/dashboard';
import MetaDefault from 'components/seo/MetaDefault';
import PageLoading from 'components/loaders/PageLoading';

type HomeProps = {
  groups: GroupCardInfo[];
  plans: Plan[];
};

const Home: NextPage<HomeProps> = ({ groups, plans }) => {
  const { status } = useSession();
  const { userLoaded } = useApp();

  if (status !== 'unauthenticated') {
    if (!userLoaded) {
      return <PageLoading />;
    } else {
      return (
        <>
          <MetaDefault />
          <Dashboard />
        </>
      );
    }
  }

  return (
    <>
      <MetaDefault />
      <Landing groups={groups} plans={plans} />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const groups: GroupCardInfo[] = await getAllGroups();
  const plans = await getAllPlans();

  return {
    props: {
      groups: groups,
      plans: plans,
    },
    revalidate: 60 * 60 * 24, // Revalidate every 24 hours
  };
};

export default Home;
