import { AxiosApi } from 'request/AxiosBase';

const AxiosRenewSubscription = async (userGroupId: string) => {
  try {
    const result = await AxiosApi.post('/admin/renewSubscription', {
      userGroupId,
    });

    return result.data;
  } catch (error) {
    console.error('AxiosRenewSubscription Error:', error);

    if (error instanceof Error) return error;

    return new Error(`Error al ejecutar AxiosRenewSubscription: ${error}`);
  }
};

export default AxiosRenewSubscription;
