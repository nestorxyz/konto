// Libraries
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Button, Card } from '@nextui-org/react';

// Helpers
import mapServiceToImage from 'lib/mapServiceToImage';

// Types
import { GroupCardInfo } from 'request/prisma/groups/getAllGroups';

type GroupCardProps = {
  group: GroupCardInfo;
};

const GroupCard: React.FC<GroupCardProps> = ({ group }) => {
  const router = useRouter();

  return (
    <Card isHoverable variant="bordered" css={{ w: '320px' }}>
      <img
        src={mapServiceToImage(group.plan.service.value)}
        className="object-cover h-20 rounded-t-xl"
      />
      <ul className="grid mx-4 my-3 grid-cols-2 lg:flex lg:flex-col lg:items-center lg:text-center">
        <li>
          <h3 className="text-xs text-dark-sub lg:text-xl lg:font-semibold">
            Comparte {group.plan.service.name} con
          </h3>
          <h4 className="text-sm text-primary font-bold lg:text-2xl">
            {group.admin.name?.split(' ')[0]}
          </h4>
        </li>
        <li className="flex flex-col items-center">
          <h3 className="text-xs text-dark-sub lg:text-xl lg:font-semibold">
            Precio Mensual de
          </h3>
          <h4 className="text-sm text-primary font-bold ">
            <s className="font-bold text-sm text-gray-400 lg:text-2xl">
              S/ {group.plan.service.price}
            </s>
            <span className="font-bold text-sm text-primary ml-5 lg:text-2xl">
              S/ {group.plan.joinerPay}
            </span>
          </h4>
        </li>
        <li>
          <h3 className="text-xs text-dark-sub lg:text-xl lg:font-semibold">
            Número de Integrantes
          </h3>
          <h4 className="text-sm text-primary font-bold lg:text-2xl">
            {group.userGroups.length + 1}/{group.plan.maxUsers}
          </h4>
        </li>
        <Button
          type="submit"
          color="secondary"
          auto
          size="lg"
          onClick={() => router.push(`grupo/${group.id}`)}
        >
          Unirse al Grupo
        </Button>
      </ul>
      {group.verified ? (
        <h3 className="flex justify-center">
          <div>
            <Image src="/icons/verified.png" width="15" height="15" />
          </div>
          <p className="text-sm text-green-400 ml-1">
            Credenciales Verificadas
          </p>
        </h3>
      ) : (
        <h3 className="text-center text-sm text-dark-form">
          Credenciales en verificación
        </h3>
      )}
    </Card>
  );
};

export default GroupCard;
