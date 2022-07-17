// Libraries
import { useState } from 'react';

// Components
import Header from 'screens/admin/Header';
import Pending from './Pending';

export enum AdminPages {
  home = 'home',
}

const AdminScreen: React.FC = () => {
  const [screen, setScreen] = useState<keyof typeof AdminPages>('home');

  return (
    <div>
      <Header setScreen={setScreen} />
      <main className="mx-6 mb-28 lg:mx-20 xl:mx-28 flex flex-col">
        <Pending />
      </main>
    </div>
  );
};

export default AdminScreen;
