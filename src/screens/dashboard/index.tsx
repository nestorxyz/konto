// Libraries
import React, { useEffect, useState } from 'react';

// Hooks
import useUser from 'hooks/useUser';
import useApp from 'hooks/useApp';

// Components
import Header from './Header';
import Home from './home';
import Groups from './groups';
import AddPhone from './onboarding/addPhone';

export enum DashboardPages {
  home = 'home',
  groups = 'groups',
  wallet = 'wallet',
  profile = 'profile',
}

const Dashboard: React.FC = () => {
  const [screen, setScreen] = useState<keyof typeof DashboardPages>('home');
  const { loading, user } = useUser();
  const { app, updateAppRedux } = useApp();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Not logged in</div>;
  }

  if (!user.phone) return <AddPhone />;

  return (
    <div>
      <Header setScreen={setScreen} />
      {screen === DashboardPages.home && <Home />}
      {screen === DashboardPages.groups && <Groups />}
    </div>
  );
};

export default Dashboard;
