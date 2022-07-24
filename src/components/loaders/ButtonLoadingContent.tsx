// Libraries
import { Loading } from '@nextui-org/react';

interface IButtonLoadingContentProps {
  children: React.ReactNode;
}

const ButtonLoadingContent: React.FC<IButtonLoadingContentProps> = ({
  children,
}) => {
  return (
    <span className="flex gap-2 items-center">
      <Loading size="xs" color="primary" />
      <span>{children}</span>
    </span>
  );
};

export default ButtonLoadingContent;
