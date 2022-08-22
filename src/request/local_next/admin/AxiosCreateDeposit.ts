import { AxiosApi } from 'request/AxiosBase';

interface IAxiosCreateDepositParams {
  amount: number;
  userId: string;
  paymentMethodId: string;
  keyInfo: string;
}

const AxiosCreateDeposit = async (params: IAxiosCreateDepositParams) => {
  try {
    const { amount, userId, paymentMethodId, keyInfo } = params;

    const deposit = await AxiosApi.post<boolean>('/admin/createDeposit', {
      amount,
      userId,
      paymentMethodId,
      keyInfo,
    });

    if (deposit.status == 204) return null;

    return deposit.data;
  } catch (error) {
    console.error('AxiosCreateDeposit Error:', error);

    if (error instanceof Error) return error;

    return new Error(`Error al ejecutar AxiosCreateDeposit: ${error}`);
  }
};

export default AxiosCreateDeposit;
