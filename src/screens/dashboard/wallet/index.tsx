// Libraries
import { Card, Loading, Text, User } from '@nextui-org/react';

// Hooks
import useApp from 'hooks/useApp';

// Helpers
import { formatDate } from 'lib/formatData';

// Types
import { AdminGroup } from 'request/prisma/subscriptions/getAdminGroups';

const WalletScreen: React.FC = () => {
  const { user } = useApp();

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
        {user.groups.length > 0 ? (
          <div className="flex flex-col gap-5">
            {user.groups.map((groups) => {
              return groups.subscriptions.map((subscription) => {
                return (
                  <div
                    id={subscription.id}
                    className="flex justify-between items-center"
                  >
                    <User
                      {...(subscription.user.image !== null
                        ? {
                            src: subscription.user.image,
                          }
                        : { text: subscription.user.name! })}
                      name={
                        <p className="text-primary-800 font-semibold">
                          {subscription.user.name?.split(' ')[0] +
                            ' ' +
                            subscription.user.name?.split(' ')[1] +
                            ' - ' +
                            subscription.group.plan.service.name}
                        </p>
                      }
                      description={formatDate(subscription.periodEnd)}
                      style={{ padding: '0' }}
                    />
                    <Text color="success" className="font-medium text-xl">
                      S/ {subscription.group.plan.adminGet} +
                    </Text>
                  </div>
                );
              });
            })}
          </div>
        ) : (
          <p>No hay próximos pagos</p>
        )}
      </div>
      <div className="lg:w-[400px]">
        <p className="text-gray-700 font-semibold text-lg mb-4">Movimientos</p>
      </div>
    </main>
  );
};

export default WalletScreen;
