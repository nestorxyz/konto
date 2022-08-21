// Libraries
import { Card, Text, User } from '@nextui-org/react';

// Lib
import { formatTransferInfo } from 'lib/formatData';

interface INextPaymentCardProps {
  type: 'moneyIn' | 'moneyOut';
  image?: string;
  name: string;
  title: string;
  subtitle: string;
  amount: number;
}

const NextPaymentCard: React.FC<INextPaymentCardProps> = (props) => {
  const { type, image, name, title, subtitle, amount } = props;

  return (
    <div className="flex justify-between items-center">
      <User
        {...(image
          ? {
              src: image,
            }
          : { text: name! })}
        name={<p className="text-primary-800 font-semibold">{title}</p>}
        description={subtitle}
        style={{ padding: '0' }}
      />
      <Text
        color={type === 'moneyIn' ? 'success' : 'error'}
        className="font-medium text-xl"
      >
        {formatTransferInfo(type, amount)}
      </Text>
    </div>
  );
};

export default NextPaymentCard;
