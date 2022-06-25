// Types
import { GroupCardInfo } from 'request/prisma/groups/getAllGroups';

// Libraries
import Image from 'next/image';

type GroupCardProps = {
  group: GroupCardInfo;
};

const GroupCard: React.FC<GroupCardProps> = ({ group }) => {
  return (
    <article className="flex flex-col shadow-xl rounded-xl mb-6">
      <div className="w-auto">
        <Image src="/img/services/disney-logo.png" layout="responsive" />
      </div>
      <ul className="grid mx-4 my-3 grid-cols-2 gap-y-4 lg:flex lg:flex-col lg:items-center lg:text-center">
        <li>
          <h3 className="text-xs text-dark-sub lg:text-xl lg:font-semibold">
            Comparte Disney + con
          </h3>
          <h4 className="text-sm text-primary font-bold lg:text-2xl">
            {group.admin.name}
          </h4>
        </li>
        <li className="flex flex-col items-center">
          <h3 className="text-xs text-dark-sub lg:text-xl lg:font-semibold">
            Precio Mensual de
          </h3>
          <h4 className="text-sm text-primary font-bold ">
            <s className="font-bold text-sm text-dark-form lg:text-2xl">
              S/ {group.plan.service.price}
            </s>
            <span className="font-bold text-sm text-primary ml-5 lg:text-2xl">
              S/ {group.plan.service.price}
            </span>
          </h4>
        </li>
        <li>
          <h3 className="text-xs text-dark-sub lg:text-xl lg:font-semibold">
            Número de Integrantes
          </h3>
          <h4 className="text-sm text-primary font-bold lg:text-2xl">
            {group.userGroups.length}/{group.plan.maxUsers}
          </h4>
        </li>
        <button
          className="py-3 px-2 bg-secondary rounded-md lg:w-52 lg:font-semibold lg:text-xl"
          type="submit"
        >
          Unirse al Grupo
        </button>
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
    </article>
  );
};

export default GroupCard;
