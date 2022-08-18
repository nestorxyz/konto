import { AxiosApi } from 'request/AxiosBase';

// Request
import { AdminGroup } from 'request/prisma/subscriptions/getAdminGroups';

interface IAxiosGetAdminGroups {
  url: string;
  id: string;
}

export interface IGetAdminGroupsResponse {
  success: boolean;
  data: AdminGroup[];
}

const AxiosGetAdminGroups = async (url: string, id: string) => {
  try {
    const result = await AxiosApi.post<IGetAdminGroupsResponse>(
      '/userGroups/getAdminGroups',
      {
        userId: id,
      }
    );

    return result.data;
  } catch (error) {
    console.log('AxiosGetJoinedGroups Error:', error);

    return new Error('Error al ejecutar AxiosGetJoinedGroups: ' + error);
  }
};

export default AxiosGetAdminGroups;
