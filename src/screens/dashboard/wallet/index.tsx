// Libraries
import { Card, Loading } from '@nextui-org/react';

// Hooks
import useApp from 'hooks/useApp';

// Components
import Movements from './Movements';
import NextPayments from './NextPayments';

const WalletScreen: React.FC = () => {
  const { user } = useApp();

  if (!user) return <Loading />;

  return (
    <main className="mx-auto max-w-sm w-full sm:max-w-none px-6 mb-28 grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-10 lg:max-w-4xl">
      <div className="max-w-sm w-full">
        <Card variant="bordered">
          <Card.Header>
            <div className="flex justify-between w-full items-center">
              <p className="text-gray-700 font-semibold text-lg">Balance</p>
              <img src="/logo.svg" className="h-10 w-10" />
            </div>
          </Card.Header>
          <Card.Body>
            <p className="text-center text-4xl text-primary font-smibold">
              S/ {user.balance}
            </p>
          </Card.Body>
          <Card.Footer>
            <p className="text-right w-full">@{user.username}</p>
          </Card.Footer>
        </Card>
      </div>

      <div className="max-w-sm w-full sm:row-start-2">
        <p className="text-gray-700 font-semibold text-lg mb-4">
          Próximos Pagos
        </p>
        <NextPayments />
      </div>

      <div className="max-w-sm w-full">
        <p className="text-gray-700 font-semibold text-lg mb-4">Movimientos</p>
        <Movements />
      </div>
    </main>
  );
};

export default WalletScreen;
