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
    <main className="mx-4 mb-28 lg:mx-12 xl:mx-56 flex flex-col md:flex-row gap-6 lg:gap-20 justify-center">
      <div className="md:w-96">
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

      <div className="lg:w-[400px]">
        <p className="text-gray-700 font-semibold text-lg mb-4">
          Próximos Pagos
        </p>
        <NextPayments />
      </div>
      <div className="lg:w-[400px]">
        <p className="text-gray-700 font-semibold text-lg mb-4">Movimientos</p>
        <Movements />
      </div>
    </main>
  );
};

export default WalletScreen;
