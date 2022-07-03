// Libraries
import useSWR from 'swr';
import { Loading } from '@nextui-org/react';

// Hooks
import useUser from 'hooks/useUser';

// Types
import { Dispatch, SetStateAction } from 'react';
import { DashboardPages } from 'screens/dashboard';

// Request
import AxiosGetJoinedGroups from 'request/local_next/userGroups/AxiosGetJoinedGroups';

// Components
import EmptyJoinedGroups from './EmptyJoinedGroups';

interface IJoinedGroupsProps {
  setScreen: Dispatch<SetStateAction<keyof typeof DashboardPages>>;
}

const JoinedGroups: React.FC<IJoinedGroupsProps> = ({ setScreen }) => {
  const { user } = useUser();

  const { data, error } = useSWR(
    ['/userGroups/getJoinedGroups', user.id],
    AxiosGetJoinedGroups
  );

  return (
    <div className="">
      <p className="text-2xl text-center font-semibold mb-4">
        Grupos donde participas
      </p>
      {error === undefined && data === undefined && <Loading />}
      {data.data && data.data.length > 0 && <div>Joined</div>}
      {data.data && data.data.length === 0 && (
        <EmptyJoinedGroups setScreen={setScreen} />
      )}
    </div>
  );
};

export default JoinedGroups;
