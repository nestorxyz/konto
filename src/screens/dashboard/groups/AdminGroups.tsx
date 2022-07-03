// Libraries
import useSWR from 'swr';
import { Loading } from '@nextui-org/react';

// Hooks
import useUser from 'hooks/useUser';

// Helpers
import classNames from 'lib/classNames';

// Request
import AxiosGetAdminGroups from 'request/local_next/userGroups/AxiosGetAdminGroups';

// Components
import AdminGroupsList from './AdminGroupsList';
import EmptyAdminGroups from './EmptyAdminGroups';

interface IAdminGroups {
  className?: string;
}

const AdminGroups: React.FC<IAdminGroups> = ({ className }) => {
  const { user } = useUser();

  const { data: response, error } = useSWR(
    ['/userGroups/getAdminGroups', user.id],
    AxiosGetAdminGroups
  );

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
