// Libraries
import { useState } from 'react';

// Components
import Header from 'screens/admin/Header';
import UserGroups from './userGroups';
import Deposits from './deposits';

export enum AdminPages {
  joiner = 'joiner',
  deposits = 'deposits',
}

const AdminScreen: React.FC = () => {
  const [screen, setScreen] = useState<keyof typeof AdminPages>('joiner');

  return (
    <div>
      <Header setScreen={setScreen} />
      <main className="mx-6 mb-28 lg:mx-20 xl:mx-28 flex flex-col">
        {screen === AdminPages.joiner && <UserGroups />}
        {screen === AdminPages.deposits && <Deposits />}
      </main>
    </div>
  );
};

export default AdminScreen;
