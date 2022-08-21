import { AxiosApi } from 'request/AxiosBase';

interface IAxiosValidateJoinGroupPaymentProps {
  userId: string;
  groupId: string;
  paymentMethodId: string;
}

const AxiosValidateJoinGroupPayment = async (
  params: IAxiosValidateJoinGroupPaymentProps
) => {
  try {
    const result = await AxiosApi.post('/payments/userJoinGroup', params);

    return result.data;
  } catch (error) {
    console.error('AxiosValidateJoinGroupPayment() Error:', error);

    if (error instanceof Error) return error;

    return new Error(
      `Error al ejecutar AxiosValidateJoinGroupPayment: ${error}`
    );
  }
};

export default AxiosValidateJoinGroupPayment;
