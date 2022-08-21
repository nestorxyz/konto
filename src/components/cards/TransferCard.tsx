// Libraries
import { ImArrowDownRight2, ImArrowUpLeft2 } from 'react-icons/im';
import classNames from 'classnames';

// Lib
import { formatTransferInfo } from 'lib/formatData';

// Components
import Status, { StatusTypes } from 'components/badges/Status';

interface ITransferCardProps {
  type: 'moneyIn' | 'moneyOut';
  title: string;
  subtitle: string;
  status: keyof typeof StatusTypes;
  statusText: string;
  amount: number;
}

const TransferCard: React.FC<ITransferCardProps> = (props) => {
  const { type, title, subtitle, status, statusText, amount } = props;

  return (
    <div className="flex items-center gap-2 border-b border-gray-200 pb-2">
      <div
        className={classNames(
          type === 'moneyIn' ? 'bg-primary-50' : 'bg-red-50 ',
          'min-h-[40px] max-h-[40px] min-w-[40px] max-w-[40px] rounded-full flex items-center justify-center'
        )}
      >
        {type === 'moneyIn' ? (
          <ImArrowDownRight2 className="text-primary" />
        ) : (
          <ImArrowUpLeft2 className="text-red-400" />
        )}
      </div>
      <div>
        <p className="text-primary-800 leading-5 font-medium">{title}</p>
        <p className="text-gray-400 text-sm">{subtitle}</p>
      </div>
      <Status className="ml-auto" status={status}>
        {statusText}
      </Status>
      <p className="ml-4 text-lg whitespace-nowrap font-medium text-gray-800">
        {formatTransferInfo(type, amount)}
      </p>
    </div>
  );
};

export default TransferCard;
