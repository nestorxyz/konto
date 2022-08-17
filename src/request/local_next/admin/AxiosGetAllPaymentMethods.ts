import { AxiosApi } from 'request/AxiosBase';

const AxiosGetAllPaymentMethods = async () => {
  try {
    const result = await AxiosApi.get('/admin/getAllPaymentMethods');

    if (result.status == 204) return null;

    return result.data;
  } catch (error) {
    console.error('AxiosGetAllPaymentMethods Error:', error);

    if (error instanceof Error) return error;

    return new Error(`Error al ejecutar AxiosGetAllPaymentMethods: ${error}`);
  }
};

export default AxiosGetAllPaymentMethods;
