import { AxiosApi } from 'request/AxiosBase';

const AxiosGetAllUserGroups = async () => {
  try {
    const result = await AxiosApi.post('/admin/getAllUserGroups');

    if (result.status == 204) return null;

    return result.data;
  } catch (error) {
    console.error('AxiosGetAllUserGroups Error:', error);

    if (error instanceof Error) return error;

    return new Error(`Error al ejecutar AxiosGetAllUserGroups: ${error}`);
  }
};

export default AxiosGetAllUserGroups;
