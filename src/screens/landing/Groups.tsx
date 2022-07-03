// Types
import { GroupCardInfo } from 'request/prisma/groups/getAllGroups';

// Components
import LandingGroupCard from 'components/cards/LandingGroupCard';

type LandingGroupsProps = {
  groups: GroupCardInfo[];
};

const LandingGroups: React.FC<LandingGroupsProps> = ({ groups }) => {
  return (
    <div className="py-6 lg:mt-10 mx-auto w-80 md:mx-14 md:w-auto lg:w-3/4 lg:mx-auto">
      <h2
        className="text-2xl text-center font-bold mb-6 lg:text-5xl lg:mb-10"
        id="groups"
      >
        Grupos disponibles
      </h2>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 gap-x-5 xl:grid-cols-3">
        {groups.map((group) => {
          return <LandingGroupCard key={group.id} group={group} />;
        })}
      </div>
    </div>
  );
};

export default LandingGroups;
