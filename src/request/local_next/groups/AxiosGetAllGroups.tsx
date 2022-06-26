import { AxiosApi } from 'request/AxiosBase';

const AxiosGetAllGroups = async () => {
  try {
    const result = await AxiosApi.get('/groups/getAllGroups');

    if (result.status == 204) return null;

    return result.data;
  } catch (error) {
    console.error('AxiosGetAllGroups Error:', error);

    if (error instanceof Error) return error;

    return new Error(`Error al ejecutar AxiosGetAllGroups: ${error}`);
  }
};

export default AxiosGetAllGroups;
