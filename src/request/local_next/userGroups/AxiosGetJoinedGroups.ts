import { AxiosApi } from 'request/AxiosBase';

interface IAxiosGetJoinedGroups {
  url: string;
  id: string;
}

const AxiosGetJoinedGroups = async (url: string, id: string) => {
  try {
    const result = await AxiosApi.post('/userGroups/getJoinedGroups', {
      userId: id,
    });

    return result.data;
  } catch (error) {
    console.log('AxiosGetJoinedGroups Error:', error);
    if (error instanceof Error) return error;

    return new Error('Error al ejecutar AxiosGetJoinedGroups: ' + error);
  }
};

export default AxiosGetJoinedGroups;
