// Libraries
import { useState } from 'react';
import useSWR from 'swr';

// Types
import { PaymentMethod } from 'request/prisma/paymentMethod/getAllPaymentMethods';

// Request
import AxiosGetAllPaymentMethods from 'request/local_next/admin/AxiosGetAllPaymentMethods';

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

  const { data: paymentMethods, error } = useSWR<Array<PaymentMethod>>(
    '/admin/getAllPaymentMethods',
    AxiosGetAllPaymentMethods
  );

  if (!paymentMethods && !error) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header setScreen={setScreen} />
      <main className="mx-6 mb-28 lg:mx-20 xl:mx-28 flex flex-col">
        {screen === AdminPages.joiner && <UserGroups />}
        {screen === AdminPages.deposits && (
          <Deposits paymentMethods={paymentMethods as Array<PaymentMethod>} />
        )}
      </main>
    </div>
  );
};

export default AdminScreen;
