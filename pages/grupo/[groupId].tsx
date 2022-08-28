// Libraries
import { useState } from 'react';
import { getProviders } from 'next-auth/react';

// Types
import { NextPage, GetServerSidePropsContext } from 'next';
import { LiteralUnion, ClientSafeProvider } from 'next-auth/react';
import { BuiltInProviderType } from 'next-auth/providers';

// Request
import getGroup, { GroupInfo } from 'request/prisma/groups/getGroup';
import getAllPaymentMethods, {
  PaymentMethod,
} from 'request/prisma/paymentMethod/getAllPaymentMethods';

// Components
import Header from 'screens/group/header/Header';
import GroupData from 'screens/group/GroupData';
import LoginReusable from 'screens/login/LoginReusable';
import MetaCustom from 'components/seo/MetaCustom';
import PayModal from 'screens/group/PayModal';

interface IGroupPageProps {
  group: GroupInfo;
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  >;
  paymentMethods: PaymentMethod[];
}

export enum GroupScreens {
  group = 'group',
  login = 'login',
}

const GroupPage: NextPage<IGroupPageProps> = ({
  group,
  providers,
  paymentMethods,
}) => {
  const [screen, setScreen] = useState<keyof typeof GroupScreens>('group');
  const [showPayModal, setShowPayModal] = useState(false);

  return (
    <>
      <MetaCustom
        title={`Comparte ${group!.plan.service.name} en Konto`}
        description={`Ahorra hasta un 70% en ${
          group!.plan.service.name
        } comprando en grupo en Konto`}
        imageUrl="https://kontope.com/landing.jpg"
        imageAlt={`Konto`}
        url={`/grupo/${group!.id}`}
      />

      <div className="w-full min-h-screen relative flex flex-col">
        <Header className="hidden lg:inline-flex" setScreen={setScreen} />

        {screen === GroupScreens.group && (
          <GroupData
            group={group}
            setScreen={setScreen}
            setShowPayModal={setShowPayModal}
          />
        )}
        {screen === GroupScreens.login && (
          <LoginReusable
            providers={providers}
            callbackUrl={`/grupo/${group!.id}`}
          />
        )}

        <PayModal
          group={group}
          paymentMethods={paymentMethods}
          showPayModal={showPayModal}
          setShowPayModal={setShowPayModal}
        />
      </div>
    </>
  );
};

export const getServerSideProps = async ({
  query,
}: GetServerSidePropsContext) => {
  const { groupId } = query;

  const [providers, group, paymentMethods] = await Promise.all([
    getProviders(),
    getGroup(groupId as string),
    getAllPaymentMethods(),
  ]);

  return {
    props: {
      group,
      providers,
      paymentMethods,
    },
  };
};

export default GroupPage;
