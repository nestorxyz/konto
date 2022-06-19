// Libraries
import React, { useState } from 'react';

// Components
import Header from './Header';
import Home from './home';

export enum DashboardPages {
  home = 'home',
  groups = 'groups',
  wallet = 'wallet',
  profile = 'profile',
}

const Dashboard: React.FC = () => {
  const [screen, setScreen] = useState<keyof typeof DashboardPages>('home');

  return (
    <div>
      <Header setScreen={setScreen} />
      {screen === DashboardPages.home && <Home />}
    </div>
  );
};

export default Dashboard;
