// Types
import { GroupCardInfo } from 'request/groups/getAllGroups';

// Components
import Header from 'components/landing/Header';

type LandingProps = {
  groups: GroupCardInfo[];
};

const Landing: React.FC<LandingProps> = ({ groups }) => {
  return (
    <div>
      <Header />
    </div>
  );
};

export default Landing;
