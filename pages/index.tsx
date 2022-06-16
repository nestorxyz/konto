// Types
import type { NextPage, GetServerSideProps } from 'next';
import { GroupCardInfo } from 'request/groups/getAllGroups';

// Libraries
import { useSession } from 'next-auth/react';

// Components
import Landing from 'screens/landing';

// Request
import getAllGroups from 'request/groups/getAllGroups';

type HomeProps = {
  groups: GroupCardInfo[];
};

const Home: NextPage<HomeProps> = ({ groups }) => {
  const { data: session } = useSession();

  console.log(groups);

  if (session) {
    return (
      <>
        Signed in as {session?.user?.email} <br />
      </>
    );
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
