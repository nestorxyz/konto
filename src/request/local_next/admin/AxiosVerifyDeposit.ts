import { AxiosApi } from 'request/AxiosBase';

const AxiosVerifyDeposit = async (depositId: string) => {
  try {
    const result = await AxiosApi.post('/admin/verifyDeposit', {
      depositId,
    });

    if (result.status == 204) return null;

    return result.data;
  } catch (error) {
    console.error('AxiosVerifyDeposit Error:', error);

    if (error instanceof Error) return error;

    return new Error(`Error al ejecutar AxiosVerifyDeposit: ${error}`);
  }
};

export default AxiosVerifyDeposit;
