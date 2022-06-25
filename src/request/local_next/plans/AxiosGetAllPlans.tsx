import { AxiosApi } from 'request/AxiosBase';

const AxiosGetAllPlans = async () => {
  try {
    const result = await AxiosApi.get('/plans/getAllPlans');

    if (result.status == 204) return null;

    return result.data;
  } catch (error) {
    console.error('AxiosGetAllPlans Error:', error);

    if (error instanceof Error) return error;

    return new Error(`Error al ejecutar AxiosGetAllPlans: ${error}`);
  }
};

export default AxiosGetAllPlans;
