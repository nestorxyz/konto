// Hooks
import useUser from 'hooks/useUser';

// Components
import OnboardingContainer from 'screens/dashboard/onboarding/OnboardingContainer';
import AddPhone from './AddPhone';
import VerifyPhone from './VerifyCode';

const AddPhoneOnboarding: React.FC<{}> = () => {
  const { user } = useUser();

  return (
    <OnboardingContainer className="min-w-[320px] md:w-96 mt-8 mx-auto">
      {user && !user.phone && <AddPhone />}
      {user && !user.phoneVerified && <VerifyPhone />}
    </OnboardingContainer>
  );
};

export default AddPhoneOnboarding;
