import { AxiosApi } from 'request/AxiosBase';

interface IAxiosEditGroupCredentialsParams {
  groupId: string;
  credentialEmail: string;
  credentialPassword: string;
}

const AxiosEditGroupCredentials = async (
  params: IAxiosEditGroupCredentialsParams
) => {
  try {
    const result = await AxiosApi.post('/groups/editGroupCredentials', params);

    if (result.status == 204) return null;

    return result.data;
  } catch (error) {
    console.error('AxiosEditGroupCredentials Error:', error);

    if (error instanceof Error) return error;

    return new Error(`Error al ejecutar AxiosEditGroupCredentials: ${error}`);
  }
};

export default AxiosEditGroupCredentials;
