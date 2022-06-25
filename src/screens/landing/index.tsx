// Libraries
import { Fragment } from 'react';

// Types
import { GroupCardInfo } from 'request/prisma/groups/getAllGroups';

// Components
import Header from 'screens/landing/Header';
import Groups from 'screens/landing/Groups';
import Services from 'screens/landing/Services';
import HowWorks from 'screens/landing/HowWorks';
import FAQ from 'screens/landing/FAQ';
import Footer from 'screens/landing/Footer';

type LandingProps = {
  groups: GroupCardInfo[];
};

const Landing: React.FC<LandingProps> = ({ groups }) => {
  return (
    <Fragment>
      <Header />
      <Groups groups={groups} />
      <Services />
      <HowWorks />
      <FAQ />
      <Footer />
    </Fragment>
  );
};

export default Landing;
