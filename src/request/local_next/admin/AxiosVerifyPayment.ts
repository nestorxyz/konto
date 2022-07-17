import { AxiosApi } from 'request/AxiosBase';

const AxiosVerifyPayment = async (userGroupId: string) => {
  try {
    const result = await AxiosApi.post('/admin/verifyPayment', {
      userGroupId,
    });

    if (result.status == 204) return null;

    return result.data;
  } catch (error) {
    console.error('AxiosVerifyPayment Error:', error);

    if (error instanceof Error) return error;

    return new Error(`Error al ejecutar AxiosVerifyPayment: ${error}`);
  }
};

export default AxiosVerifyPayment;
