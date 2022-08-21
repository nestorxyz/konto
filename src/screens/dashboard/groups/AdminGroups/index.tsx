// Libraries
import { Loading } from '@nextui-org/react';

// Helpers
import { classNames } from 'lib/logicFunctions';

// Hooks
import useApp from 'hooks/useApp';

// Components
import AdminGroupsList from './AdminGroupsList';
import EmptyAdminGroups from './EmptyAdminGroups';

interface IAdminGroups {
  className?: string;
}

const AdminGroups: React.FC<IAdminGroups> = ({ className }) => {
  const { user } = useApp();

  if (!user) return <Loading />;

  return (
    <div className={classNames(className, 'flex flex-col')}>
      <p className="text-2xl text-center font-semibold mb-4">
        Grupos que compartes
      </p>
      {user.groups.length > 0 ? <AdminGroupsList /> : <EmptyAdminGroups />}
    </div>
  );
};

export default AdminGroups;
