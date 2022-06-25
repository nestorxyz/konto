import { AxiosApi } from 'request/AxiosBase';

interface IAxiosCreateGroupProps {
  adminId: string;
  planId: string;
  credentialEmail: string;
  credentialPassword: string;
}

const AxiosCreateGroup = async (group: IAxiosCreateGroupProps) => {
  try {
    const result = await AxiosApi.post('/groups/createGroup', group);

    if (result.status == 204) return null;

    return result.data;
  } catch (error) {
    console.error('AxiosGetAllPlans Error:', error);

    if (error instanceof Error) return error;

    return new Error(`Error al ejecutar AxiosGetAllPlans: ${error}`);
  }
};

export default AxiosCreateGroup;
