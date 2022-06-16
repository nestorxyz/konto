// Types
import { GroupCardInfo } from 'request/groups/getAllGroups';

// Components
import Header from 'screens/landing/Header';
import Groups from 'screens/landing/Groups';

type LandingProps = {
  groups: GroupCardInfo[];
};

const Landing: React.FC<LandingProps> = ({ groups }) => {
  return (
    <div>
      <Header />
      <Groups groups={groups} />
    </div>
  );
};

export default Landing;
