// Types
import { NextPage, GetServerSidePropsContext } from 'next';

// Request
import getGroup, { GroupInfo } from 'request/prisma/groups/getGroup';

// Components

interface IJoinPageProps {
  group: GroupInfo;
}

const JoinPage: NextPage<IJoinPageProps> = ({ group }) => {
  return <div></div>;
};

export const getServerSideProps = async ({
  query,
}: GetServerSidePropsContext) => {
  const { groupId } = query;

  const group = await getGroup({ groupId: groupId as string });

  return {
    props: {
      group: group,
    },
  };
};

export default JoinPage;
