// Libraries
import { Loading } from '@nextui-org/react';

// Helpers
import { classNames } from 'lib/logicFunctions';

// Hooks
import useAdminGroups from 'hooks/useAdminGroups';

// Components
import AdminGroupsList from './AdminGroupsList';
import EmptyAdminGroups from './EmptyAdminGroups';

interface IAdminGroups {
  className?: string;
}

const AdminGroups: React.FC<IAdminGroups> = ({ className }) => {
  const { loading, adminGroups } = useAdminGroups();

  return (
    <div className={classNames(className, 'flex flex-col')}>
      <p className="text-2xl text-center font-semibold mb-4">
        Grupos que compartes
      </p>
      {loading && <Loading className="mx-auto" />}
      {adminGroups && adminGroups.length > 0 && (
        <AdminGroupsList adminGroups={adminGroups} />
      )}
      {adminGroups && adminGroups.length === 0 && <EmptyAdminGroups />}
    </div>
  );
};

export default AdminGroups;
