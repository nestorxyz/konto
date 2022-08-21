// Libraries
import { useState } from 'react';
import toast from 'react-hot-toast';
import { ShareIcon } from '@heroicons/react/outline';
import { PencilAltIcon } from '@heroicons/react/solid';
import { Button, User, Loading } from '@nextui-org/react';

// Helpers
import { formatDate } from 'lib/formatData';

// Hooks
import useApp from 'hooks/useApp';

// Types
import { UserGroup } from 'request/prisma/app/getUserApp';

// Components
import EditCredentialsModal from './EditCredentialsModal';

interface IJoinedGroupsListProps {}

const AdminGroupsList: React.FC<IJoinedGroupsListProps> = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<UserGroup | null>(null);

  const { user } = useApp();

  const handleShare = async (group: UserGroup) => {
    toast('Link Copiado', { icon: '🥳' });

    navigator.clipboard.writeText(`https://www.kontope.com/grupo/${group.id}`);
  };

  const handleEditGroupCredentials = (group: UserGroup) => {
    setSelectedGroup(group);
    setOpenModal(true);
  };

  if (!user) return <Loading />;

  return (
    <div className="flex flex-col gap-4">
      {user.groups.map((group) => {
        return (
          <div
            key={group.id}
            className="flex flex-col px-4 py-6 border rounded-md shadow-sm"
          >
            <div className="flex mb-4 items-center">
              <p className="text-center text-2xl text-primary font-semibold">
                {group.plan.service.name}
              </p>
              <Button
                light
                size="sm"
                auto
                color={group.verified === false ? 'warning' : 'success'}
                className="ml-auto"
              >
                {group.verified === false
                  ? 'Validando cuenta'
                  : 'Cuenta activa'}
              </Button>
            </div>

            <div>
              <div className="flex items-center">
                <p className="font-semibold text-lg ">Integrantes</p>

                <Button
                  light
                  auto
                  color="primary"
                  css={{ width: '25px', height: '35px', padding: '$4' }}
                  className="ml-auto"
                  onClick={() => handleEditGroupCredentials(group)}
                >
                  <PencilAltIcon className="h-5 w-5 text-gray-500 mr-1" />
                  <span className="text-gray-500">Editar</span>
                </Button>
              </div>
              <p className="mb-3 text-gray-500">
                Recibirás S/ {group.plan.adminGet} por cada integrante
              </p>
              <div className="flex flex-col gap-2">
                {group.subscriptions.map((subscription) => {
                  return (
                    <User
                      {...(subscription.user.image !== null
                        ? {
                            src: subscription.user.image,
                          }
                        : { text: subscription.user.name! })}
                      name={subscription.user.name?.split(' ')[0]}
                      description={
                        'Inicio: ' +
                        formatDate(subscription.periodStart) +
                        ' | Fin: ' +
                        formatDate(subscription.periodEnd)
                      }
                    />
                  );
                })}
              </div>
            </div>

            {group.plan.maxUsers - (group.subscriptions.length + 1) > 0 && (
              <div className="mt-4">
                <Button
                  auto
                  ghost
                  className="mx-auto"
                  onClick={() => handleShare(group)}
                >
                  <ShareIcon className="h-5 w-5 mr-2" /> Invitar más integrantes
                </Button>
              </div>
            )}
          </div>
        );
      })}
      <EditCredentialsModal
        adminGroup={selectedGroup}
        initialValues={{
          credentialEmail: selectedGroup?.credentialEmail as string,
          credentialPassword: selectedGroup?.credentialPassword as string,
        }}
        open={openModal}
        setOpen={setOpenModal}
      />
    </div>
  );
};

export default AdminGroupsList;
