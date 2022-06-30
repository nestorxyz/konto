import { AxiosApi } from 'request/AxiosBase';

const AxiosAddPhone = async (userId: string, phone: string) => {
  try {
    const result = await AxiosApi.post(`/users/addPhone`, {
      userId,
      phone,
    });

    if (result.status == 204) return null;

    return result.data;
  } catch (error) {
    console.error('AxiosAddPhone Error:', error);

    if (error instanceof Error) return error;

    return new Error(`Error al ejecutar AxiosAddPhone: ${error}`);
  }
};

export default AxiosAddPhone;