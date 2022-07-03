import { AxiosApi } from 'request/AxiosBase';

interface IAxiosGetAdminGroups {
  url: string;
  id: string;
}

const AxiosGetAdminGroups = async (url: string, id: string) => {
  try {
    const result = await AxiosApi.post('/userGroups/getAdminGroups', {
      userId: id,
    });

    return result.data;
  } catch (error) {
    console.log('AxiosGetJoinedGroups Error:', error);
    if (error instanceof Error) return error;

    return new Error('Error al ejecutar AxiosGetJoinedGroups: ' + error);
  }
};

export default AxiosGetAdminGroups;
