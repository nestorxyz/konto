// Libraries
import { useState } from 'react';
import { PlusIcon } from '@heroicons/react/solid';
import { Button, Card } from '@nextui-org/react';

// Helpers
import classNames from 'lib/classNames';

// Components
import CreateGroupModal from 'screens/dashboard/home/CreateGroupModal';

interface IEmptyAdminGroupsProps {
  className?: string;
}

const EmptyAdminGroups: React.FC<IEmptyAdminGroupsProps> = ({ className }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={classNames(className, 'flex flex-col text-center')}>
      <p className="text-lg mb-4">Aún no eres admin de un grupo</p>
      <div>
        <Card
          isPressable
          onPress={() => setOpen(true)}
          color="primary"
          isHoverable
          variant="bordered"
        >
          <Card.Body>
            <div className="flex items-center justify-center text-primary font-semibold text-lg">
              <PlusIcon className="w-6 h-6 mr-2" /> Crear grupo
            </div>
          </Card.Body>
        </Card>
      </div>
      <CreateGroupModal open={open} setOpen={setOpen} />
    </div>
  );
};

export default EmptyAdminGroups;
