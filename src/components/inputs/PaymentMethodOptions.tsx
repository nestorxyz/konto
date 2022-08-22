// Libraries
import Image from 'next/image';
import { Button } from '@nextui-org/react';
import classNames from 'classnames';

// Types
import { PaymentMethod } from 'request/prisma/paymentMethod/getAllPaymentMethods';

// Helpers
import { mapServiceToImage } from 'lib/logicFunctions';

interface IPaymentMethodOptionsProps {
  paymentMethods: Array<PaymentMethod>;
  selectedPaymentMethod: PaymentMethod;
  setSelectedPaymentMethod: (paymentMethod: PaymentMethod) => void;
}

const PaymentMethodOptions: React.FC<IPaymentMethodOptionsProps> = (props) => {
  const { paymentMethods, selectedPaymentMethod, setSelectedPaymentMethod } =
    props;

  return (
    <div>
      <p className="text-xl mb-2 text-gray-800 font-medium">
        Elige un método de pago
      </p>
      <div className="flex gap-3 justify-center flex-wrap">
        {paymentMethods.map((paymentMethod) => (
          <Button
            {...(selectedPaymentMethod.type === paymentMethod.type
              ? { bordered: true }
              : { light: true })}
            color="success"
            style={{
              height: '75px',
              minWidth: '75px',
              width: '75px',
              padding: '0',
            }}
            className={classNames(
              selectedPaymentMethod.type === paymentMethod.type
                ? 'scale-105'
                : 'opacity-50',
              'hover:scale-105 transition-all'
            )}
            onClick={() => setSelectedPaymentMethod(paymentMethod)}
          >
            <div className="h-16 w-16 relative rounded-lg overflow-clip">
              <Image
                src={mapServiceToImage(paymentMethod.type)}
                placeholder="blur"
                className="object-cover"
                layout="fill"
              />
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default PaymentMethodOptions;
