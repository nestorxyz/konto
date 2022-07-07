// Libraries
import { Grid } from '@nextui-org/react';

// Types
import { GroupCardInfo } from 'request/prisma/groups/getAllGroups';

// Components
import LandingGroupCard from 'components/cards/LandingGroupCard';

type LandingGroupsProps = {
  groups: GroupCardInfo[];
};

const LandingGroups: React.FC<LandingGroupsProps> = ({ groups }) => {
  return (
    <div className="py-6 lg:mt-10 mx-auto w-80 sm:w-auto lg:mx-auto xl:w-10/12">
      <h2
        className="text-2xl text-center font-bold mb-6 lg:text-5xl lg:mb-10"
        id="groups"
      >
        Grupos disponibles
      </h2>
      <Grid.Container justify="center" gap={2}>
        {groups.map((group) => {
          return (
            <Grid key={group.id}>
              <LandingGroupCard key={group.id} group={group} />
            </Grid>
          );
        })}
      </Grid.Container>
    </div>
  );
};

export default LandingGroups;
