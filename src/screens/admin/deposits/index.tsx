// Libraries
import useSWR from 'swr';
import toast from 'react-hot-toast';
import { Button } from '@nextui-org/react';

// Request
import AxiosGetAllDeposits from 'request/local_next/admin/AxiosGetAllDeposits';
import AxiosVerifyDeposit from 'request/local_next/admin/AxiosVerifyDeposit';

//Types
import { AdminDeposit } from 'request/prisma/admin/getAllDeposits';

// Components
import DepositList from './DepositsList';

const Deposits: React.FC = () => {
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
      <Button auto className="ml-auto">
        Nuevo depósito
      </Button>
      <DepositList
        deposits={response}
        error={error}
        handleVerifyDeposit={handleVerifyDeposit}
      />
    </div>
  );
};

export default Deposits;
