// Libraries
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import { ShareIcon } from '@heroicons/react/outline';
import { Button, Text } from '@nextui-org/react';

// Types
import { GroupInfo } from 'request/prisma/groups/getGroup';

// Helpers
import mapServiceToImage from 'lib/mapServiceToImage';

interface IGroupInfoProps {
  group: GroupInfo;
}

const GroupData: React.FC<IGroupInfoProps> = ({ group }) => {
  const router = useRouter();

  const handleShare = async () => {
    const shareData = {
      title: 'Compartir',
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
    <>
      <img
        src={mapServiceToImage(group!.plan.service.value)}
        className="object-cover w-full h-60"
      />
      <div className="py-2 px-4 flex flex-col items-center text-center pb-[126px]">
        <div className="mb-4">
          <h4 className="text-gray-800">Grupo compartido de </h4>
          <h2 className="text-primary">{group!.plan.service.name}</h2>
          <p>Ofrecido por {group!.admin.name?.split(' ')[0]}</p>
        </div>
        <div className="mb-4">
          <h4 className="text-gray-800">Precio Mensual de</h4>
          <div className="flex gap-4 justify-center">
            <h3 className="text-gray-400">
              <s>S/ {group!.plan.service.price}</s>{' '}
            </h3>

            <h3 className="text-primary">S/ {group!.plan.joinerPay}</h3>
          </div>
        </div>
        <div className="flex gap-4 items-center mb-4">
          <h4 className="text-gray-600 mb-0">
            {group!.plan.maxUsers - (group!.userGroups.length + 1)}/
            {group!.plan.maxUsers} Sitios disponibles
          </h4>
          <Button
            auto
            light
            rounded
            style={{ minWidth: '50px', width: '50px' }}
            onClick={handleShare}
          >
            <ShareIcon className="h-5 w-5 text-gray-500" />
          </Button>
        </div>

        <Text blockquote>
          <p className="text-lg font-semibold">🔑 Credenciales Verificadas</p>
          Al unirte, se te dará accesso a las credenciales compartidas para que
          puedas disfrutar de {group!.plan.service.name}.
        </Text>
      </div>
      <div className="fixed z-10 py-6 shadow-lg border-t-2 rounded-t-xl bg-gray-50 px-6 justify-between w-full items-center flex bottom-0">
        <p className="text-gray-700 text-2xl font-bold">
          S/ {group!.plan.joinerPay} cada mes
        </p>
        <Button
          auto
          size="xl"
          style={{ width: '150px' }}
          onClick={() => router.push(`/unirse/${group!.id}`)}
        >
          Unirme
        </Button>
      </div>
    </>
  );
};

export default GroupData;
