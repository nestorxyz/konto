import { AxiosApi } from 'request/AxiosBase';

const AxiosSendVerificationCode = async (userId: string) => {
  try {
    const result = await AxiosApi.post(`/verification/sendVerificationCode`, {
      userId,
    });

    if (result.status == 204) return null;

    return result.data;
  } catch (error) {
    console.error('AxiosSendVerificationCode Error:', error);

    if (error instanceof Error) return error;

    return new Error(`Error al ejecutar AxiosSendVerificationCode: ${error}`);
  }
};

export default AxiosSendVerificationCode;
