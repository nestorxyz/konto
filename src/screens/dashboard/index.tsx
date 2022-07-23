// Libraries
import useSWR from 'swr';
import React, { useState } from 'react';
import { Loading } from '@nextui-org/react';

// Hooks
import useUser from 'hooks/useUser';

// Components
import Header from './Header';
import Home from './home';
import Groups from './groups';
import Wallet from './wallet';
import PageLoading from 'components/loaders/PageLoading';

export enum DashboardPages {
  home = 'home',
  groups = 'groups',
  wallet = 'wallet',
  profile = 'profile',
}

const Dashboard: React.FC = () => {
  const [screen, setScreen] = useState<keyof typeof DashboardPages>('home');
  const { loading } = useUser();

  if (loading) return <PageLoading />;

  return (
    <div>
      <Header setScreen={setScreen} />
      {screen === DashboardPages.home && <Home />}
      {screen === DashboardPages.groups && <Groups setScreen={setScreen} />}
      {screen === DashboardPages.wallet && <Wallet />}
    </div>
  );
};

export default Dashboard;
