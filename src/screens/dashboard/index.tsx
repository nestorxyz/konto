// Libraries
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

// Hooks
import useUser from 'hooks/useUser';

// Helpers
import mixpanel from 'lib/mixpanel';

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
  const router = useRouter();

  useEffect(() => {
    mixpanel.track('Dashboard Hit');
  }, []);

  useEffect(() => {
    if (router.query.redirect) {
      setScreen(router.query.redirect as keyof typeof DashboardPages);
    }
  }, [router.query.redirect]);

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
