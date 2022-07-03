// Libraries
import useSWR from 'swr';
import { Loading } from '@nextui-org/react';

// Hooks
import useUser from 'hooks/useUser';

// Request
import AxiosGetAdminGroups from 'request/local_next/userGroups/AxiosGetAdminGroups';

// Components
import AdminGroupsList from './AdminGroupsList';
import EmptyAdminGroups from './EmptyAdminGroups';

const AdminGroups: React.FC = () => {
  const { user } = useUser();

  const { data: response, error } = useSWR(
    ['/userGroups/getAdminGroups', user.id],
    AxiosGetAdminGroups
  );

  return (
    <div className="flex flex-col md:w-80">
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
