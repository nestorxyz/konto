// Libraries
import { Loading } from '@nextui-org/react';

// Types
import { TransactionStatus } from '@prisma/client';
import {
  isDeposit,
  isInvoice,
  isPaymentOrder,
  isWithdrawal,
} from 'types/movements';

// Lib
import { formatDate, getFirstName } from 'lib/formatData';

// Hooks
import useApp from 'hooks/useApp';

// Components
import TransferCard from 'components/cards/TransferCard';

const mapTransactionStatusToBadge = (status: TransactionStatus) => {
  switch (status) {
    case TransactionStatus.VALIDATING:
      return 'warning';
    case TransactionStatus.VALID:
      return 'success';
    case TransactionStatus.INVALID:
      return 'error';
  }
};

const mapTransactionStatusToText = (status: TransactionStatus) => {
  switch (status) {
    case TransactionStatus.VALIDATING:
      return 'Validando';
    case TransactionStatus.VALID:
      return 'Válido';
    case TransactionStatus.INVALID:
      return 'Inválido';
  }
};

const Movements: React.FC = () => {
  const { movements } = useApp();

  if (!movements) return <Loading />;

  return (
    <div>
      <div className="flex gap-2 flex-col">
        {movements.map((movement) => {
          if (isDeposit(movement)) {
            return (
              <TransferCard
                type="moneyIn"
                title="Depósito"
                subtitle={formatDate(movement.updatedAt)}
                status={mapTransactionStatusToBadge(movement.status)}
                statusText={mapTransactionStatusToText(movement.status)}
                amount={movement.amount}
              />
            );
          } else if (isWithdrawal(movement)) {
            return (
              <TransferCard
                type="moneyOut"
                title="Retiro"
                subtitle={formatDate(movement.updatedAt)}
                status={mapTransactionStatusToBadge(movement.status)}
                statusText={mapTransactionStatusToText(movement.status)}
                amount={movement.amount}
              />
            );
          } else if (isInvoice(movement)) {
            return (
              <TransferCard
                type="moneyOut"
                title={`Compra en grupo de ${
                  movement.subscription.group.plan.service.name
                } con ${getFirstName(
                  movement.subscription.group.admin.name as string
                )}`}
                subtitle={formatDate(movement.updatedAt)}
                status={mapTransactionStatusToBadge(movement.transfer.status)}
                statusText={mapTransactionStatusToText(
                  movement.transfer.status
                )}
                amount={movement.transfer.amount}
              />
            );
          } else if (isPaymentOrder(movement)) {
            return (
              <TransferCard
                type="moneyOut"
                title={`Pago de ${
                  movement.subscription.user.name
                } - ${getFirstName(
                  movement.subscription.group.plan.service.name as string
                )}`}
                subtitle={formatDate(movement.updatedAt)}
                status="success"
                statusText="Válido"
                amount={movement.subscription.group.plan.adminGet}
              />
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default Movements;
