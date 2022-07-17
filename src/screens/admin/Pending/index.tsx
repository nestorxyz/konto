// Libraries
import useSWR from 'swr';
import {
  Table,
  Loading,
  User,
  Row,
  Text,
  Col,
  Button,
} from '@nextui-org/react';

// Request
import AxiosGetAllUserGroups from 'request/local_next/admin/AxiosGetAllUserGroups';

// Types
import { AdminUserGroup } from 'request/prisma/admin/getAllUserGroups';

// Components
import Status from 'components/badges/Status';

const mapUserGroupStatusToBadge = (userGroup: AdminUserGroup) => {
  switch (userGroup.state) {
    case 'ACTIVE':
      return 'success';
    case 'INACTIVE':
      return 'error';
    default:
      return 'warning';
  }
};

const Pending: React.FC = () => {
  const { data: response, error } = useSWR<Array<AdminUserGroup>>(
    '/admin/getAllUserGroups',
    AxiosGetAllUserGroups
  );

  const handleVerifyPayment = (userGroup: AdminUserGroup) => {
    console.log(userGroup);
  };

  if (error === undefined && response === undefined)
    return <Loading className="mx-auto" />;

  return (
    <Table selectionMode="none" aria-label="Admin table">
      <Table.Header>
        <Table.Column>User</Table.Column>
        <Table.Column>Group</Table.Column>
        <Table.Column>Status</Table.Column>
        <Table.Column>Action</Table.Column>
      </Table.Header>
      <Table.Body>
        {response!.map((userGroup) => {
          return (
            <Table.Row key={userGroup.id}>
              <Table.Cell>
                <User
                  squared
                  {...(userGroup.user.image !== null && {
                    src: userGroup.user.image,
                  })}
                  name={userGroup.user.name}
                  text={userGroup.user.name!}
                  css={{ p: 0 }}
                >
                  {userGroup.user.email}
                </User>
              </Table.Cell>
              <Table.Cell>
                <Col>
                  <Row>
                    <Text b size={14} css={{ tt: 'capitalize' }}>
                      {userGroup.group.plan.service.name}
                    </Text>
                  </Row>
                  <Row>
                    <Text
                      b
                      size={13}
                      css={{ tt: 'capitalize', color: '$accents7' }}
                    >
                      {userGroup.group.admin.name}
                    </Text>
                  </Row>
                </Col>
              </Table.Cell>
              <Table.Cell>
                <Status status={mapUserGroupStatusToBadge(userGroup)}>
                  {userGroup.state}
                </Status>
              </Table.Cell>
              <Table.Cell>
                <Button
                  onPress={() => handleVerifyPayment(userGroup)}
                  disabled={userGroup.state !== 'PENDING'}
                >
                  Aprobar pago
                </Button>
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
};

export default Pending;
