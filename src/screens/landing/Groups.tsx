// Types
import { GroupCardInfo } from 'request/prisma/groups/getAllGroups';

// Components
import GroupCard from 'components/cards/GroupCard';

type LandingGroupsProps = {
  groups: GroupCardInfo[];
};

const LandingGroups: React.FC<LandingGroupsProps> = ({ groups }) => {
  return (
    <div className="py-6 lg:mt-10 w-80 md:w-3/4 mx-auto">
      <h2 className="text-2xl text-center font-bold mb-6 lg:text-5xl lg:mb-10">
        Grupos disponibles
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 lg:grid-cols-3">
        {groups.map((group) => {
          return <GroupCard key={group.id} group={group} />;
        })}
      </div>
    </div>
  );
};

export default LandingGroups;
