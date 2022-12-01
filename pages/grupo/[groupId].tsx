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
import Header from 'screens/group/Header';
import GroupData from 'screens/group/GroupData';
import LoginReusable from 'screens/login/LoginReusable';
import MetaCustom from 'components/seo/MetaCustom';
import PayModal from 'screens/group/PayModal';

interface IGroupPageProps {
  group: GroupInfo;
  paymentMethods: PaymentMethod[];
}

export enum GroupScreens {
  group = 'group',
  login = 'login',
}

const GroupPage: NextPage<IGroupPageProps> = ({ group, paymentMethods }) => {
  const [screen, setScreen] = useState<keyof typeof GroupScreens>('group');
  const [showPayModal, setShowPayModal] = useState(false);

  return (
    <div className="w-full min-h-screen relative flex flex-col">
      <MetaCustom
        title={`Comparte ${group!.plan.service.name} en Konto`}
        description={`Ahorra hasta un 70% en ${
          group!.plan.service.name
        } comprando en grupo en Konto`}
        imageUrl="https://kontope.com/landing.jpg"
        imageAlt={`Konto`}
        url={`/grupo/${group!.id}`}
      />
      <Header className="hidden lg:inline-flex" setScreen={setScreen} />

      {screen === GroupScreens.group && (
        <GroupData
          group={group}
          setScreen={setScreen}
          setShowPayModal={setShowPayModal}
        />
      )}
      {screen === GroupScreens.login && (
        <LoginReusable callbackUrl={`/grupo/${group!.id}`} />
      )}

      <PayModal
        group={group}
        paymentMethods={paymentMethods}
        showPayModal={showPayModal}
        setShowPayModal={setShowPayModal}
      />
    </div>
  );
};

export const getServerSideProps = async ({
  query,
}: GetServerSidePropsContext) => {
  const { groupId } = query;

  const [group, paymentMethods] = await Promise.all([
    getGroup(groupId as string),
    getAllPaymentMethods(),
  ]);

  return {
    props: {
      group,
      paymentMethods,
    },
  };
};

export default GroupPage;
