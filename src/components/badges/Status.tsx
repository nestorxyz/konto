// Helpers
import { classNames } from 'lib/logicFunctions';

export enum StatusTypes {
  success = 'success',
  warning = 'warning',
  error = 'error',
}

export interface IStatusProps {
  status: keyof typeof StatusTypes;
  children: React.ReactNode;
  className?: string;
}

const Status: React.FC<IStatusProps> = ({
  status = 'warning',
  children,
  className,
}) => {
  return (
    <span
      className={classNames(
        className,
        'py-1 px-2 rounded-md font-semibold text-sm',
        status === 'success' && 'bg-green-100 text-green-400',
        status === 'error' && 'bg-red-100 text-red-400',
        status === 'warning' && 'bg-yellow-100 text-yellow-400'
      )}
    >
      {children}
    </span>
  );
};

export default Status;
