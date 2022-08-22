// Libraries
import { Loading } from '@nextui-org/react';

// Hooks
import useApp from 'hooks/useApp';

// Lib
import { formatDate, getFirstName } from 'lib/formatData';

// Components
import NextPaymentCard from 'components/cards/NextPaymentCard';

const NextPayments: React.FC = () => {
  const { user } = useApp();

  if (!user) return <Loading />;

  return (
    <div className="flex flex-col gap-5">
      {user.paymentOrders.map((paymentOrder) => {
        return (
          <NextPaymentCard
            key={paymentOrder.id}
            type="moneyIn"
            image={paymentOrder.subscription.user.image || ''}
            name={paymentOrder.subscription.user.name || ''}
            title={
              getFirstName(paymentOrder.subscription.user.name || '') +
              ' - ' +
              paymentOrder.subscription.group.plan.service.name
            }
            subtitle={formatDate(paymentOrder.paymentDate)}
            amount={paymentOrder.subscription.group.plan.adminGet}
          />
        );
      })}
      {user.subscriptions.map((subscription) => {
        return (
          <NextPaymentCard
            key={subscription.id}
            type="moneyOut"
            image={subscription.group.admin.image || ''}
            name={getFirstName(subscription.group.admin.name) || ''}
            title={
              'Grupo de ' +
              getFirstName(subscription.group.admin.name) +
              ' - ' +
              subscription.group.plan.service.name
            }
            subtitle={formatDate(subscription.periodEnd)}
            amount={subscription.group.plan.joinerPay}
          />
        );
      })}
    </div>
  );
};

export default NextPayments;
