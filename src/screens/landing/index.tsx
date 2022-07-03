// Libraries
import { Fragment } from 'react';

// Types
import { GroupCardInfo } from 'request/prisma/groups/getAllGroups';
import { Plan } from 'request/prisma/plans/getAllPlans';

// Components
import Header from 'screens/landing/Header';
import Groups from 'screens/landing/Groups';
import Services from 'screens/landing/Services';
import HowWorks from 'screens/landing/HowWorks';
import FAQ from 'screens/landing/FAQ';
import Footer from 'screens/landing/Footer';

type LandingProps = {
  groups: GroupCardInfo[];
  plans: Plan[];
};

const Landing: React.FC<LandingProps> = ({ groups, plans }) => {
  return (
    <Fragment>
      <Header />
      <Groups groups={groups} />
      <Services plans={plans} />
      <HowWorks />
      <FAQ />
      <Footer />
    </Fragment>
  );
};

export default Landing;
