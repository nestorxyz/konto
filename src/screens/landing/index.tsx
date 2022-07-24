// Libraries
import { Fragment, useEffect } from 'react';

// Types
import { GroupCardInfo } from 'request/prisma/groups/getAllGroups';
import { Plan } from 'request/prisma/plans/getAllPlans';

// Helpers
import mixpanel from 'lib/mixpanel';

// Components
import Header from 'screens/landing/Header';
import Groups from 'screens/landing/Groups';
import HowWorks from 'screens/landing/HowWorks';
import FAQ from 'screens/landing/FAQ';
import Footer from 'screens/landing/Footer';

type LandingProps = {
  groups: GroupCardInfo[];
  plans: Plan[];
};

const Landing: React.FC<LandingProps> = ({ groups, plans }) => {
  useEffect(() => {
    mixpanel.track('Landing Hit');
  }, []);

  return (
    <Fragment>
      <Header />
      <Groups groups={groups} />
      {/* <Services plans={plans} /> */}
      <HowWorks />
      <FAQ />
      <Footer />
    </Fragment>
  );
};

export default Landing;
