// Libraries
import { Loading } from '@nextui-org/react';

// Helpers
import classNames from 'lib/classNames';

// Components
import AdminGroupsList from './AdminGroupsList';
import EmptyAdminGroups from './EmptyAdminGroups';

// Types
import { AdminGroup } from 'request/prisma/userGroups/getAdminGroups';

interface IAdminGroups {
  className?: string;
  response: any;
  error: any;
}

const AdminGroups: React.FC<IAdminGroups> = ({
  className,
  response,
  error,
}) => {
  return (
    <div className={classNames(className, 'flex flex-col')}>
      <p className="text-2xl text-center font-semibold mb-4">
        Grupos que compartes
      </p>
      {error === undefined && response === undefined && (
        <Loading className="mx-auto" />
      )}
      {response && response.data.length > 0 && (
        <AdminGroupsList adminGroups={response.data} />
      )}
      {response && response.data.length === 0 && <EmptyAdminGroups />}
    </div>
  );
};

export default AdminGroups;
