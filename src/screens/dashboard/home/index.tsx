// Libraries
import { useState } from 'react';
import { Button } from '@nextui-org/react';

// Components
import CreateGroupModal from './CreateGroupModal';

const Home: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <main className="mx-6 mb-28 lg:mx-12 xl:mx-56">
      <div className="flex items-center mb-6 justify-between">
        <h2 className="text-2xl">Únete a un grupo</h2>

        <Button size="xl" onClick={() => setOpen(true)}>
          Crear Grupo
        </Button>
        <CreateGroupModal open={open} setOpen={setOpen} />
      </div>

      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 lg:grid-cols-3">
        {groups ? (
          groups.map((group) => {
            return <GroupCard key={group.id} data={group} />;
          })
        ) : (
          <h2>Loading...</h2>
        )}
      </div> */}
    </main>
  );
};

export default Home;
