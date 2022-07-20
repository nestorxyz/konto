// Types
import { Dispatch, SetStateAction } from 'react';
import { DashboardPages } from 'screens/dashboard';

// Components
import JoinedGroups from './JoinedGroups';
import AdminGroups from './AdminGroups';
interface IMyGroupsProps {
  response: any;
  error: any;
  setScreen: Dispatch<SetStateAction<keyof typeof DashboardPages>>;
}

const MyGroups: React.FC<IMyGroupsProps> = ({ setScreen, response, error }) => {
  return (
    <main className="mx-6 mb-28 lg:mx-12 xl:mx-56 flex flex-col md:flex-row gap-6 lg:gap-20 justify-center">
      <AdminGroups
        className="md:w-80 lg:w-96"
        response={response}
        error={error}
      />

      <JoinedGroups className="md:w-80 lg:w-96" setScreen={setScreen} />
    </main>
  );
};

export default MyGroups;
