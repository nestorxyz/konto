// Libraries
import toast from 'react-hot-toast';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { LockClosedIcon } from '@heroicons/react/solid';
import { Button, Modal, Text } from '@nextui-org/react';

// Types
import { GroupInfo } from 'request/prisma/groups/getGroup';

// Requests
import AxiosValidateYapePayments from 'request/local_next/payments/AxiosValidateYapePayment';

// Hooks
import useApp from 'hooks/useApp';

// Helpers
import mapServiceToImage from 'lib/mapServiceToImage';

interface IPayModalProps {
  showPayModal: boolean;
  setShowPayModal: (showPayModal: boolean) => void;
  group: GroupInfo;
}

const PayModal: React.FC<IPayModalProps> = ({
  showPayModal,
  setShowPayModal,
  group,
}) => {
  const router = useRouter();
  const { data: session } = useSession();
  const { updateAppRedux, app } = useApp();
  const [loading, setLoading] = useState(false);

  const handlePay = async () => {
    setLoading(true);
    const response = await AxiosValidateYapePayments({
      groupId: group!.id,
      userId: session?.user?.id as string,
    });
    setLoading(false);
    if (response.success) {
      setShowPayModal(false);
      localStorage.setItem('paymentIntent', 'true');
      toast.success('Estamos validando tu pago');
      router.push('/');
    }
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
        <div className="flex md:shadow-sm md:gap-6 gap-2 py-6 md:px-2 rounded-lg">
          <img
            src={mapServiceToImage(group!.plan.service.value)}
            className="w-40 rounded-lg h-40 object-cover"
          />
          <div>
            <p className="font-semibold text-gray-900 text-xl">
              Cuenta de {group!.plan.service.name}
            </p>
            <p className="font-bold text-primary text-xl">
              S/ {group!.plan.joinerPay}
            </p>
            <p className="text-gray-500 font-medium mt-4">Tiempo: 1 mes</p>

            <p className="text-gray-500 font-medium">
              Credenciales Verificadas
            </p>
          </div>
        </div>
        <div className="flex justify-between border-t-2 pt-4">
          <p className="text-xl font-semibold">Total:</p>
          <p className="text-xl font-semibold text-primary ">
            S/ {group!.plan.joinerPay}
          </p>
        </div>
        <Text blockquote>
          <div className="flex items-center gap-6">
            <img
              src={mapServiceToImage('yape')}
              className="rounded-lg h-10 w-10 md:h-12 md:w-12"
            />{' '}
            <div className="flex justify-center w-full flex-col items-center">
              <p className="font-semibold text-xl">
                Yapea al siguiente número{' '}
              </p>
              <span className="text-xl font-bold text-[#5f0b72]">
                989 009 435
              </span>
            </div>
          </div>
        </Text>
        <p className="text-gray-600 font-medium">
          Cuando validemos tu pago, te notificaremos
        </p>
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
