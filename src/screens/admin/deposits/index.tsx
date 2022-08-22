// Libraries
import { useState } from 'react';
import useSWR from 'swr';
import toast from 'react-hot-toast';
import { Button } from '@nextui-org/react';

// Request
import AxiosGetAllDeposits from 'request/local_next/admin/AxiosGetAllDeposits';
import AxiosVerifyDeposit from 'request/local_next/admin/AxiosVerifyDeposit';

// Types
import { AdminDeposit } from 'request/prisma/admin/getAllDeposits';
import { PaymentMethod } from 'request/prisma/paymentMethod/getAllPaymentMethods';

// Components
import DepositList from './DepositsList';
import CreateDepositModal from './CreateDepositModal';

interface IDepositProps {
  paymentMethods: Array<PaymentMethod>;
}

const Deposits: React.FC<IDepositProps> = (props) => {
  const { paymentMethods } = props;
  const [showDepositModal, setShowDepositModal] = useState(false);

  const { data: response, error } = useSWR<Array<AdminDeposit>>(
    '/admin/getAllDeposits',
    AxiosGetAllDeposits
  );

  const handleVerifyDeposit = async (deposit: AdminDeposit) => {
    toast.promise(AxiosVerifyDeposit(deposit.id), {
      loading: 'Validando depósito...',
      success: 'Depósito validado',
      error: 'Error validando depósito',
    });
  };

  return (
    <div className="flex flex-col gap-5">
      <Button
        auto
        className="ml-auto"
        onClick={() => setShowDepositModal(true)}
      >
        Nuevo depósito
      </Button>
      <DepositList
        deposits={response}
        error={error}
        handleVerifyDeposit={handleVerifyDeposit}
      />
      <CreateDepositModal
        paymentMethods={paymentMethods}
        showDepositModal={showDepositModal}
        setShowDepositModal={setShowDepositModal}
      />
    </div>
  );
};

export default Deposits;
