import { AxiosApi } from 'request/AxiosBase';

interface IAxiosGetJoinedGroups {
  url: string;
  id: string;
}

const AxiosGetJoinedGroups = async (params: IAxiosGetJoinedGroups) => {
  const { id: userId } = params;

  try {
    const result = await AxiosApi.post('/userGroups/getJoinedGroups', {
      userId,
    });

    return result.data;
  } catch (error) {
    console.log('AxiosGetJoinedGroups Error:', error);
    if (error instanceof Error) return error;

    return new Error('Error al ejecutar AxiosGetJoinedGroups: ' + error);
  }
};

export default AxiosGetJoinedGroups;
