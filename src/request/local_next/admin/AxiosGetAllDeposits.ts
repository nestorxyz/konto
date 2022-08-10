import { AxiosApi } from 'request/AxiosBase';

const AxiosGetAllDeposits = async () => {
  try {
    const result = await AxiosApi.post('/admin/getAllDeposits');

    if (result.status == 204) return null;

    return result.data;
  } catch (error) {
    console.error('AxiosGetAllDeposits Error:', error);

    if (error instanceof Error) return error;

    return new Error(`Error al ejecutar AxiosGetAllDeposits: ${error}`);
  }
};

export default AxiosGetAllDeposits;
