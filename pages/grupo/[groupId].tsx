// Libraries
import { useState } from 'react';
import { getProviders } from 'next-auth/react';

// Types
import { NextPage, GetServerSidePropsContext } from 'next';
import { LiteralUnion, ClientSafeProvider } from 'next-auth/react';
import { BuiltInProviderType } from 'next-auth/providers';

// Request
import getGroup, { GroupInfo } from 'request/prisma/groups/getGroup';

// Components
import Header from 'screens/group/Header';
import GroupData from 'screens/group/GroupData';
import LoginReusable from 'screens/login/LoginReusable';

interface IGroupPageProps {
  group: GroupInfo;
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  >;
}

export enum GroupScreens {
  group = 'group',
  login = 'login',
}

const GroupPage: NextPage<IGroupPageProps> = ({ group, providers }) => {
  const [screen, setScreen] = useState<keyof typeof GroupScreens>('group');

  return (
    <div className="w-full min-h-screen relative flex flex-col">
      <Header className="hidden lg:inline-flex" setScreen={setScreen} />
      {screen === GroupScreens.group && (
        <GroupData group={group} setScreen={setScreen} />
      )}
      {screen === GroupScreens.login && (
        <LoginReusable
          providers={providers}
          callbackUrl={`/grupo/${group!.id}`}
        />
      )}
    </div>
  );
};

export const getServerSideProps = async ({
  query,
}: GetServerSidePropsContext) => {
  const { groupId } = query;
  const providers = await getProviders();

  const group = await getGroup({ groupId: groupId as string });

  return {
    props: {
      group: group,
      providers,
    },
  };
};

export default GroupPage;
