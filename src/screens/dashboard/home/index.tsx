// Libraries
import { useState } from 'react';
import useSwr from 'swr';
import { Button, Loading, Grid } from '@nextui-org/react';

// Types
import { GroupCardInfo } from 'request/prisma/groups/getAllGroups';

// Request
import AxiosGetAllGroups from 'request/local_next/groups/AxiosGetAllGroups';

// Components
import CreateGroupModal from './CreateGroupModal';
import GroupCard from 'components/cards/GroupCard';
import Plus from 'components/icons/Plus';

const Home: React.FC = () => {
  const { data: groups, error } = useSwr<GroupCardInfo[]>(
    '/groups/getAllGroups',
    AxiosGetAllGroups
  );

  const [open, setOpen] = useState(false);

  return (
    <main className="mx-6 mb-28 lg:mx-12 xl:mx-56 flex flex-col">
      <div className="flex items-center mb-6 justify-between">
        <h2 className="text-2xl">Únete a un grupo</h2>

        <div className="inline-block sm:hidden w-20">
          <Button
            size="xs"
            icon={<Plus fill="currentColor" />}
            onClick={() => setOpen(true)}
          />
        </div>

        <div className="hidden sm:block">
          <Button size="xl" onClick={() => setOpen(true)}>
            Crear Grupo
          </Button>
        </div>

        <CreateGroupModal open={open} setOpen={setOpen} />
      </div>

      {!groups && !error && (
        <Loading type="points" color="primary" size="lg" className="mx-auto">
          Buscando grupos para tí
        </Loading>
      )}
      {groups && (
        <Grid.Container justify="center" gap={2}>
          {groups.map((group) => {
            return (
              <Grid key={group.id}>
                <GroupCard group={group} />
              </Grid>
            );
          })}
        </Grid.Container>
      )}
    </main>
  );
};

export default Home;
