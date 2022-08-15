import {
  Table,
  Loading,
  User,
  Row,
  Text,
  Col,
  Button,
} from '@nextui-org/react';

// Helpers
import { formatDate } from 'lib/formatData';

//Types
import { AdminDeposit } from 'request/prisma/admin/getAllDeposits';

// Components
import Status from 'components/badges/Status';

interface IDepositListProps {
  deposits: Array<AdminDeposit> | undefined;
  error: string;
  handleVerifyDeposit: (deposit: AdminDeposit) => Promise<void>;
}

const mapDepositStatusToBadge = (deposit: AdminDeposit) => {
  switch (deposit.status) {
    case 'VALID':
      return 'success';
    case 'INVALID':
      return 'error';
    default:
      return 'warning';
  }
};

const DepositList: React.FC<IDepositListProps> = (props) => {
  const { deposits, error, handleVerifyDeposit } = props;

  if (error === undefined && deposits === undefined)
    return <Loading className="mx-auto" />;

  return (
    <Table selectionMode="none" aria-label="Deposits table">
      <Table.Header>
        <Table.Column>User</Table.Column>
        <Table.Column>Monto</Table.Column>
        <Table.Column>Método</Table.Column>
        <Table.Column>Solicitado</Table.Column>
        <Table.Column>Modificado</Table.Column>
        <Table.Column>Estado</Table.Column>
        <Table.Column>Actions</Table.Column>
      </Table.Header>
      <Table.Body>
        {deposits!.map((deposit) => (
          <Table.Row key={deposit.id}>
            <Table.Cell>
              <User
                squared
                {...(deposit.user.image !== null && {
                  src: deposit.user.image,
                })}
                name={deposit.user.name}
                text={deposit.user.name!}
                css={{ p: 0 }}
              >
                {deposit.user.email}
              </User>
            </Table.Cell>
            <Table.Cell>{deposit.amount}</Table.Cell>
            <Table.Cell>{deposit.paymentMethod.type}</Table.Cell>
            <Table.Cell>{formatDate(deposit.createdAt)}</Table.Cell>
            <Table.Cell>{formatDate(deposit.updatedAt)}</Table.Cell>
            <Table.Cell>
              <Status status={mapDepositStatusToBadge(deposit)}>
                {deposit.status}
              </Status>
            </Table.Cell>
            <Table.Cell>
              <Button
                onClick={() => handleVerifyDeposit(deposit)}
                size="sm"
                auto
                disabled={deposit.status === 'VALID'}
              >
                Validar
              </Button>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export default DepositList;
