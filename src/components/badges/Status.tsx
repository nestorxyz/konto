// Helpers
import classNames from 'lib/classNames';

interface IStatusProps {
  status: 'success' | 'error' | 'warning';
  children: React.ReactNode;
}

const Status: React.FC<IStatusProps> = ({ status = 'warning', children }) => {
  return (
    <span
      className={classNames(
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
