// Libraries
import { Input } from '@nextui-org/react';

// Components
import OnboardingContainer from './OnboardingContainer';

const AddPhoneOnboarding: React.FC<{}> = () => {
  const AddPhone: React.FC = () => {
    return (
      <>
        <h2 className="text-gray-800 mx-auto mt-4">Agrega tu número</h2>
      </>
    );
  };

  return (
    <OnboardingContainer>
      <AddPhone />
    </OnboardingContainer>
  );
};

export default AddPhoneOnboarding;
