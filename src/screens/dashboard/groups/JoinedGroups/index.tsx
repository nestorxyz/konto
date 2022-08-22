// Libraries
import { Loading } from '@nextui-org/react';

// Hooks
import useApp from 'hooks/useApp';

// Types
import { Dispatch, SetStateAction } from 'react';
import { DashboardPages } from 'screens/dashboard';

// Helpers
import { classNames } from 'lib/logicFunctions';

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
  const { user } = useApp();

  if (!user) return <Loading />;

  return (
    <div className={classNames(className, 'flex flex-col')}>
      <p className="text-2xl text-center font-semibold mb-4">
        Grupos donde participas
      </p>
      {user.subscriptions.length > 0 ? (
        <JoinedGroupsList />
      ) : (
        <EmptyJoinedGroups setScreen={setScreen} />
      )}
    </div>
  );
};

export default JoinedGroups;
