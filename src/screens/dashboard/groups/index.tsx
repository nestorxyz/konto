// Types
import { Dispatch, SetStateAction } from 'react';
import { DashboardPages } from 'screens/dashboard';

// Components
import JoinedGroups from './Joinedgroups';

interface IMyGroupsProps {
  setScreen: Dispatch<SetStateAction<keyof typeof DashboardPages>>;
}

const MyGroups: React.FC<IMyGroupsProps> = ({ setScreen }) => {
  return (
    <main className="mx-6 mb-28 lg:mx-12 xl:mx-56 flex flex-col">
      <JoinedGroups setScreen={setScreen} />
    </main>
  );
};

export default MyGroups;
