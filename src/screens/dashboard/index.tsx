// Libraries
import useSWR from 'swr';
import React, { useEffect, useState } from 'react';

// Hooks
import useUser from 'hooks/useUser';

// Request
import AxiosGetAdminGroups from 'request/local_next/userGroups/AxiosGetAdminGroups';

// Components
import Header from './Header';
import Home from './home';
import Groups from './groups';
import Wallet from './wallet';
import AddPhone from './onboarding/addPhone';

export enum DashboardPages {
  home = 'home',
  groups = 'groups',
  wallet = 'wallet',
  profile = 'profile',
}

const Dashboard: React.FC = () => {
  const [screen, setScreen] = useState<keyof typeof DashboardPages>(
    localStorage.getItem('paymentIntent') == 'true' ? 'groups' : 'home'
  );
  const { loading, user } = useUser();

  const { data: response, error } = useSWR(
    ['/userGroups/getAdminGroups', user.id],
    AxiosGetAdminGroups
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user.phone) return <AddPhone />;

  if (localStorage.getItem('paymentIntent') == 'true')
    localStorage.removeItem('paymentIntent');

  return (
    <div>
      <Header setScreen={setScreen} />
      {screen === DashboardPages.home && <Home />}
      {screen === DashboardPages.groups && (
        <Groups setScreen={setScreen} response={response} error={error} />
      )}
      {screen === DashboardPages.wallet && (
        <Wallet response={response} error={error} />
      )}
    </div>
  );
};

export default Dashboard;
