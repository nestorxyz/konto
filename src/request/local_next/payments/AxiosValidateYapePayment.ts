import { AxiosApi } from 'request/AxiosBase';

interface IAxiosValidateYapePaymentsProps {
  userId: string;
  groupId: string;
}

const AxiosValidateYapePayments = async (
  params: IAxiosValidateYapePaymentsProps
) => {
  try {
    const result = await AxiosApi.post('/payments/validateYapePayment', params);

    if (result.status == 204) return null;

    return result.data;
  } catch (error) {
    console.error('AxiosValidateYapePayments Error:', error);

    if (error instanceof Error) return error;

    return new Error(`Error al ejecutar AxiosValidateYapePayments: ${error}`);
  }
};

export default AxiosValidateYapePayments;
