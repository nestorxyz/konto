// Libraries
import toast from 'react-hot-toast';
import { ShareIcon } from '@heroicons/react/outline';
import { PencilAltIcon } from '@heroicons/react/solid';
import { Button, User } from '@nextui-org/react';

// Helpers
import { formatDate } from 'lib/formatData';

// Types
import { AdminGroup } from 'request/prisma/userGroups/getAdminGroups';

interface IJoinedGroupsListProps {
  adminGroups: AdminGroup[];
}

const AdminGroupsList: React.FC<IJoinedGroupsListProps> = ({ adminGroups }) => {
  const handleShare = async (group: AdminGroup) => {
    toast('Link Copiado', { icon: '🥳' });

    navigator.clipboard.writeText(`https://www.kontope.com/grupo/${group.id}`);
  };

  return (
    <div className="flex flex-col gap-4">
      {adminGroups.map((adminGroup) => {
        return (
          <div
            key={adminGroup.id}
            className="flex flex-col px-4 py-6 border rounded-md shadow-sm"
          >
            <div className="flex mb-4 items-center">
              <p className="text-center text-2xl text-primary font-semibold">
                {adminGroup.plan.service.name}
              </p>
              <Button
                light
                size="sm"
                auto
                color={adminGroup.verified === false ? 'warning' : 'success'}
                className="ml-auto"
              >
                {adminGroup.verified === false
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
                >
                  <PencilAltIcon className="h-5 w-5 text-gray-500 mr-1" />
                  <span className="text-gray-500">Editar</span>
                </Button>
              </div>
              <p className="mb-3 text-gray-500">
                Recibirás S/ {adminGroup.plan.adminGet} por cada integrante
              </p>
              <div className="flex flex-col gap-2">
                {adminGroup.userGroups.map((userGroup) => {
                  if (userGroup.state !== 'ACTIVE') return null;

                  return (
                    <User
                      {...(userGroup.user.image !== null
                        ? {
                            src: userGroup.user.image,
                          }
                        : { text: userGroup.user.name! })}
                      name={userGroup.user.name?.split(' ')[0]}
                      description={
                        'Inicio: ' +
                        formatDate(userGroup.periodStart) +
                        ' | Fin: ' +
                        formatDate(userGroup.periodEnd)
                      }
                    />
                  );
                })}
              </div>
            </div>

            {adminGroup.plan.maxUsers - (adminGroup.userGroups.length + 1) >
              0 && (
              <div className="mt-4">
                <Button
                  auto
                  ghost
                  className="mx-auto"
                  onClick={() => handleShare(adminGroup)}
                >
                  <ShareIcon className="h-5 w-5 mr-2" /> Invitar más integrantes
                </Button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default AdminGroupsList;
