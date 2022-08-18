// Libraries
import toast from 'react-hot-toast';
import Image from 'next/image';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { ShareIcon } from '@heroicons/react/outline';
import { Button, Text } from '@nextui-org/react';

// Types
import { GroupInfo } from 'request/prisma/groups/getGroup';
import { Dispatch, SetStateAction } from 'react';
import { GroupScreens } from '../../../pages/grupo/[groupId]';

// Helpers
import { mapServiceToImage } from 'lib/logicFunctions';

interface IGroupInfoProps {
  group: GroupInfo;
  setScreen: Dispatch<SetStateAction<keyof typeof GroupScreens>>;
  setShowPayModal: Dispatch<SetStateAction<boolean>>;
}

const GroupData: React.FC<IGroupInfoProps> = ({
  group,
  setScreen,
  setShowPayModal,
}) => {
  const { status } = useSession();

  const handleJoinGroup = () => {
    if (status === 'unauthenticated') {
      setScreen(GroupScreens.login);
    } else {
      setShowPayModal(true);
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: `Compra ${group!.plan.service.name} en grupo`,
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
        toast('Link Copiado', { icon: '🥳' });
      }
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="lg:flex lg:flex-col">
      <div className="lg:flex lg:mx-20 lg:items-center lg:gap-10 lg:justify-center lg:flex-row-reverse lg:mt-10">
        <div>
          <div className="w-full h-60 lg:w-96 lg:gap-4 overflow-hidden lg:rounded-lg relative">
            <Image
              src={mapServiceToImage(group!.plan.service.value)}
              className="object-cover"
              placeholder="blur"
              layout="fill"
            />
          </div>
          <div className="hidden lg:inline-flex lg:flex-col lg:items-center mt-6 lg:w-full">
            <p className="text-gray-600 mb-4 text-2xl font-bold">
              S/ {group!.plan.joinerPay} cada mes
            </p>
            <Button
              auto
              size="xl"
              style={{ width: '150px' }}
              onClick={handleJoinGroup}
            >
              Unirme al grupo 💰
            </Button>
          </div>
        </div>

        <div className="py-2 lg:shadow-md lg:rounded-lg lg:p-6 px-4 flex flex-col items-center text-center pb-[126px] lg:max-w-md">
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
              {group!.plan.maxUsers - (group!.subscriptions.length + 1)}/
              {group!.plan.maxUsers} Sitios disponibles
            </h4>
            <Button
              auto
              light
              style={{ minWidth: '100px', width: '100px' }}
              onClick={handleShare}
            >
              <ShareIcon className="h-5 w-5 text-gray-500" />{' '}
              <span className="ml-1 text-gray-500">Compartir</span>
            </Button>
          </div>

          <Text blockquote>
            <p className="text-lg font-semibold">🔑 Credenciales Verificadas</p>
            Al unirte, se te dará accesso a las credenciales compartidas para
            que puedas disfrutar de {group!.plan.service.name}.
          </Text>
        </div>
      </div>

      <div className="fixed z-10 py-6 lg:hidden shadow-lg border-t-2 rounded-t-xl bg-gray-50 px-6 justify-between w-full items-center flex bottom-0">
        <p className="text-gray-700 text-2xl font-bold">
          S/ {group!.plan.joinerPay} cada mes
        </p>
        <Button
          auto
          size="xl"
          style={{ width: '150px' }}
          onClick={handleJoinGroup}
        >
          Unirme
        </Button>
      </div>
    </div>
  );
};

export default GroupData;
