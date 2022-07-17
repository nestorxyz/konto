// Libraries
import { useState } from 'react';

// Components
import Header from 'screens/admin/Header';

export enum AdminPages {
  home = 'home',
}

const AdminScreen: React.FC = () => {
  const [screen, setScreen] = useState<keyof typeof AdminPages>('home');

  return (
    <div>
      <Header setScreen={setScreen} />
    </div>
  );
};

export default AdminScreen;
