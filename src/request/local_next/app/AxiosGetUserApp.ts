import { AxiosApi } from 'request/AxiosBase';

// Types
import { UserApp } from 'request/prisma/app/getUserApp';

const AxiosGetUserApp = async (
  url: string,
  id: string
): Promise<UserApp | Error> => {
  try {
    const result = await AxiosApi.get(`/app/getUserApp/${id}`);

    return result.data;
  } catch (error) {
    console.error('AxiosGetUserApp Error:', error);

    if (error instanceof Error) return error;

    return new Error(`Error al ejecutar AxiosGetUserApp: ${error}`);
  }
};

export default AxiosGetUserApp;
