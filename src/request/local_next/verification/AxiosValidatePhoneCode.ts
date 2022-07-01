import { AxiosApi } from 'request/AxiosBase';

interface IAxiosValidatePhoneCodeProps {
  userId: string;
  code: string;
}

const AxiosValidatePhoneCode = async (params: IAxiosValidatePhoneCodeProps) => {
  try {
    const result = await AxiosApi.post(
      `/verification/validatePhoneCode`,
      params
    );

    if (result.status == 204) return null;

    return result.data;
  } catch (error) {
    console.error('AxiosValidatePhoneCode Error:', error);

    if (error instanceof Error) return error;

    return new Error(`Error al ejecutar AxiosValidatePhoneCode: ${error}`);
  }
};

export default AxiosValidatePhoneCode;
