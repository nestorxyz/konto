// Libraries
import toast from 'react-hot-toast';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { LockClosedIcon } from '@heroicons/react/solid';
import { MdOutlineContentCopy } from 'react-icons/md';
import { Button, Modal, Popover } from '@nextui-org/react';

// Types
import { GroupInfo } from 'request/prisma/groups/getGroup';
import { PaymentMethod } from 'request/prisma/paymentMethod/getAllPaymentMethods';

// Requests
import AxiosValidateJoinGroupPayment from 'request/local_next/payments/AxiosValidateJoinGroupPayment';

// Helpers
import { mapServiceToImage, classNames } from 'lib/logicFunctions';

interface IPayModalProps {
  group: GroupInfo;
  paymentMethods: PaymentMethod[];
  showPayModal: boolean;
  setShowPayModal: (showPayModal: boolean) => void;
}

const PayModal: React.FC<IPayModalProps> = ({
  group,
  paymentMethods,
  showPayModal,
  setShowPayModal,
}) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<PaymentMethod>(paymentMethods[3]);

  const handlePay = async () => {
    setLoading(true);
    const response = await AxiosValidateJoinGroupPayment({
      groupId: group!.id,
      userId: session?.user?.id as string,
      paymentMethodId: selectedPaymentMethod.id,
    });
    setLoading(false);
    if (response.error) {
      setShowPayModal(false);
      toast.error(response.error);
    }
    if (response.success) {
      setShowPayModal(false);
      localStorage.setItem('paymentIntent', 'true');
      toast.success('Estamos validando tu pago');
      router.push('/?redirect=groups');
    }
  };

  const handleCopy = (paymentMethod: PaymentMethod) => {
    navigator.clipboard.writeText(paymentMethod.keyInfo);
  };

  return (
    <Modal
      closeButton
      aria-labelledby="unirse-a-grupo"
      open={showPayModal}
      onClose={() => setShowPayModal(false)}
      width="500px"
    >
      <Modal.Body>
        <p className="text-3xl mb-0 font-semibold text-gray-700 border-b-2 pb-4">
          Unirse al grupo
        </p>
        <div className="flex items-center md:gap-6 gap-2 md:px-2">
          <div className="w-20 rounded-lg overflow-hidden h-20 relative">
            <Image
              src={mapServiceToImage(group!.plan.service.value)}
              className="object-cover"
              placeholder="blur"
              layout="fill"
            />
          </div>
          <div>
            <p className="font-semibold text-gray-900 text-xl">
              Cuenta de {group!.plan.service.name}
            </p>
            <p className="font-bold text-primary text-xl">
              S/ {group!.plan.joinerPay}
            </p>
            <p className="text-gray-500 font-medium text-sm">Tiempo: 1 mes</p>

            <p className="text-gray-500 font-medium text-sm">
              Credenciales Verificadas
            </p>
          </div>
        </div>

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

        <div>
          <div className="flex items-center gap-4">
            <div className="flex justify-center w-full flex-col items-center">
              <p className="text-center mb-2 text-lg">
                {selectedPaymentMethod.type === 'YAPE'
                  ? 'Yapea al siguiente número'
                  : `Realiza una transferencia a la siguiente cuenta ${selectedPaymentMethod.type}`}
              </p>

              <Popover placement="right">
                <Popover.Trigger>
                  <div
                    className="flex gap-2 items-center"
                    onClick={() => handleCopy(selectedPaymentMethod)}
                  >
                    <p className="text-xl font-semibold text-primary">
                      {selectedPaymentMethod.keyInfo}
                    </p>
                    <MdOutlineContentCopy className="h-6 w-6 text-primary" />
                  </div>
                </Popover.Trigger>
                <Popover.Content>
                  <p className="px-3">Copiado</p>
                </Popover.Content>
              </Popover>
            </div>
          </div>
        </div>
        <p className="text-gray-600 font-medium">
          Cuando validemos tu pago, te notificaremos
        </p>

        <div className="flex justify-between border-t-2 pt-4">
          <p className="text-xl font-semibold">Total:</p>
          <p className="text-xl font-semibold text-primary ">
            S/ {group!.plan.joinerPay}
          </p>
        </div>

        <Button size="lg" className="mt-6" onClick={handlePay}>
          {loading ? (
            'Enviando información...'
          ) : (
            <>
              <LockClosedIcon className="h-6 w-6 text-white" />{' '}
              <span className="ml-2 text-xl">
                Validar pago de S/ {group!.plan.joinerPay}
              </span>
            </>
          )}
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default PayModal;
