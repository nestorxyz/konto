import { AxiosApi } from 'request/AxiosBase';

const AxiosGetUserInfo = async (userId: string) => {
  try {
    const result = await AxiosApi.get(`/users/getUserInfo/${userId}`);

    if (result.status == 204) return null;

    return result.data;
  } catch (error) {
    console.error('AxiosGetUserInfo Error:', error);

    if (error instanceof Error) return error;

    return new Error(`Error al ejecutar AxiosGetUserInfo: ${error}`);
  }
};

export default AxiosGetUserInfo;
