// Libraries
import useSWR from 'swr';
import { Loading } from '@nextui-org/react';

// Hooks
import useUser from 'hooks/useUser';

// Types
import { Dispatch, SetStateAction } from 'react';
import { DashboardPages } from 'screens/dashboard';

// Helpers
import classNames from 'lib/classNames';

// Request
import AxiosGetJoinedGroups from 'request/local_next/userGroups/AxiosGetJoinedGroups';

// Components
import EmptyJoinedGroups from './EmptyJoinedGroups';
import JoinedGroupsList from './JoinedGroupsList';

interface IJoinedGroupsProps {
  setScreen: Dispatch<SetStateAction<keyof typeof DashboardPages>>;
  className?: string;
}

const JoinedGroups: React.FC<IJoinedGroupsProps> = ({
  setScreen,
  className,
}) => {
  const { user } = useUser();

  const { data: response, error } = useSWR(
    ['/userGroups/getJoinedGroups', user.id],
    AxiosGetJoinedGroups
  );

  return (
    <div className={classNames(className, 'flex flex-col')}>
      <p className="text-2xl text-center font-semibold mb-4">
        Grupos donde participas
      </p>
      {error === undefined && response === undefined && (
        <Loading className="mx-auto" />
      )}
      {response && response.data.length > 0 && (
        <JoinedGroupsList joinedGroups={response.data} />
      )}
      {response && response.data.length === 0 && (
        <EmptyJoinedGroups setScreen={setScreen} />
      )}
    </div>
  );
};

export default JoinedGroups;
