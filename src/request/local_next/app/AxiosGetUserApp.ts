import { AxiosApi } from 'request/AxiosBase';

// Types
import { UserApp } from 'request/prisma/app/getUserApp';
import { UserMovement } from 'types/movements';

export interface IAxiosGetUserAppResponse {
  user: UserApp;
  movements: Array<UserMovement>;
}

const AxiosGetUserApp = async (
  url: string,
  id: string
): Promise<IAxiosGetUserAppResponse | undefined> => {
  try {
    const result = await AxiosApi.get(`/app/getUserApp/${id}`);

    return result.data;
  } catch (error) {
    console.error('AxiosGetUserApp Error:', error);

    return undefined;
  }
};

export default AxiosGetUserApp;
