// Libraries
import toast from 'react-hot-toast';
import Image from 'next/image';
import { Button, Text, Collapse, Card } from '@nextui-org/react';

// Hooks
import useApp from 'hooks/useApp';

// Helpers
import { mapServiceToImage } from 'lib/logicFunctions';
import { formatDate } from 'lib/formatData';
import { classNames } from 'lib/logicFunctions';

interface IJoinedGroupsListProps {}

const JoinedGroupsList: React.FC<IJoinedGroupsListProps> = ({}) => {
  const { user } = useApp();

  const handleCopyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    toast.success('Email copiado al portapapeles');
  };

  const handleCopyPassWord = (password: string) => {
    navigator.clipboard.writeText(password);
    toast.success('Contraseña copiada al portapapeles');
  };

  return (
    <div className="flex flex-col gap-4">
      {user.subscriptions.map((subscription) => {
        return (
          <div
            key={subscription.id}
            className="flex flex-col px-4 py-6 border rounded-md shadow-sm"
          >
            <div className="flex mb-4">
              <p className="text-center text-2xl text-primary font-semibold">
                {subscription.group.plan.service.name}
              </p>
              <Button
                light
                size="sm"
                auto
                color={subscription.state === 'PENDING' ? 'warning' : 'success'}
                className="ml-auto"
              >
                {subscription.state === 'PENDING' ? 'Validando pago' : 'Activo'}
              </Button>
            </div>

            <div className="flex gap-4">
              <div className="w-20 h-20 rounded-lg relative">
                <Image
                  src={mapServiceToImage(subscription.group.plan.service.value)}
                  className="object-cover"
                  placeholder="blur"
                  layout="fill"
                />
              </div>
              <Text blockquote className="w-full">
                {subscription.state === 'PENDING' ? (
                  <p className="text-center">
                    Validando tu pago de S/ {subscription.group.plan.joinerPay}
                  </p>
                ) : (
                  <div>
                    <p>Inicio: {formatDate(subscription.joinedAt)}</p>
                    <p>Fin: {formatDate(subscription.periodEnd)}</p>
                  </div>
                )}
              </Text>
            </div>
            <Collapse.Group>
              <Collapse
                disabled={subscription.state === 'PENDING' && true}
                title={
                  <p
                    className={classNames(
                      subscription.state === 'PENDING'
                        ? 'text-gray-500'
                        : 'text-gray-800',
                      'font-semibold text-lg'
                    )}
                  >
                    {subscription.state === 'PENDING'
                      ? 'Cuando validemos el pago tendrás acceso a la cuenta 🥳'
                      : 'Ver credenciales 😎'}
                  </p>
                }
              >
                <div className="flex flex-col gap-2">
                  <Text color="primary">
                    Presiona en las credenciales para copiarlas
                  </Text>
                  <Card variant="flat" isPressable>
                    <Text
                      blockquote
                      onClick={() =>
                        handleCopyEmail(subscription.group.credentialEmail)
                      }
                    >
                      {subscription.group.credentialEmail}
                    </Text>
                  </Card>

                  <Card variant="flat" isPressable>
                    <Text
                      blockquote
                      onClick={() =>
                        handleCopyPassWord(
                          subscription.group.credentialPassword
                        )
                      }
                    >
                      {subscription.group.credentialPassword}
                    </Text>
                  </Card>
                </div>
              </Collapse>
            </Collapse.Group>
          </div>
        );
      })}
    </div>
  );
};

export default JoinedGroupsList;
