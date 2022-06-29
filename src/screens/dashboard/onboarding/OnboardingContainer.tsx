interface IOnboardingContainerProps {
  children: React.ReactNode;
}

const OnboardingContainer: React.FC<IOnboardingContainerProps> = ({
  children,
}) => {
  return (
    <div className="flex p-6 flex-col lg:mx-12 xl:mx-24">
      <div className="flex items-center">
        <img src="/logo.svg" width="58" height="61.5" />
        <p className="font-bold text-4xl text-primary ml-4">Konto</p>
      </div>
      {children}
    </div>
  );
};

export default OnboardingContainer;
