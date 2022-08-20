import { AxiosApi } from 'request/AxiosBase';

const AxiosValidateUserJoinGroup = async (subscriptionId: string) => {
  try {
    const result = await AxiosApi.post('/admin/validateUserJoinGroup', {
      subscriptionId,
    });

    return result.data;
  } catch (error) {
    console.error('AxiosValidateUserJoinGroup Error:', error);

    if (error instanceof Error) return error;

    return new Error(`Error al ejecutar AxiosValidateUserJoinGroup: ${error}`);
  }
};

export default AxiosValidateUserJoinGroup;
