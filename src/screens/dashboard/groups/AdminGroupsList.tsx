// Libraries
import toast from 'react-hot-toast';
import { ShareIcon } from '@heroicons/react/outline';
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
    const shareData = {
      title: `${group.plan.service.name} en Konto`,
      text: `Compra en grupo ${group!.plan.service.name} en Konto a solo S/ ${
        group!.plan.joinerPay
      }`,
      url: window.location.pathname,
    };
    try {
      await navigator.share(shareData);
      return console.log('Copied');
    } catch (err) {
      if (
        !navigator.appVersion.includes('Android') &&
        !navigator.appVersion.includes('iPhone')
      ) {
        toast('Copiado', { icon: '🥳' });
      }
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {adminGroups.map((adminGroup) => {
        return (
          <div className="flex flex-col px-4 py-6 border rounded-md shadow-sm">
            <div className="flex mb-4">
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
              <p className="font-semibold text-lg ">Integrantes</p>
              <p className="mb-3 text-gray-500">
                Recibirás S/ {adminGroup.plan.adminGet} por cada integrante
              </p>
              <div className="flex flex-col gap-2">
                {adminGroup.userGroups.map((userGroup) => {
                  return (
                    <User
                      bordered
                      color="primary"
                      src={userGroup.user.image as string}
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
