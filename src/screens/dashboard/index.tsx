// Libraries
import React, { useState } from 'react';

// Hooks
import useUser from 'hooks/useUser';

// Components
import Header from './Header';
import Home from './home';
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Not logged in</div>;
  }

  if (!user.phone || !user.phoneVerified) return <AddPhone />;

  return (
    <div>
      <Header setScreen={setScreen} />
      {screen === DashboardPages.home && <Home />}
    </div>
  );
};

export default Dashboard;
