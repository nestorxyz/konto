// Helpers
import { classNames } from 'lib/logicFunctions';

interface IOnboardingContainerProps {
  children: React.ReactNode;
  className?: string;
}

const OnboardingContainer: React.FC<IOnboardingContainerProps> = ({
  children,
  className,
}) => {
  return (
    <div className="flex p-6 flex-col lg:mx-12 xl:mx-24 min-h-screen">
      <div className="flex items-center">
        <img src="/logo.svg" width="58" height="61.5" />
        <p className="font-bold text-4xl text-primary ml-4">Konto</p>
      </div>
      <div className={classNames(className, 'flex-1 flex flex-col')}>
        {children}
      </div>
    </div>
  );
};

export default OnboardingContainer;
